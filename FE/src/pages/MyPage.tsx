import { ArrowLeft, User, Mail, Phone, Calendar, GraduationCap, Award, Bookmark, Bell } from 'lucide-react';

interface MyPageProps {
  onBack: () => void;
}

export default function MyPage({ onBack }: MyPageProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">돌아가기</span>
      </button>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-black text-gray-900 mb-2">홍길동</h1>
            <p className="text-gray-600 mb-4">컴퓨터공학과 3학년</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-lg">
                재학생
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-lg">
                성적우수
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            개인 정보
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">이메일</p>
                <p className="font-semibold text-gray-900">hong@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">연락처</p>
                <p className="font-semibold text-gray-900">010-1234-5678</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">생년월일</p>
                <p className="font-semibold text-gray-900">2002.03.15</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-orange-600" />
            학적 정보
          </h2>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">학과</p>
              <p className="font-semibold text-gray-900">컴퓨터공학과</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">학년</p>
              <p className="font-semibold text-gray-900">3학년</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">학점</p>
              <p className="font-semibold text-gray-900">4.2 / 4.5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          보유 자격증
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="font-semibold text-blue-900">정보처리기사</p>
            <p className="text-sm text-blue-700 mt-1">2023.06</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="font-semibold text-green-900">TOEIC 900점</p>
            <p className="text-sm text-green-700 mt-1">2024.01</p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
            <p className="font-semibold text-purple-900">컴퓨터활용능력 1급</p>
            <p className="text-sm text-purple-700 mt-1">2022.12</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">지원한 장학금</h3>
            <div className="p-2 bg-blue-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-4xl font-black text-blue-600">12</p>
          <p className="text-sm text-gray-500 mt-1">건</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">저장한 항목</h3>
            <div className="p-2 bg-green-100 rounded-lg">
              <Bookmark className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-4xl font-black text-green-600">8</p>
          <p className="text-sm text-gray-500 mt-1">건</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">받은 알림</h3>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Bell className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-4xl font-black text-orange-600">24</p>
          <p className="text-sm text-gray-500 mt-1">건</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">계정 관리</h2>
        <div className="space-y-3">
          <button className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <p className="font-semibold text-gray-900">비밀번호 변경</p>
            <p className="text-sm text-gray-500 mt-1">계정 보안을 위해 비밀번호를 변경하세요</p>
          </button>
          <button className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <p className="font-semibold text-gray-900">개인정보 수정</p>
            <p className="text-sm text-gray-500 mt-1">이메일, 연락처 등을 수정하세요</p>
          </button>
          <button className="w-full p-4 text-left bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
            <p className="font-semibold text-red-900">로그아웃</p>
            <p className="text-sm text-red-600 mt-1">현재 계정에서 로그아웃합니다</p>
          </button>
        </div>
      </div>
    </div>
  );
}
