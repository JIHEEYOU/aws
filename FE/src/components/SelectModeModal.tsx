import { X, FileText, Upload } from 'lucide-react';

interface SelectModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (mode: 'write' | 'upload') => void;
}

export default function SelectModeModal({ isOpen, onClose, onSelect }: SelectModeModalProps) {
  if (!isOpen) return null;

  const handleSelect = (mode: 'write' | 'upload') => {
    onSelect(mode);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 rounded-t-3xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">학색정보 입력</h2>
                <p className="text-blue-100 text-sm mt-1">
                  이력서 작성 방식 중 하나를 선택하세요
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Option 1: 이력서 작성 */}
          <button
            onClick={() => handleSelect('write')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md
              border-gray-300 bg-gray-50 hover:bg-blue-50 hover:border-blue-500`}
          >
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <FileText className="w-7 h-7 text-blue-700" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">이력서 작성</h3>
              <p className="text-gray-600 text-sm mt-1">
                화면에서 직접 정보를 입력하여 이력서를 작성합니다
              </p>
            </div>
          </button>

          {/* Option 2: 이력서 파일 첨부 */}
          <button
            onClick={() => handleSelect('upload')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md
              border-gray-300 bg-gray-50 hover:bg-blue-50 hover:border-blue-500`}
          >
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <Upload className="w-7 h-7 text-blue-700" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">이력서 첨부</h3>
              <p className="text-gray-600 text-sm mt-1">
                이미 작성된 이력서를 PDF 파일로 업로드합니다
              </p>
            </div>
          </button>

        </div>

      </div>
    </div>
  );
}
