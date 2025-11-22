// 백엔드 응답을 프론트엔드 타입으로 변환하는 유틸리티 함수

import { BackendScholarshipItem } from '../types/backend';
import { Scholarship } from '../types/scholarship';

/**
 * 백엔드 장학금 아이템을 프론트엔드 Scholarship 타입으로 변환
 */
export function transformBackendToFrontend(
  backendItem: BackendScholarshipItem,
): Scholarship {
  // type 필드를 category로 매핑 (scholarship 또는 competition)
  const category: 'scholarship' | 'competition' =
    backendItem.type === 'competition' ? 'competition' : 'scholarship';

  // grade를 배열로 변환 (문자열이면 배열로, 없으면 undefined)
  const gradeArray = backendItem.grade
    ? [backendItem.grade]
    : undefined;

  // major를 배열로 변환
  const majorArray = backendItem.major
    ? [backendItem.major]
    : undefined;

  // certificates 배열 처리
  const certificatesArray = backendItem.certificates || [];

  // 날짜 형식 변환 (end_at을 deadline으로 사용)
  const deadline = backendItem.end_at || backendItem.start_at || '';

  // organization 추출 (board 또는 etc에서)
  const organization = backendItem.board || '강원대학교';

  // amount 추출 (price 사용)
  const amount = backendItem.price || '정보 없음';

  // applicationLink (url 사용)
  const applicationLink = backendItem.url || '#';

  // isNew 판단 (created_at이 최근 7일 이내면 true)
  const isNew = backendItem.created_at
    ? isRecentDate(backendItem.created_at)
    : false;

  return {
    id: String(backendItem.id),
    title: backendItem.title || '제목 없음',
    summary: backendItem.summary || backendItem.content?.substring(0, 100) || '요약 정보 없음',
    organization,
    amount,
    deadline,
    applicationLink,
    conditions: {
      grade: gradeArray,
      major: majorArray,
      certificates: certificatesArray.length > 0 ? certificatesArray : undefined,
    },
    category,
    source: backendItem.board || '강원대 공지사항',
    isNew,
    viewCount: 0, // 백엔드에 viewCount가 없으므로 기본값 0
  };
}

/**
 * 날짜 문자열이 최근 7일 이내인지 확인
 */
function isRecentDate(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  } catch {
    return false;
  }
}

