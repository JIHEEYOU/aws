from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List, Literal, Optional, Set

from fastapi import Depends, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from .storage import get_resume_store, ResumeStore

app = FastAPI(title='Scholarship & Resume API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


class ResumeResponse(BaseModel):
    resumeId: str
    fileName: str
    url: str
    meta: Optional[Dict[str, Any]] = None


class ScholarshipConditions(BaseModel):
    grade: Optional[List[str]] = None
    major: Optional[List[str]] = None
    gpa: Optional[float] = None
    income: Optional[str] = None
    certificates: Optional[List[str]] = None


class Scholarship(BaseModel):
    id: str
    title: str
    summary: str
    organization: str
    amount: str
    deadline: str
    applicationLink: str
    conditions: ScholarshipConditions
    category: Literal['scholarship', 'competition']
    source: str
    isNew: bool
    viewCount: int


class SaveResponse(BaseModel):
    success: bool
    scholarshipId: str


MOCK_SCHOLARSHIPS: List[Scholarship] = [
    Scholarship(
        id='1',
        title='2025 강원대학교 성적우수 장학금',
        summary='직전학기 성적 3.5 이상 학생 대상, 등록금 50% 지원',
        organization='강원대학교 학생처',
        amount='최대 300만원',
        deadline='2025-12-15',
        applicationLink='https://kangwon.ac.kr',
        conditions=ScholarshipConditions(grade=['2학년', '3학년', '4학년'], gpa=3.5),
        category='scholarship',
        source='강원대 공지사항',
        isNew=True,
        viewCount=1247,
    ),
    Scholarship(
        id='2',
        title='SW중심대학 코딩캠프 참가자 장학금',
        summary='SW전공생 대상, 캠프 수료 후 장학금 지급',
        organization='SW사업단',
        amount='100만원',
        deadline='2025-12-01',
        applicationLink='https://sw.kangwon.ac.kr',
        conditions=ScholarshipConditions(
            major=['컴퓨터공학', '소프트웨어학과', '정보통신공학'],
            grade=['1학년', '2학년', '3학년'],
        ),
        category='scholarship',
        source='SW사업단 홈페이지',
        isNew=True,
        viewCount=856,
    ),
    Scholarship(
        id='3',
        title='2025 스타트업 아이디어 공모전',
        summary='창업 아이디어 기획서 제출, 최우수상 500만원',
        organization='교육혁신본부',
        amount='최대 500만원',
        deadline='2025-11-30',
        applicationLink='https://innovation.kangwon.ac.kr',
        conditions=ScholarshipConditions(grade=['2학년', '3학년', '4학년']),
        category='competition',
        source='교육혁신본부',
        isNew=False,
        viewCount=2341,
    ),
    Scholarship(
        id='4',
        title='저소득층 생활비 지원 장학금',
        summary='기초생활수급자 및 차상위계층 대상',
        organization='강원대학교 학생처',
        amount='학기당 200만원',
        deadline='2025-12-20',
        applicationLink='https://kangwon.ac.kr',
        conditions=ScholarshipConditions(income='기초생활수급자'),
        category='scholarship',
        source='강원대 공지사항',
        isNew=False,
        viewCount=945,
    ),
    Scholarship(
        id='5',
        title='외국어 자격증 취득 장려 장학금',
        summary='TOEIC 800점 이상 또는 동등 자격증 소지자',
        organization='취업지원과',
        amount='50만원',
        deadline='2025-12-10',
        applicationLink='https://career.kangwon.ac.kr',
        conditions=ScholarshipConditions(certificates=['TOEIC', 'TOEFL', 'IELTS']),
        category='scholarship',
        source='취업지원과',
        isNew=True,
        viewCount=1523,
    ),
]

SAVED_SCHOLARSHIP_IDS: Set[str] = set()


@app.post('/api/students/{student_id}/resume', response_model=ResumeResponse)
async def upload_resume(
    student_id: str,
    file: UploadFile = File(...),
    meta: str = Form('{}'),
    store: ResumeStore = Depends(get_resume_store),
) -> ResumeResponse:
    if file.content_type != 'application/pdf':
        raise HTTPException(status_code=400, detail='Only PDF uploads are allowed.')

    try:
        meta_dict: Dict[str, Any] = json.loads(meta) if meta else {}
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail='`meta` must be valid JSON.')

    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail='Uploaded file is empty.')

    record = store.save_resume(student_id, file.filename or 'resume.pdf', content, meta_dict)
    return ResumeResponse(**record)  # type: ignore[arg-type]


@app.get('/api/students/{student_id}/resume', response_model=ResumeResponse)
async def get_resume(student_id: str, store: ResumeStore = Depends(get_resume_store)) -> ResumeResponse:
    record = store.get_resume(student_id)
    return ResumeResponse(**record)


@app.get('/api/resume-files/{student_id}/{stored_filename}')
async def download_resume(student_id: str, stored_filename: str, store: ResumeStore = Depends(get_resume_store)):
    stream = store.get_resume_stream(student_id, stored_filename)
    headers = {'Content-Disposition': f'attachment; filename="{stored_filename}"'}
    return StreamingResponse(stream, media_type='application/pdf', headers=headers)


@app.get('/api/scholarships', response_model=List[Scholarship])
async def list_scholarships(category: Optional[str] = None) -> List[Scholarship]:
    if category not in (None, 'scholarship', 'competition'):
        raise HTTPException(status_code=400, detail='Invalid category filter.')

    if category:
        return [s for s in MOCK_SCHOLARSHIPS if s.category == category]
    return MOCK_SCHOLARSHIPS


@app.get('/api/scholarships/{scholarship_id}', response_model=Scholarship)
async def get_scholarship(scholarship_id: str) -> Scholarship:
    for scholarship in MOCK_SCHOLARSHIPS:
        if scholarship.id == scholarship_id:
            return scholarship
    raise HTTPException(status_code=404, detail='Scholarship not found.')


@app.get('/api/scholarships/saved', response_model=List[Scholarship])
async def get_saved_scholarships() -> List[Scholarship]:
    return [s for s in MOCK_SCHOLARSHIPS if s.id in SAVED_SCHOLARSHIP_IDS]


@app.post('/api/scholarships/{scholarship_id}/save', response_model=SaveResponse)
async def save_scholarship(scholarship_id: str) -> SaveResponse:
    if scholarship_id not in {s.id for s in MOCK_SCHOLARSHIPS}:
        raise HTTPException(status_code=404, detail='Scholarship not found.')

    SAVED_SCHOLARSHIP_IDS.add(scholarship_id)
    return SaveResponse(success=True, scholarshipId=scholarship_id)


@app.delete('/api/scholarships/{scholarship_id}/save', response_model=SaveResponse)
async def remove_saved_scholarship(scholarship_id: str) -> SaveResponse:
    if scholarship_id in SAVED_SCHOLARSHIP_IDS:
        SAVED_SCHOLARSHIP_IDS.remove(scholarship_id)
        return SaveResponse(success=True, scholarshipId=scholarship_id)

    raise HTTPException(status_code=404, detail='Scholarship not saved.')


@app.get('/')
async def root() -> Dict[str, Any]:
    return {
        'message': 'Scholarship & Resume API running',
        'resumeUpload': '/api/students/{studentId}/resume',
        'scholarships': '/api/scholarships',
    }
