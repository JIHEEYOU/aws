import { X, FileText } from 'lucide-react';
import { useState } from 'react';

interface ResumeWriteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeWriteModal({ isOpen, onClose }: ResumeWriteModalProps) {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState('');
  const [spec, setSpec] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log('Resume form submitted', { name, major, grade, spec });
    onClose();
  };

  const isDisabled = !name || !major || !grade || !spec;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 rounded-t-3xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">이력서 작성</h2>
                <p className="text-blue-100 text-sm mt-1">학생 정보를 입력하고 이력서를 작성하세요</p>
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

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">이름</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 홍길동"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">전공</label>
            <input
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="예: 컴퓨터공학과"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">학년</label>
            <input
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="예: 3학년"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">보유 자격증</label>
            <textarea
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              placeholder="자격증을 입력하세요"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition-all"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`px-6 py-3 font-semibold rounded-xl transition-all ${
              isDisabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
            }`}
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
}
