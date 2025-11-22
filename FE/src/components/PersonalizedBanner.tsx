import { Sparkles, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ResumeUploadModal from './ResumeUploadModal';
import SelectModeModal from './SelectModeModal';
import ResumeWriteModal from './ResumeWriteModal';

interface PersonalizedBannerProps {
  studentId: string;
}

export default function PersonalizedBanner({ studentId }: PersonalizedBannerProps) {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const handleSelectMode = (mode: 'write' | 'upload') => {
    if (mode === 'upload') {
      setIsResumeModalOpen(true);
    } else {
      setIsWriteModalOpen(true);
    }
  };
  return (
    <div className="relative rounded-3xl p-8 sm:p-10 text-white shadow-2xl overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 animate-gradient"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <div className="absolute top-10 right-10 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-20 right-32 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <img
        src="/배경화면4-removebg-preview.png"
        alt="곰두리 마스코트"
        className="absolute bottom-0 right-0 w-[600px] sm:w-[800px] md:w-[1000px] lg:w-[1200px] h-auto z-10 drop-shadow-2xl animate-float opacity-95"
        style={{ animationDelay: '0.3s' }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/KNU로고.png"
            alt="강원대학교 로고"
            className="h-10 sm:h-12 w-auto drop-shadow-lg"
          />
          <div className="h-8 w-px bg-white/30"></div>
          <span className="text-base sm:text-lg font-bold text-white drop-shadow-lg">
            강원대학교 장학금 추천
          </span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent px-4 py-1.5 rounded-full border border-white/30 backdrop-blur-md bg-white/10">
            AI 맞춤 분석 완료
          </span>
        </div>

        <div className="mb-5">
          <h2 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              곰두리님이
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              놓치고 있는 장학금
            </span>
          </h2>
          <div className="inline-flex items-baseline gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl shimmer">
            <p className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl">
              450
            </p>
            <span className="text-2xl font-bold text-white/90">만원</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/25 transition-all group/stat">
            <div className="p-1.5 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-white/70 font-medium">지원 가능</span>
              <span className="text-lg font-bold">7건</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/25 transition-all">
            <div className="p-1.5 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg animate-pulse">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-white/70 font-medium">마감 임박</span>
              <span className="text-lg font-bold">3건</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setIsSelectModalOpen(true)}
            className="group/btn px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>받으러 가기</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <SelectModeModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onSelect={handleSelectMode}
      />

      <ResumeUploadModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        studentId={studentId}
      />

      <ResumeWriteModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        studentId={studentId}
      />
    </div>
  );
}
