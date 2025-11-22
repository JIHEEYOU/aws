import { ArrowLeft, Briefcase, Search, Eye } from 'lucide-react';
import { getScholarships } from '../api/scholarships';
import { Scholarship } from '../types/scholarship';
import { useState, useEffect } from 'react';

interface EmploymentProgramsPageProps {
  onScholarshipClick: (id: string) => void;
  onBack: () => void;
}

export default function EmploymentProgramsPage({ onScholarshipClick, onBack }: EmploymentProgramsPageProps) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchScholarships() {
      try {
        setLoading(true);
        const data = await getScholarships({ category: 'all', search: searchTerm });
        const employmentPrograms = data.filter(
          (scholarship) =>
            scholarship.title.includes('취업') ||
            scholarship.summary.includes('취업') ||
            scholarship.organization.includes('취업')
        );
        setScholarships(employmentPrograms);
      } catch (error) {
        console.error('장학금 목록 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchScholarships();
  }, [searchTerm]);

  const filteredScholarships = scholarships;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">돌아가기</span>
      </button>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900">취업 프로그램</h1>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="검색어를 입력해 주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
            검색
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t-2 border-b border-gray-300">
                <th className="py-4 px-4 text-center text-sm font-bold text-gray-700 w-24">번호</th>
                <th className="py-4 px-4 text-center text-sm font-bold text-gray-700 w-32">분류</th>
                <th className="py-4 px-4 text-left text-sm font-bold text-gray-700">제목</th>
                <th className="py-4 px-4 text-center text-sm font-bold text-gray-700 w-32">작성자</th>
                <th className="py-4 px-4 text-center text-sm font-bold text-gray-700 w-24">작성일</th>
                <th className="py-4 px-4 text-center text-sm font-bold text-gray-700 w-20">조회</th>
                <th className="py-4 px-4 text-center text-sm font-bold text-gray-700 w-20">바뀜</th>
              </tr>
            </thead>
            <tbody>
              {filteredScholarships.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => onScholarshipClick(item.id)}
                  className="border-b border-gray-200 hover:bg-green-50 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-4 text-center text-sm text-gray-700">
                    {filteredScholarships.length - index}
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-gray-700">
                    취업
                  </td>
                  <td className="py-4 px-4 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900 hover:underline">
                        {item.title}
                      </span>
                      {item.isNew && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                          NEW
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-gray-700">
                    {item.organization}
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-gray-700">
                    {formatDate(item.deadline)}
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-gray-700">
                    {item.viewCount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Eye className="w-4 h-4 text-gray-400 mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">취업 프로그램이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
