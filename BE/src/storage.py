from __future__ import annotations

import os
from datetime import datetime, timezone
from typing import Any, Dict, Optional
from uuid import uuid4

import boto3
from botocore.exceptions import BotoCoreError, ClientError
from fastapi import HTTPException
from botocore.response import StreamingBody


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


_RESUME_STORE: Optional[ResumeStore] = None


def get_resume_store() -> ResumeStore:
    global _RESUME_STORE
    if _RESUME_STORE is None:
        _RESUME_STORE = ResumeStore()
    return _RESUME_STORE
