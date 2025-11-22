import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';
import RecommendationPage from './pages/RecommendationPage';
import SavedPage from './pages/SavedPage';
import MajorRecommendationsPage from './pages/MajorRecommendationsPage';
import CertificateScholarshipsPage from './pages/CertificateScholarshipsPage';
import EmploymentProgramsPage from './pages/EmploymentProgramsPage';
import AllItemsPage from './pages/AllItemsPage';
import MyPage from './pages/MyPage';
import ApplicationsPage from './pages/ApplicationsPage';
import { getOrCreateStudentId } from './utils/studentId';

type Page = 'home' | 'scholarships' | 'competitions' | 'recommendations' | 'saved' | 'detail' | 'major-recommendations' | 'certificate-scholarships' | 'employment-programs' | 'all-items' | 'mypage' | 'applications';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string>('');
  const [studentId] = useState<string>(() => getOrCreateStudentId());


  const handleScholarshipClick = (id: string) => {
    setSelectedScholarshipId(id);
    setCurrentPage('detail');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleNavigateMyPage = () => {
    setCurrentPage('mypage');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onScholarshipClick={handleScholarshipClick}
            onNavigate={handlePageChange}
            studentId={studentId}
          />
        );
      case 'detail':
        return (
          <DetailPage
            scholarshipId={selectedScholarshipId}
            onBack={handleBackToHome}
            studentId={studentId}
          />
        );
      case 'scholarships':
        return (
          <ListPage category="scholarship" onScholarshipClick={handleScholarshipClick} />
        );
      case 'competitions':
        return (
          <ListPage category="competition" onScholarshipClick={handleScholarshipClick} />
        );
      case 'recommendations':
        return <RecommendationPage onScholarshipClick={handleScholarshipClick} />;
      case 'saved':
        return <SavedPage onScholarshipClick={handleScholarshipClick} />;
      case 'major-recommendations':
        return <MajorRecommendationsPage onScholarshipClick={handleScholarshipClick} onBack={handleBackToHome} />;
      case 'certificate-scholarships':
        return <CertificateScholarshipsPage onScholarshipClick={handleScholarshipClick} onBack={handleBackToHome} />;
      case 'employment-programs':
        return <EmploymentProgramsPage onScholarshipClick={handleScholarshipClick} onBack={handleBackToHome} />;
      case 'all-items':
        return <AllItemsPage onScholarshipClick={handleScholarshipClick} onBack={handleBackToHome} />;
      case 'mypage':
        return <MyPage onBack={handleBackToHome} />;
      case 'applications':
        return <ApplicationsPage onScholarshipClick={handleScholarshipClick} onBack={handleBackToHome} />;
      default:
        return (
          <HomePage
            onScholarshipClick={handleScholarshipClick}
            onNavigate={handlePageChange}
            studentId={studentId}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">

      <Header onNavigateHome={handleBackToHome} onNavigateMyPage={handleNavigateMyPage} />

      <main className="p-4 sm:p-6 lg:p-8 max-w-[1920px] mx-auto w-full relative px-6 sm:px-8 lg:px-12">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
