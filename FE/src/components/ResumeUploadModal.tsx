import { X, Upload, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getResume, uploadResume, type ResumeResponse } from '../api/resume';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
}

export default function ResumeUploadModal({
  isOpen,
  onClose,
  studentId,
}: ResumeUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [existingResume, setExistingResume] = useState<ResumeResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const resume = await getResume(studentId);
        setExistingResume(resume);
      } catch {
        setExistingResume(null);
      }
    };

    if (isOpen) {
      setSelectedFile(null);
      setErrorMessage(null);
      fetchResume();
    }
  }, [isOpen, studentId]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const uploaded = await uploadResume(studentId, selectedFile, {
        method: 'upload',
        version: 'v1',
      });
      setExistingResume(uploaded);
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '업로드에 실패했습니다. 다시 시도해 주세요.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 rounded-t-3xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">이력서 업로드</h2>
                <p className="text-blue-100 text-sm mt-1">
                  토큰 모델 파일을 선택하고 버전과 설명을 입력하세요
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

        <div className="p-6">
          <div className="mb-6 space-y-3">
            <h3 className="text-gray-900 font-semibold mb-3">모델 파일 (.PDF)</h3>
            {existingResume && (
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-900">
                <p className="font-semibold">이전에 업로드한 파일</p>
                <a
                  href={existingResume.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-blue-600 text-sm"
                >
                  {existingResume.fileName}
                </a>
              </div>
            )}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>

                {selectedFile ? (
                  <div className="mb-4">
                    <p className="text-gray-900 font-semibold mb-1">선택된 파일</p>
                    <p className="text-gray-600">{selectedFile.name}</p>
                  </div>
                ) : (
                  <p className="text-gray-900 font-semibold mb-2">선택된 파일 없음</p>
                )}

                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    <Upload className="w-5 h-5" />
                    파일 선택
                  </span>
                </label>
              </div>
            </div>
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
            onClick={handleUpload}
            disabled={!selectedFile || isSubmitting}
            className={`px-6 py-3 font-semibold rounded-xl transition-all ${
              selectedFile && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? '업로드 중...' : '업로드'}
          </button>
        </div>
      </div>
    </div>
  );
}
