import { useEffect, useState } from 'react';
import PersonalizedBanner from '../components/PersonalizedBanner';
import ScholarshipSlider from '../components/ScholarshipSlider';
import { getScholarships } from '../api/scholarships';
import { Scholarship } from '../types/scholarship';
import { Clock, Award, Bell, GraduationCap, Award as Certificate, Briefcase, List } from 'lucide-react';

interface HomePageProps {
  onScholarshipClick: (id: string) => void;
  onNavigate: (page: string) => void;
  studentId: string;
}

const quickAccessItems = [
  {
    iconType: "component",
    IconComponent: GraduationCap,
    title: "전공 맞춤 추천",
    description: "전공에 딱 맞는 장학금",
  },
  {
    iconType: "component",
    IconComponent: Certificate,
    title: "자격증 장학금",
    description: "자격증 취득 지원",
  },
  {
    iconType: "component",
    IconComponent: Briefcase,
    title: "취업 프로그램",
    description: "취업 지원 프로그램",
  },
  {
    iconType: "component",
    IconComponent: List,
    title: "전체 보기",
    description: "모든 장학금/공모전",
  },
];

export default function HomePage({ onScholarshipClick, onNavigate, studentId }: HomePageProps) {
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

  const newScholarships = scholarships.filter((s) => s.isNew);
  // 마감일 기준으로 정렬하여 임박한 순서대로 표시
  const deadlineSoon = [...scholarships]
    .sort((a, b) => {
      const dateA = new Date(a.deadline).getTime();
      const dateB = new Date(b.deadline).getTime();
      return dateA - dateB;
    })
    .slice(0, 6);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <PersonalizedBanner studentId={studentId} />

      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3">
          {quickAccessItems.map((item, index) => {
            const isHighlighted = index === 0;
            const pageMap = ['major-recommendations', 'certificate-scholarships', 'employment-programs', 'all-items'];
            return (
              <button
                key={index}
                onClick={() => onNavigate(pageMap[index])}
                className={`rounded-2xl smooth-transition h-[140px] flex flex-col items-center justify-center group hover:scale-105 ${
                  isHighlighted
                    ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-400 shadow-lg hover:shadow-xl hover:border-orange-500'
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-md hover:shadow-lg hover:border-blue-300'
                }`}
              >
                <div className={`mb-3 transition-transform group-hover:scale-110 ${
                  isHighlighted ? 'filter drop-shadow-md' : ''
                }`}>
                  {item.IconComponent && (
                    <item.IconComponent className={`w-12 h-12 ${
                      isHighlighted ? 'text-orange-600' : 'text-blue-600'
                    }`} />
                  )}
                </div>
                <h3 className={`text-base font-bold mb-1 ${
                  isHighlighted ? 'text-orange-900' : 'text-blue-900'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${
                  isHighlighted ? 'text-orange-700' : 'text-blue-700'
                }`}>
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-md">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">
            마감 임박
          </h2>
          <span className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-200">HOT</span>
        </div>
        <ScholarshipSlider
          scholarships={deadlineSoon}
          onScholarshipClick={onScholarshipClick}
        />
      </section>

      <section className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl shadow-md">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">
            새로운 장학금
          </h2>
          <span className="px-3 py-1.5 bg-cyan-50 text-cyan-600 text-xs font-bold rounded-lg border border-cyan-200">NEW</span>
        </div>
        <ScholarshipSlider
          scholarships={newScholarships.slice(0, 6)}
          onScholarshipClick={onScholarshipClick}
        />
      </section>

      <div className="relative rounded-3xl p-8 overflow-hidden shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-blue-600 via-blue-700 to-blue-600">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-white/95 rounded-2xl flex items-center justify-center shadow-md">
              <Bell className="w-7 h-7 text-blue-600" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-black text-white mb-1">
              알림 설정
            </h3>
            <p className="text-white/90 text-base">
              마감 임박 장학금을 놓치지 마세요
            </p>
          </div>
          <button className="px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105">
            지금 설정하기
          </button>
        </div>
      </div>
    </div>
  );
}
