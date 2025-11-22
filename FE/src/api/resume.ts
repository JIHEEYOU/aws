import { apiRequest } from './client';

export interface ResumeMeta {
  method: string;
  version?: string;
  [key: string]: unknown;
}

export interface ResumeResponse {
  resumeId: string;
  fileName: string;
  url: string;
}

export async function uploadResume(
  studentId: string,
  file: File,
  meta: ResumeMeta,
): Promise<ResumeResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('meta', JSON.stringify(meta));

  return apiRequest<ResumeResponse>(`/api/students/${studentId}/resume`, {
    method: 'POST',
    body: formData,
  });
}

export async function getResume(studentId: string): Promise<ResumeResponse> {
  return apiRequest<ResumeResponse>(`/api/students/${studentId}/resume`, {
    method: 'GET',
  });
}

export interface ResumeWriteData {
  name: string;
  major: string;
  grade: string;
  certificates: string;
}

export async function writeResume(
  studentId: string,
  data: ResumeWriteData,
): Promise<ResumeResponse> {
  return apiRequest<ResumeResponse>(`/api/students/${studentId}/resume/write`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}