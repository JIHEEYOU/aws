import { useState } from 'react';
import ScholarshipCard from '../components/ScholarshipCard';
import { getRecommendedScholarships } from '../api/scholarships';
import { Scholarship } from '../types/scholarship';
import { Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

interface RecommendationPageProps {
  onScholarshipClick: (id: string) => void;
}

export default function RecommendationPage({ onScholarshipClick }: RecommendationPageProps) {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [loading, setLoading] = useState(false);
  const [recommendedScholarships, setRecommendedScholarships] = useState<Scholarship[]>([]);
  const [formData, setFormData] = useState({
    grade: '',
    major: '',
    gpa: '',
    income: '',
    certificates: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.grade || !formData.major) {
      alert('학년과 학과를 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      const results = await getRecommendedScholarships(
        formData.major,
        formData.grade,
        formData.certificates,
      );
      setRecommendedScholarships(results);
      setStep('result');
    } catch (error) {
      console.error('추천 장학금 조회 실패:', error);
      alert('추천 장학금을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCertificate = (cert: string) => {
    setFormData({
      ...formData,
      certificates: formData.certificates.includes(cert)
        ? formData.certificates.filter((c) => c !== cert)
        : [...formData.certificates, cert],
    });
  };

  const totalAmount = recommendedScholarships.reduce((sum, s) => {
    const amount = parseInt(s.amount.replace(/[^0-9]/g, '')) || 0;
    return sum + amount;
  }, 0);

  if (step === 'form') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 sm:p-8 mb-6 border border-cyan-100">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-cyan-600" />
            <h1 className="text-3xl font-bold text-gray-900">맞춤 장학금 추천</h1>
          </div>
          <p className="text-gray-700">
            간단한 정보를 입력하시면 AI가 맞춤형 장학금을 추천해드립니다
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">학년</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['1학년', '2학년', '3학년', '4학년'].map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setFormData({ ...formData, grade })}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      formData.grade === grade
                        ? 'bg-cyan-100 text-cyan-700 border-2 border-cyan-500 shadow-sm'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">학과</label>
              <select
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              >
                <option value="">선택해주세요</option>
                <option value="컴퓨터공학">컴퓨터공학</option>
                <option value="소프트웨어학과">소프트웨어학과</option>
                <option value="정보통신공학">정보통신공학</option>
                <option value="경영학과">경영학과</option>
                <option value="경제학과">경제학과</option>
                <option value="기계공학">기계공학</option>
                <option value="전기전자공학">전기전자공학</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">평균 학점</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4.5"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                placeholder="예: 3.8"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">소득 분위</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['기초생활수급자', '차상위계층', '1~3분위', '4~6분위', '7~8분위', '해당없음'].map(
                  (income) => (
                    <button
                      key={income}
                      type="button"
                      onClick={() => setFormData({ ...formData, income })}
                      className={`py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                        formData.income === income
                          ? 'bg-cyan-100 text-cyan-700 border-2 border-cyan-500 shadow-sm'
                          : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {income}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                보유 자격증 (선택)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['TOEIC', 'TOEFL', 'IELTS', '정보처리기사', '컴퓨터활용능력', '기타'].map(
                  (cert) => (
                    <button
                      key={cert}
                      type="button"
                      onClick={() => toggleCertificate(cert)}
                      className={`py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                        formData.certificates.includes(cert)
                          ? 'bg-cyan-100 text-cyan-700 border-2 border-cyan-500 shadow-sm'
                          : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {cert}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!formData.grade || !formData.major || loading}
            className="w-full mt-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>{loading ? '추천 중...' : 'AI 추천 받기'}</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-8 h-8" />
          <h2 className="text-2xl sm:text-3xl font-bold">분석 완료!</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-cyan-50 mb-1">지원 가능 장학금</p>
            <p className="text-3xl font-bold">{recommendedScholarships.length}건</p>
          </div>
          <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-cyan-50 mb-1">예상 수혜 금액</p>
            <p className="text-3xl font-bold">{(totalAmount / 10000).toFixed(0)}만원</p>
          </div>
          <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-cyan-50 mb-1">매칭률</p>
            <p className="text-3xl font-bold flex items-center gap-1">
              <TrendingUp className="w-6 h-6" />
              92%
            </p>
          </div>
        </div>

        <button
          onClick={() => setStep('form')}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all"
        >
          다시 분석하기
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">추천 장학금</h3>
        <p className="text-gray-600">고객님의 조건에 맞는 장학금을 찾았습니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedScholarships.map((scholarship) => (
          <ScholarshipCard
            key={scholarship.id}
            scholarship={scholarship}
            onClick={() => onScholarshipClick(scholarship.id)}
          />
        ))}
      </div>

      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h4 className="font-semibold text-gray-900 mb-2">추천 팁</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>마감일이 가까운 장학금부터 지원하세요</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>여러 장학금에 동시 지원이 가능합니다</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>알림 설정으로 새로운 장학금 정보를 놓치지 마세요</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
