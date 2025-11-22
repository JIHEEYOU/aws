import { X, Bell, Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [scholarshipAlerts, setScholarshipAlerts] = useState(true);
  const [competitionAlerts, setCompetitionAlerts] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">알림 설정</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">알림 방식</h3>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-semibold text-gray-900">이메일 알림</p>
                  <p className="text-sm text-gray-500">이메일로 알림을 받습니다</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-semibold text-gray-900">푸시 알림</p>
                  <p className="text-sm text-gray-500">브라우저 푸시 알림을 받습니다</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">알림 내용</h3>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">새로운 장학금</p>
                <p className="text-sm text-gray-500">신규 장학금 공고 알림</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={scholarshipAlerts}
                  onChange={(e) => setScholarshipAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">새로운 공모전</p>
                <p className="text-sm text-gray-500">신규 공모전 공고 알림</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={competitionAlerts}
                  onChange={(e) => setCompetitionAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">마감 알림</p>
                <p className="text-sm text-gray-500">지원 마감일 3일 전 알림</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={deadlineReminders}
                  onChange={(e) => setDeadlineReminders(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
