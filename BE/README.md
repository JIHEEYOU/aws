# Scholarship & Resume Backend API

Python FastAPI 서버로 학생 이력서 업로드/조회와 장학금 데이터를 제공합니다.

## 준비
1. 가상환경 생성 후 활성화 (선택)
2. 의존성 설치
   ```bash
   pip install -r requirements.txt
   ```
3. AWS 리소스 준비
   - S3 버킷 생성 후 `RESUME_BUCKET_NAME` 환경 변수로 지정
   - DynamoDB 테이블(`RESUME_TABLE_NAME`, 기본값 `Resumes`) 생성 및 파티션 키를 `studentId`로 설정
   - EC2/IAM 역할 또는 AWS 자격증명이 boto3에서 접근 가능해야 합니다.

## 실행
로컬 개발 모드:
```bash
uvicorn src.main:app --reload --port 8000
```

서버가 뜨면 주요 엔드포인트:
- `POST /api/students/{studentId}/resume` : PDF 업로드 (multipart/form-data)
- `GET /api/students/{studentId}/resume` : 업로드된 이력서 메타 조회
- `GET /api/resume-files/{studentId}/{fileName}` : 업로드 파일 다운로드
- `GET /api/scholarships?category=...` : 장학금/공모전 목록
- `GET /api/scholarships/{id}` : 상세 정보
- `GET|POST|DELETE /api/scholarships/saved` 등 : 저장/해제 목록

업로드된 파일은 S3 버킷에, 메타데이터는 DynamoDB 테이블에 각각 저장됩니다.
