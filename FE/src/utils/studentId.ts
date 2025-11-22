const STORAGE_KEY = 'app_student_id';

function createStudentId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `student-${crypto.randomUUID()}`;
  }

  const random = Math.random().toString(36).slice(2, 10);
  return `student-${Date.now().toString(36)}-${random}`;
}

export function getOrCreateStudentId(): string {
  if (typeof window === 'undefined' || !window.localStorage) {
    return createStudentId();
  }

  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const newId = createStudentId();
  window.localStorage.setItem(STORAGE_KEY, newId);
  return newId;
}
