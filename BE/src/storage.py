from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Optional
from uuid import uuid4

import boto3
from botocore.exceptions import BotoCoreError, ClientError
from fastapi import HTTPException
from botocore.response import StreamingBody
from fastapi.responses import FileResponse


class ResumeStore:
    def __init__(self) -> None:
        self.table_name = os.getenv('RESUME_TABLE_NAME', 'Resumes')
        self.bucket_name = os.getenv('RESUME_BUCKET_NAME')
        if not self.bucket_name:
            raise RuntimeError('RESUME_BUCKET_NAME environment variable must be set.')

        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.Table(self.table_name)
        self.s3 = boto3.client('s3')

    def _build_download_url(self, student_id: str, stored_filename: str) -> str:
        return f"/api/resume-files/{student_id}/{stored_filename}"

    def _get_storage_key(self, student_id: str, stored_filename: str) -> str:
        return f"{student_id}/{stored_filename}"

    def _fetch_item(self, student_id: str) -> Dict[str, Any]:
        try:
            response = self.table.get_item(Key={'studentId': student_id})
        except (ClientError, BotoCoreError) as exc:
            raise HTTPException(status_code=500, detail='Failed to access resume store.') from exc

        item = response.get('Item')
        if not item:
            raise HTTPException(status_code=404, detail='Resume not found for this student.')
        return item

    def save_resume(
        self,
        student_id: str,
        filename: str,
        content: bytes,
        meta: Optional[Dict[str, object]] = None,
    ) -> Dict[str, Any]:
        if not filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail='Only PDF uploads are allowed.')

        resume_id = uuid4().hex
        stored_filename = f"{resume_id}.pdf"
        storage_key = self._get_storage_key(student_id, stored_filename)

        try:
            self.s3.put_object(
                Bucket=self.bucket_name,
                Key=storage_key,
                Body=content,
                ContentType='application/pdf',
            )
        except (ClientError, BotoCoreError) as exc:
            raise HTTPException(status_code=500, detail='Failed to upload resume to storage.') from exc

        item: Dict[str, Any] = {
            'studentId': student_id,
            'resumeId': resume_id,
            'fileName': filename,
            'url': self._build_download_url(student_id, stored_filename),
            'storageKey': storage_key,
            'uploadedAt': datetime.now(timezone.utc).isoformat(),
        }
        if meta:
            item['meta'] = meta

        try:
            self.table.put_item(Item=item)
        except (ClientError, BotoCoreError) as exc:
            raise HTTPException(status_code=500, detail='Failed to store resume metadata.') from exc

        return {k: item.get(k) for k in ('resumeId', 'fileName', 'url', 'meta') if item.get(k) is not None}

    def get_resume(self, student_id: str) -> Dict[str, Any]:
        item = self._fetch_item(student_id)
        return {k: item.get(k) for k in ('resumeId', 'fileName', 'url', 'meta') if item.get(k) is not None}

    def get_resume_stream(self, student_id: str, stored_filename: str) -> StreamingBody:
        item = self._fetch_item(student_id)
        expected_key = item.get('storageKey')
        requested_key = self._get_storage_key(student_id, stored_filename)

        if expected_key != requested_key:
            raise HTTPException(status_code=404, detail='Resume file not found.')

        try:
            obj = self.s3.get_object(Bucket=self.bucket_name, Key=requested_key)
        except (ClientError, BotoCoreError) as exc:
            raise HTTPException(status_code=404, detail='Resume file not found.') from exc

        body = obj.get('Body')
        if body is None:
            raise HTTPException(status_code=500, detail='Invalid resume file response.')

        return body


