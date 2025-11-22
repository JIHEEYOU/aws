import { apiRequest } from './client';
import { Scholarship } from '../types/scholarship';

export interface ScholarshipListParams {
  category?: 'scholarship' | 'competition';
}

export interface SaveScholarshipResponse {
  success: boolean;
  scholarshipId: string;
}

export async function getScholarships(
  params: ScholarshipListParams = {},
): Promise<Scholarship[]> {
  const query = new URLSearchParams();
  if (params.category) {
    query.set('category', params.category);
  }

  const queryString = query.toString();
  const path = queryString ? `/api/scholarships?${queryString}` : '/api/scholarships';
  return apiRequest<Scholarship[]>(path, { method: 'GET' });
}

export async function getScholarshipDetail(id: string): Promise<Scholarship> {
  return apiRequest<Scholarship>(`/api/scholarships/${id}`, { method: 'GET' });
}

export async function getSavedScholarships(): Promise<Scholarship[]> {
  return apiRequest<Scholarship[]>(`/api/scholarships/saved`, { method: 'GET' });
}

export async function saveScholarship(
  id: string,
): Promise<SaveScholarshipResponse> {
  return apiRequest<SaveScholarshipResponse>(`/api/scholarships/${id}/save`, {
    method: 'POST',
  });
}

export async function removeSavedScholarship(
  id: string,
): Promise<SaveScholarshipResponse> {
  return apiRequest<SaveScholarshipResponse>(`/api/scholarships/${id}/save`, {
    method: 'DELETE',
  });
}
