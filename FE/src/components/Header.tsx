import { Bell, User, Search, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import NotificationModal from './NotificationModal';

interface HeaderProps {
  onNavigateHome?: () => void;
  onNavigateMyPage?: () => void;
}

export default function Header({ onNavigateHome, onNavigateMyPage }: HeaderProps) {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end gap-6 text-sm">
            <a href="#" className="text-white hover:text-blue-100 transition-colors font-medium">학생경력</a>
            <a href="#" className="text-white hover:text-blue-100 transition-colors font-medium">채용정보</a>
            <a href="#" className="text-white hover:text-blue-100 transition-colors font-medium">설문조사</a>
          </div>
        </div>
      </div>
      <div className="glass-effect border-b border-white/20 shadow-lg">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 -ml-2 cursor-pointer" onClick={onNavigateHome}>
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-gray-900 via-cyan-700 to-blue-700 bg-clip-text text-transparent">
                장학금 알리미
              </h1>
              <p className="text-xs text-gray-500 font-medium">AI Scholarship Finder</p>
            </div>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors z-10" />
              <input
                type="text"
                placeholder="장학금, 공모전 검색..."
                className="relative w-full pl-12 pr-4 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="relative p-2.5 rounded-xl hover:bg-white/80 transition-all backdrop-blur-sm group"
            >
              <Bell className="w-6 h-6 text-gray-700 group-hover:text-cyan-600 transition-colors" />
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </button>
            <button
              onClick={onNavigateMyPage}
              className="p-2.5 rounded-xl hover:bg-white/80 transition-all backdrop-blur-sm group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors z-10" />
            <input
              type="text"
              placeholder="장학금, 공모전 검색..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
            />
          </div>
        </div>
      </div>
      </div>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </header>
  );
}
