export interface Scholarship {
  id: string;
  title: string;
  summary: string;
  organization: string;
  amount: string;
  deadline: string;
  applicationLink: string;
  conditions: {
    grade?: string[];
    major?: string[];
    gpa?: number;
    income?: string;
    certificates?: string[];
  };
  category: 'scholarship' | 'competition';
  source: string;
  isNew: boolean;
  viewCount: number;
}

export interface UserProfile {
  grade: string;
  major: string;
  gpa: number;
  income: string;
  certificates: string[];
}
