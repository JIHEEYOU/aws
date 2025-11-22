import { useState, useEffect } from 'react';
import ScholarshipCard from '../components/ScholarshipCard';
import { getSavedScholarships } from '../api/scholarships';
import { Scholarship } from '../types/scholarship';
import { BookmarkCheck, User, Edit2, Award, Trophy, Calendar } from 'lucide-react';

interface SavedPageProps {
  onScholarshipClick: (id: string) => void;
}

export default function SavedPage({ onScholarshipClick }: SavedPageProps) {
  const [activeTab, setActiveTab] = useState<'saved' | 'profile'>('saved');
  const [savedScholarships, setSavedScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedScholarships() {
      try {
        setLoading(true);
        const data = await getSavedScholarships();
        setSavedScholarships(data);
      } catch (error) {
        console.error('저장한 장학금 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSavedScholarships();
  }, []);

  const profileData = {
    name: '김학생',
    studentId: '2021****',
    grade: '3학년',
    major: '컴퓨터공학',
    gpa: 3.8,
    income: '4~6분위',
    certificates: ['TOEIC 850점', '정보처리기사'],
  };

  if (loading && activeTab === 'saved') {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (activeTab === 'profile') {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">마이페이지</h1>
          <p className="text-gray-600">프로필 정보를 관리하고 맞춤 추천을 받으세요</p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('saved')}
            className="px-4 py-2 text-gray-600 font-medium hover:text-gray-900 transition-colors"
          >
            저장한 항목
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className="px-4 py-2 text-cyan-600 font-medium border-b-2 border-cyan-600"
          >
            내 프로필
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-600">학번: {profileData.studentId}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
              <Edit2 className="w-4 h-4" />
              <span>수정</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-1">학년</p>
              <p className="text-lg font-semibold text-gray-900">{profileData.grade}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-1">학과</p>
              <p className="text-lg font-semibold text-gray-900">{profileData.major}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-1">평균 학점</p>
              <p className="text-lg font-semibold text-gray-900">{profileData.gpa} / 4.5</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-1">소득 분위</p>
              <p className="text-lg font-semibold text-gray-900">{profileData.income}</p>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm font-medium text-gray-600 mb-3">보유 자격증</p>
            <div className="flex flex-wrap gap-2">
              {profileData.certificates.map((cert, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-100">
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  현재 프로필로 지원 가능한 장학금
                </p>
                <p className="text-3xl font-bold text-cyan-600 mb-2">7건</p>
                <p className="text-sm text-gray-700">
                  예상 수혜 금액: <span className="font-semibold">약 450만원</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <p className="font-semibold text-gray-900">최근 활동</p>
            </div>
            <p className="text-sm text-gray-600">마지막 접속: 2025-11-18</p>
            <p className="text-sm text-gray-600">저장한 장학금: {savedScholarships.length}건</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-cyan-500" />
              <p className="font-semibold text-gray-900">알림 설정</p>
            </div>
            <p className="text-sm text-gray-600">새 장학금: 켜짐</p>
            <p className="text-sm text-gray-600">마감 임박: 켜짐</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">마이페이지</h1>
        <p className="text-gray-600">저장한 장학금과 공모전을 확인하세요</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('saved')}
          className="px-4 py-2 text-cyan-600 font-medium border-b-2 border-cyan-600"
        >
          저장한 항목
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className="px-4 py-2 text-gray-600 font-medium hover:text-gray-900 transition-colors"
        >
          내 프로필
        </button>
      </div>

      {savedScholarships.length > 0 ? (
        <>
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 mb-6 border border-cyan-100">
            <div className="flex items-center gap-3">
              <BookmarkCheck className="w-6 h-6 text-cyan-600" />
              <div>
                <p className="font-semibold text-gray-900">
                  총 {savedScholarships.length}건의 장학금을 저장했습니다
                </p>
                <p className="text-sm text-gray-700">
                  마감일을 놓치지 않도록 알림을 설정하세요
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                onClick={() => onScholarshipClick(scholarship.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <BookmarkCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            저장한 장학금이 없습니다
          </h3>
          <p className="text-gray-600 mb-6">
            관심있는 장학금을 저장하고 나중에 다시 확인하세요
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
            장학금 둘러보기
          </button>
        </div>
      )}
    </div>
  );
}
