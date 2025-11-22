import { ArrowLeft, Calendar, Building2, DollarSign, ExternalLink, Bookmark, Share2, Award, Trophy, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getScholarshipDetail } from '../api/scholarships';
import { Scholarship } from '../types/scholarship';
import ApplicationMethodModal from '../components/ApplicationMethodModal';
import ResumeUploadModal from '../components/ResumeUploadModal';

interface DetailPageProps {
  scholarshipId: string;
  onBack: () => void;
  studentId: string;
}

export default function DetailPage({ scholarshipId, onBack, studentId }: DetailPageProps) {
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    async function fetchScholarshipDetail() {
      try {
        setLoading(true);
        const data = await getScholarshipDetail(scholarshipId);
        setScholarship(data);
      } catch (error) {
        console.error('장학금 상세 정보 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchScholarshipDetail();
  }, [scholarshipId]);

  const handleSelectMethod = (method: 'resume' | 'form') => {
    if (method === 'resume') {
      setIsResumeModalOpen(true);
    } else {
      console.log('입력폼 작성 선택');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">장학금 정보를 찾을 수 없습니다.</p>
        <button onClick={onBack} className="mt-4 text-cyan-600 hover:underline">
          돌아가기
        </button>
      </div>
    );
  }

  const Icon = scholarship.category === 'scholarship' ? Award : Trophy;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">목록으로</span>
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-8 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-sm font-semibold rounded-full border border-cyan-200">
                <Icon className="w-4 h-4 inline mr-1" />
                {scholarship.category === 'scholarship' ? '장학금' : '공모전'}
              </span>
              {scholarship.isNew && (
                <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full border border-red-200">
                  NEW
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{scholarship.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
              <Building2 className="w-4 h-4 text-gray-500" />
              <span>{scholarship.organization}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>마감: {scholarship.deadline}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className="font-semibold text-cyan-600">{scholarship.amount}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
              AI 요약
            </h2>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-gray-800 leading-relaxed">{scholarship.summary}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
              지원 자격
            </h2>
            <div className="space-y-3">
              {scholarship.conditions.grade && (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">학년: </span>
                    <span className="text-gray-700">{scholarship.conditions.grade.join(', ')}</span>
                  </div>
                </div>
              )}
              {scholarship.conditions.major && (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">학과: </span>
                    <span className="text-gray-700">{scholarship.conditions.major.join(', ')}</span>
                  </div>
                </div>
              )}
              {scholarship.conditions.gpa && (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">학점: </span>
                    <span className="text-gray-700">{scholarship.conditions.gpa} 이상</span>
                  </div>
                </div>
              )}
              {scholarship.conditions.income && (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">소득: </span>
                    <span className="text-gray-700">{scholarship.conditions.income}</span>
                  </div>
                </div>
              )}
              {scholarship.conditions.certificates && (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">자격증: </span>
                    <span className="text-gray-700">
                      {scholarship.conditions.certificates.join(', ')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
              나의 지원 가능 여부
            </h2>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-900 mb-1">지원 가능합니다</p>
                  <p className="text-sm text-green-700">
                    프로필 정보를 기반으로 모든 조건을 충족합니다
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
              신청 정보
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">출처</span>
                  <span className="font-medium text-gray-900">{scholarship.source}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">조회수</span>
                  <span className="font-medium text-gray-900">
                    {scholarship.viewCount.toLocaleString()}회
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMethodModalOpen(true)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                <span>받으러 가기</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 rounded-lg p-4 border border-amber-200">
        <div className="flex items-start gap-3">
          <XCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">유의사항</p>
            <p className="text-sm text-amber-800">
              AI 요약 정보는 참고용이며, 정확한 내용은 반드시 원문 공지사항을 확인해주세요.
            </p>
          </div>
        </div>
      </div>

      <ApplicationMethodModal
        isOpen={isMethodModalOpen}
        onClose={() => setIsMethodModalOpen(false)}
        onSelectMethod={handleSelectMethod}
      />

      <ResumeUploadModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        studentId={studentId}
      />
    </div>
  );
}
