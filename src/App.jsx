import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout.jsx';

const Home              = lazy(() => import('./pages/Home.jsx'));
const ReportCards       = lazy(() => import('./pages/ReportCards.jsx'));
const CouncillorProfile = lazy(() => import('./pages/CouncillorProfile.jsx'));
const Candidates        = lazy(() => import('./pages/Candidates.jsx'));
const Resources         = lazy(() => import('./pages/Resources.jsx'));
const VoterCompass      = lazy(() => import('./pages/VoterCompass.jsx'));

function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '3px solid var(--colour-grey-200)', borderTopColor: 'var(--colour-primary-600)', animation: 'spin 0.6s linear infinite' }} />
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>Page Not Found</h1>
      <p style={{ marginTop: '1rem', color: 'var(--colour-grey-600)' }}>
        The page you're looking for doesn't exist.
      </p>
      <a href="/" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
        Back to Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scorecards" element={<ReportCards />} />
          <Route path="/scorecards/:slug" element={<CouncillorProfile />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/voter-compass" element={<VoterCompass />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