class LocalResumeStore:
    """로컬 파일 시스템을 사용하는 이력서 저장소 (AWS 리소스 없이 작동)"""
    
    def __init__(self) -> None:
        self.storage_dir = Path('local_resumes')
        self.storage_dir.mkdir(exist_ok=True)
        self.metadata_file = self.storage_dir / 'metadata.json'
        self._metadata: Dict[str, Dict[str, Any]] = self._load_metadata()
    
    def _load_metadata(self) -> Dict[str, Dict[str, Any]]:
        """메타데이터 파일 로드"""
        if self.metadata_file.exists():
            try:
                with open(self.metadata_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception:
                return {}
        return {}
    
    def _save_metadata(self) -> None:
        """메타데이터 파일 저장"""
        with open(self.metadata_file, 'w', encoding='utf-8') as f:
            json.dump(self._metadata, f, ensure_ascii=False, indent=2)
    
    def _build_download_url(self, student_id: str, stored_filename: str) -> str:
        return f"/api/resume-files/{student_id}/{stored_filename}"
    
    def _get_storage_path(self, student_id: str, stored_filename: str) -> Path:
        """로컬 파일 경로 생성"""
        student_dir = self.storage_dir / student_id
        student_dir.mkdir(exist_ok=True)
        return student_dir / stored_filename
    
    def save_resume(
        self,
        student_id: str,
        filename: str,
        content: bytes,
        meta: Optional[Dict[str, object]] = None,
    ) -> Dict[str, Any]:
        if not filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail='Only PDF uploads are allowed.')
        
        resume_id = uuid4().hex
        stored_filename = f"{resume_id}.pdf"
        storage_path = self._get_storage_path(student_id, stored_filename)
        
        # 파일 저장
        with open(storage_path, 'wb') as f:
            f.write(content)
        
        # 메타데이터 저장
        item: Dict[str, Any] = {
            'studentId': student_id,
            'resumeId': resume_id,
            'fileName': filename,
            'url': self._build_download_url(student_id, stored_filename),
            'storageKey': f"{student_id}/{stored_filename}",
            'uploadedAt': datetime.now(timezone.utc).isoformat(),
        }
        if meta:
            item['meta'] = meta
        
        self._metadata[student_id] = item
        self._save_metadata()
        
        return {k: item.get(k) for k in ('resumeId', 'fileName', 'url', 'meta') if item.get(k) is not None}
    
    def get_resume(self, student_id: str) -> Dict[str, Any]:
        item = self._metadata.get(student_id)
        if not item:
            raise HTTPException(status_code=404, detail='Resume not found for this student.')
        return {k: item.get(k) for k in ('resumeId', 'fileName', 'url', 'meta') if item.get(k) is not None}
    
    def get_resume_stream(self, student_id: str, stored_filename: str) -> Path:
        """로컬 파일 경로 반환 (FileResponse에서 사용)"""
        item = self._metadata.get(student_id)
        if not item:
            raise HTTPException(status_code=404, detail='Resume not found for this student.')
        
        expected_key = item.get('storageKey')
        requested_key = f"{student_id}/{stored_filename}"
        
        if expected_key != requested_key:
            raise HTTPException(status_code=404, detail='Resume file not found.')
        
        storage_path = self._get_storage_path(student_id, stored_filename)
        if not storage_path.exists():
            raise HTTPException(status_code=404, detail='Resume file not found.')
        
        return storage_path


_RESUME_STORE: Optional[ResumeStore] = None
_LOCAL_RESUME_STORE: Optional[LocalResumeStore] = None


def get_resume_store() -> Optional[ResumeStore]:
    """AWS 리소스를 사용하는 저장소 반환 (있으면)"""
    global _RESUME_STORE
    if _RESUME_STORE is None:
        try:
            _RESUME_STORE = ResumeStore()
        except (RuntimeError, Exception):
            # AWS 리소스가 없으면 None 반환
            return None
    return _RESUME_STORE


def get_local_resume_store() -> LocalResumeStore:
    """로컬 파일 시스템을 사용하는 저장소 반환"""
    global _LOCAL_RESUME_STORE
    if _LOCAL_RESUME_STORE is None:
        _LOCAL_RESUME_STORE = LocalResumeStore()
    return _LOCAL_RESUME_STORE
