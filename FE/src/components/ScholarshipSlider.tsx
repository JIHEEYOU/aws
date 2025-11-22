import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScholarshipCard from './ScholarshipCard';
import { Scholarship } from '../types/scholarship';

interface ScholarshipSliderProps {
  scholarships: Scholarship[];
  onScholarshipClick: (id: string) => void;
  autoPlayInterval?: number;
}

export default function ScholarshipSlider({
  scholarships,
  onScholarshipClick,
  autoPlayInterval = 4000,
}: ScholarshipSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const maxIndex = scholarships.length - itemsPerPage;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [maxIndex, autoPlayInterval]);

  const goToNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0;
      }
      return prev + 1;
    });
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex;
      }
      return prev - 1;
    });
  };

  const getCurrentItems = () => {
    return scholarships.slice(currentIndex, currentIndex + itemsPerPage);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-[320px]">
        {getCurrentItems().map((scholarship) => (
          <ScholarshipCard
            key={scholarship.id}
            scholarship={scholarship}
            onClick={() => onScholarshipClick(scholarship.id)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={goToPrev}
          className="p-2 rounded-xl bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
          aria-label="이전"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`${index + 1}번째로 이동`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 rounded-xl bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
          aria-label="다음"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
