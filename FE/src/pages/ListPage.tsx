import { useState, useEffect } from 'react';
import ScholarshipCard from '../components/ScholarshipCard';
import { getScholarships } from '../api/scholarships';
import { Scholarship } from '../types/scholarship';
import { SlidersHorizontal, X } from 'lucide-react';

interface ListPageProps {
  category: 'scholarship' | 'competition';
  onScholarshipClick: (id: string) => void;
}

export default function ListPage({ category, onScholarshipClick }: ListPageProps) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'deadline' | 'popular'>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchScholarships() {
      try {
        setLoading(true);
        const data = await getScholarships({ category, search: searchQuery });
        setScholarships(data);
      } catch (error) {
        console.error('장학금 목록 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchScholarships();
  }, [category, searchQuery]);

  const filteredScholarships = scholarships
    .filter((s) => {
      if (selectedGrade.length > 0) {
        return s.conditions.grade?.some((g) => selectedGrade.includes(g));
      }
      return true;
    })
    .filter((s) => {
      if (selectedMajor.length > 0) {
        return s.conditions.major?.some((m) => selectedMajor.includes(m));
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return b.isNew ? 1 : -1;
      if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      if (sortBy === 'popular') return b.viewCount - a.viewCount;
      return 0;
    });

  const grades = ['1학년', '2학년', '3학년', '4학년'];
  const majors = ['컴퓨터공학', '소프트웨어학과', '정보통신공학', '경영학과', '경제학과'];

  const toggleFilter = (value: string, current: string[], setter: (v: string[]) => void) => {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category === 'scholarship' ? '장학금' : '공모전'}
          </h1>
          <p className="text-gray-600">
            총 {filteredScholarships.length}건의 {category === 'scholarship' ? '장학금' : '공모전'}이 있습니다
          </p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">필터</span>
        </button>
      </div>

      {showFilters && (
        <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">필터 설정</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">검색</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="장학금 제목 검색..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">정렬</label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'recent', label: '최신순' },
                  { value: 'deadline', label: '마감임박순' },
                  { value: 'popular', label: '인기순' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      sortBy === option.value
                        ? 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">학년</label>
              <div className="flex gap-2 flex-wrap">
                {grades.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => toggleFilter(grade, selectedGrade, setSelectedGrade)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedGrade.includes(grade)
                        ? 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">학과</label>
              <div className="flex gap-2 flex-wrap">
                {majors.map((major) => (
                  <button
                    key={major}
                    onClick={() => toggleFilter(major, selectedMajor, setSelectedMajor)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedMajor.includes(major)
                        ? 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {major}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setSelectedGrade([]);
                  setSelectedMajor([]);
                  setSortBy('recent');
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                초기화
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onClick={() => onScholarshipClick(scholarship.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">조건에 맞는 결과가 없습니다</p>
          <p className="text-sm text-gray-500">필터를 조정해보세요</p>
        </div>
      )}
    </div>
  );
}
