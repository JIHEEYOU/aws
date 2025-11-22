import { Home, Award, Trophy, Sparkles, BookmarkCheck, X, Bell } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'home', label: '홈', icon: Home, gradient: 'from-emerald-500 to-cyan-500' },
  { id: 'scholarships', label: '장학금', icon: Award, gradient: 'from-cyan-500 to-blue-500' },
  { id: 'competitions', label: '공모전', icon: Trophy, gradient: 'from-blue-500 to-violet-500' },
  { id: 'recommendations', label: '맞춤 추천', icon: Sparkles, gradient: 'from-violet-500 to-purple-500' },
  { id: 'saved', label: '저장한 항목', icon: BookmarkCheck, gradient: 'from-pink-500 to-rose-500' },
];

export default function Sidebar({ currentPage, onPageChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen glass-effect border-r border-white/20 z-50 transition-all duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-72 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200/60 lg:hidden">
            <span className="font-bold text-gray-900 text-lg">메뉴</span>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-all">
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    onClose();
                  }}
                  className={`group relative w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold transition-all overflow-hidden ${
                    isActive
                      ? 'text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-50 hover:scale-102'
                  }`}
                >
                  {isActive && (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} animate-gradient`}></div>
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                      </div>
                    </>
                  )}

                  <div className={`relative p-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white/20 backdrop-blur-sm'
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <span className="relative">{item.label}</span>

                  {isActive && (
                    <div className="relative ml-auto">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200/60">
            <div className="relative rounded-2xl p-5 overflow-hidden shadow-lg group hover:shadow-xl transition-all cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 animate-gradient"></div>

              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-bold text-white">알림 설정</p>
                </div>
                <p className="text-xs text-white/90 mb-3 leading-relaxed">
                  마감 임박 장학금을 놓치지 마세요
                </p>
                <button className="w-full py-2.5 px-4 bg-white text-purple-600 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all shadow-md hover:shadow-lg hover:scale-105">
                  지금 설정하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
