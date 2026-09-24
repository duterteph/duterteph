import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import ICCExplainedPage from './pages/ICCExplainedPage';
import SaraDutertePage from './pages/SaraDutertePage';
import PhilippinesICCPage from './pages/PhilippinesICCPage';
import DocumentsPage from './pages/DocumentsPage';
import SourcesPage from './pages/SourcesPage';
import ClaimsPage from './pages/ClaimsPage';
import UpdatesPage from './pages/UpdatesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import BookmarksPage from './pages/BookmarksPage';
import AboutPage from './pages/AboutPage';
import MethodologyPage from './pages/MethodologyPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="timeline" element={<TimelinePage />} />
              <Route path="icc-explained" element={<ICCExplainedPage />} />
              <Route path="sara-duterte" element={<SaraDutertePage />} />
              <Route path="philippines-and-icc" element={<PhilippinesICCPage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="sources" element={<SourcesPage />} />
              <Route path="claims" element={<ClaimsPage />} />
              <Route path="updates" element={<UpdatesPage />} />
              <Route path="updates/:id" element={<ArticleDetailPage />} />
              <Route path="bookmarks" element={<BookmarksPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="methodology" element={<MethodologyPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </BookmarkProvider>
    </ThemeProvider>
  );
}

export default App;
