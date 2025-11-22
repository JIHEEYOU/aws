import { apiRequest } from './client';
import { Scholarship } from '../types/scholarship';
import {
  BackendScholarshipListResponse,
  BackendScholarshipItem,
  BackendResumeRecommendationRequest,
  BackendResumeRecommendationResponse,
} from '../types/backend';
import { transformBackendToFrontend } from '../utils/transform';

export interface ScholarshipListParams {
  category?: 'scholarship' | 'competition' | 'all';
  search?: string;
}

export interface SaveScholarshipResponse {
  success: boolean;
  scholarshipId: string;
}

/**
 * 장학금 목록 조회 (백엔드 API 호출)
 */
export async function getScholarships(
  params: ScholarshipListParams = {},
): Promise<Scholarship[]> {
  const query = new URLSearchParams();
  
  // category 매핑: 'scholarship' 또는 'competition'을 백엔드 type으로 변환
  if (params.category && params.category !== 'all') {
    query.set('category', params.category);
  } else {
    query.set('category', 'all');
  }
  
  if (params.search) {
    query.set('search', params.search);
  }

  const queryString = query.toString();
  const path = `/api/scholarships?${queryString}`;
  
  const response = await apiRequest<BackendScholarshipListResponse>(path, { method: 'GET' });
  
  // 백엔드 응답을 프론트엔드 타입으로 변환
  return response.items.map(transformBackendToFrontend);
}

/**
 * 장학금 상세 정보 조회 (백엔드 API 호출)
 */
export async function getScholarshipDetail(id: string): Promise<Scholarship> {
  const response = await apiRequest<BackendScholarshipItem>(
    `/api/scholarships/${id}`,
    { method: 'GET' },
  );
  
  return transformBackendToFrontend(response);
}

/**
 * 이력서 기반 추천 장학금 조회 (백엔드 API 호출)
 */
export async function getRecommendedScholarships(
  major: string,
  grade: string,
  certificates: string[] = [],
): Promise<Scholarship[]> {
  const requestBody: BackendResumeRecommendationRequest = {
    major,
    grade,
    certificates,
  };

  const response = await apiRequest<BackendResumeRecommendationResponse>(
    '/api/resumes',
    {
      method: 'POST',
      body: JSON.stringify(requestBody),
    },
  );

  return response.results.map(transformBackendToFrontend);
}

/**
 * 전체 목록 조회 (백엔드 API 호출)
 */
export async function getAllScholarships(): Promise<Scholarship[]> {
  const response = await apiRequest<BackendScholarshipItem[]>(
    '/api/list',
    { method: 'GET' },
  );

  return response.map(transformBackendToFrontend);
}

// 아래 함수들은 백엔드에 해당 API가 없으므로 빈 배열 반환
export async function getSavedScholarships(): Promise<Scholarship[]> {
  // TODO: 백엔드에 저장된 장학금 API가 구현되면 연결
  return [];
}

export async function saveScholarship(
  id: string,
): Promise<SaveScholarshipResponse> {
  // TODO: 백엔드에 저장 API가 구현되면 연결
  return { success: true, scholarshipId: id };
}

export async function removeSavedScholarship(
  id: string,
): Promise<SaveScholarshipResponse> {
  // TODO: 백엔드에 저장 취소 API가 구현되면 연결
  return { success: true, scholarshipId: id };
}
