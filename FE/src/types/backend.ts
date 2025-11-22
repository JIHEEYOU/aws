// 백엔드 API 응답 타입 정의

export interface BackendScholarshipItem {
  id: number;
  board?: string;
  url?: string;
  title: string;
  type?: string;
  major?: string;
  grade?: string;
  price?: string;
  start_at?: string;
  end_at?: string;
  content?: string;
  etc?: string;
  images?: string[];
  summary?: string;
  created_at?: string;
  certificates?: string[];
}

export interface BackendScholarshipListResponse {
  count: number;
  items: BackendScholarshipItem[];
}

export interface BackendResumeRecommendationRequest {
  major: string;
  grade: string;
  certificates: string[];
}

export interface BackendResumeRecommendationResponse {
  count: number;
  results: BackendScholarshipItem[];
}

