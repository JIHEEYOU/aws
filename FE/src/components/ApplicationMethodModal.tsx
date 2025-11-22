import { X, FileText, FormInput } from 'lucide-react';

interface ApplicationMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMethod: (method: 'resume' | 'form') => void;
}

export default function ApplicationMethodModal({ isOpen, onClose, onSelectMethod }: ApplicationMethodModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 rounded-t-3xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">신청 방법 선택</h2>
              <p className="text-blue-100 text-sm mt-1">
                원하시는 신청 방법을 선택해주세요
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                onSelectMethod('resume');
                onClose();
              }}
              className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 hover:border-blue-400 p-6 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">이력서 제출</h3>
                  <p className="text-sm text-gray-600">
                    PDF 형식의 이력서를 업로드하여 신청합니다
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectMethod('form');
                onClose();
              }}
              className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 p-6 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FormInput className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">입력폼 작성</h3>
                  <p className="text-sm text-gray-600">
                    필요한 정보를 직접 입력하여 신청합니다
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition-all"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
