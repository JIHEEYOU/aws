import { ArrowLeft, Calendar, TrendingUp, Award, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import ScholarshipCard from '../components/ScholarshipCard';
import { getScholarships } from '../api/scholarships';
import { Scholarship } from '../types/scholarship';

interface ApplicationsPageProps {
  onScholarshipClick: (id: string) => void;
  onBack: () => void;
}

export default function ApplicationsPage({ onScholarshipClick, onBack }: ApplicationsPageProps) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScholarships() {
      try {
        setLoading(true);
        const data = await getScholarships({ category: 'all' });
        setScholarships(data);
      } catch (error) {
        console.error('장학금 목록 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchScholarships();
  }, []);

  const availableScholarships = scholarships.filter(s => s.category === 'scholarship');
  const availableCompetitions = scholarships.filter(s => s.category === 'competition');
  
  // 마감 임박 계산 (7일 이내)
  const deadlineSoon = scholarships.filter(s => {
    const deadline = new Date(s.deadline);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">돌아가기</span>
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
              지원 가능한 장학금 및 공모전
            </h1>
            <p className="text-gray-600 mt-1">곰두리님이 지원할 수 있는 기회를 확인하세요</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-6 border-2 border-emerald-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-emerald-500 rounded-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-black text-emerald-600">
              {availableScholarships.length}건
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">지원 가능 장학금</h3>
          <p className="text-sm text-gray-600">지금 바로 신청하세요</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-black text-blue-600">
              {availableCompetitions.length}건
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">공모전</h3>
          <p className="text-sm text-gray-600">도전해보세요</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-500 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-black text-orange-600">{deadlineSoon.length}건</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">마감 임박</h3>
          <p className="text-sm text-gray-600">서둘러 신청하세요</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500 rounded-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">장학금</h2>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">
              {availableScholarships.length}건
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                onClick={() => onScholarshipClick(scholarship.id)}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">공모전</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
              {availableCompetitions.length}건
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCompetitions.map((competition) => (
              <ScholarshipCard
                key={competition.id}
                scholarship={competition}
                onClick={() => onScholarshipClick(competition.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
