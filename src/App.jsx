import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';

/* ── Spinner shown while lazy page chunks are loading ─────────── */
export function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '3px solid var(--colour-grey-200)', borderTopColor: 'var(--colour-primary-600)', animation: 'spin 0.6s linear infinite' }} />
    </div>
  );
}

/* ── 404 ──────────────────────────────────────────────────────── */
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

/* ── Root layout wrapper — renders Navbar + Footer around pages ── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === '/candidates') return;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <Layout>
      <ScrollToTop />
      <Outlet />
    </Layout>
  );
}

/* ── Route config (React Router v6 data routes) ──────────────── */
export const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // Home is eager — it's the entry page, no benefit to lazy loading
      { index: true, element: <Home /> },

      { path: 'scorecards',      lazy: async () => ({ Component: (await import('./pages/ReportCards.jsx')).default }) },
      {
        path: 'scorecards/:slug',
        lazy: async () => ({ Component: (await import('./pages/CouncillorProfile.jsx')).default }),
        // Tell SSG which URLs to pre-render for this dynamic route
        getStaticPaths: async () => {
          const { councillors } = await import('./data/councillors.js');
          return councillors.map((c) => `scorecards/${c.slug}`);
        },
      },
      { path: 'candidates',    lazy: async () => ({ Component: (await import('./pages/Candidates.jsx')).default }) },
      {
        path: 'candidates/:id',
        lazy: async () => ({ Component: (await import('./pages/CandidateDetail.jsx')).default }),
        getStaticPaths: async () => {
          const { candidates } = await import('./data/candidates.js');
          return Object.values(candidates).flat().map((c) => `candidates/${c.id}`);
        },
      },
      { path: 'resources',     lazy: async () => ({ Component: (await import('./pages/Resources.jsx')).default }) },
      { path: 'wheretheystand',      lazy: async () => ({ Component: (await import('./pages/Platforms.jsx')).default }) },
      { path: 'levels-of-government', lazy: async () => ({ Component: (await import('./pages/GovernmentLevels.jsx')).default }) },
      { path: 'about',         lazy: async () => ({ Component: (await import('./pages/About.jsx')).default }) },
      { path: 'results',       lazy: async () => ({ Component: (await import('./pages/Results.jsx')).default }) },
      { path: '*',             element: <NotFound /> },
    ],
  },
];
