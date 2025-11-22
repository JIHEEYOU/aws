import { Calendar, Building2, TrendingUp, Bookmark, ExternalLink, Award, Trophy, Sparkles } from 'lucide-react';
import { Scholarship } from '../types/scholarship';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onClick?: () => void;
}

export default function ScholarshipCard({ scholarship, onClick }: ScholarshipCardProps) {
  const Icon = scholarship.category === 'scholarship' ? Award : Trophy;
  const isScholarship = scholarship.category === 'scholarship';

  return (
    <div
      onClick={onClick}
      className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-cyan-50/30 to-white opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className={`relative px-3 py-1.5 ${
              isScholarship
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                : 'bg-gradient-to-r from-blue-500 to-violet-500'
            } text-white text-xs font-bold rounded-lg shadow-md group-hover:shadow-lg transition-all`}>
              <Icon className="w-3.5 h-3.5 inline mr-1.5" />
              {scholarship.category === 'scholarship' ? '장학금' : '공모전'}
            </div>
            {scholarship.isNew && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg blur opacity-75 animate-pulse"></div>
                <span className="relative px-3 py-1.5 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3" />
                  NEW
                </span>
              </div>
            )}
          </div>
          <button className="p-2 rounded-xl hover:bg-white/80 transition-all group-hover:scale-110 backdrop-blur-sm">
            <Bookmark className="w-5 h-5 text-gray-400 hover:text-cyan-500 transition-colors" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors">
          {scholarship.title}
        </h3>

        <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
          {scholarship.summary}
        </p>

        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
              <Building2 className="w-3.5 h-3.5 text-gray-600" />
            </div>
            <span className="text-sm text-gray-700 font-medium">{scholarship.organization}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-700">
              <span className="font-semibold text-orange-600">D-7</span>
              <span className="mx-1.5 text-gray-400">·</span>
              {scholarship.deadline}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 group-hover:border-gray-300 transition-colors">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium mb-0.5">지원 금액</span>
            <span className="text-xl font-black text-blue-600">
              {scholarship.amount}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-200 group-hover:border-gray-300 transition-colors">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-gray-700">{scholarship.viewCount.toLocaleString()}</span>
            </div>
            <div className="p-2 bg-blue-600 rounded-lg opacity-100 transition-all shadow-md">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
