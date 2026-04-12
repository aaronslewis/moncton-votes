import { Link } from 'react-router-dom';

function CompassSVG() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="28" cy="28" r="26" stroke="#1e4d99" strokeWidth="2.5" fill="none" />
      {/* Tick marks */}
      <line x1="28" y1="4" x2="28" y2="10" stroke="#1e4d99" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="46" x2="28" y2="52" stroke="#1e4d99" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="28" x2="10" y2="28" stroke="#1e4d99" strokeWidth="2" strokeLinecap="round" />
      <line x1="46" y1="28" x2="52" y2="28" stroke="#1e4d99" strokeWidth="2" strokeLinecap="round" />
      {/* Cardinal labels */}
      <text x="28" y="18" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1e4d99">N</text>
      <text x="28" y="42" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1e4d99">S</text>
      <text x="14" y="30.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1e4d99">W</text>
      <text x="42" y="30.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1e4d99">E</text>
      {/* Needle — north (red) */}
      <polygon points="28,14 25.5,28 30.5,28" fill="#dc2626" />
      {/* Needle — south (grey) */}
      <polygon points="28,42 25.5,28 30.5,28" fill="#9ca3af" />
      {/* Center dot */}
      <circle cx="28" cy="28" r="3" fill="#0d2b5e" />
    </svg>
  );
}

export default function VoterCompass() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────────── */}
      <header className="page-header">
        <div className="container">
          <h1>Voter Compass</h1>
          <p>Find the candidates whose platforms best match your values.</p>
        </div>
      </header>

      <div className="container">
        {/* ── Coming Soon Content ─────────────────────────────── */}
        <div className="compass-placeholder">
          {/* Icon */}
          <div className="compass-icon" aria-hidden="true">
            <CompassSVG />
          </div>

          {/* Coming Soon badge */}
          <span
            className="badge badge-blue"
            style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', padding: 'var(--space-2) var(--space-4)' }}
          >
            Coming Soon
          </span>

          {/* Heading */}
          <h2 style={{
            fontSize: 'var(--text-3xl)',
            marginBottom: 'var(--space-5)',
            color: 'var(--colour-grey-900)',
          }}>
            Find Your Match
          </h2>

          {/* Description */}
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--colour-grey-600)',
            lineHeight: 1.8,
            marginBottom: 'var(--space-8)',
            maxWidth: '480px',
          }}>
            The Voter Compass will let you answer a series of questions about local issues —
            housing, transit, taxes, public safety, and more — then show you which candidates'
            platforms best align with your values. We're building it now. Check back closer
            to election day.
          </p>

          {/* Email signup prompt */}
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '440px',
              textAlign: 'left',
              backgroundColor: 'var(--colour-primary-50)',
              border: '1.5px solid var(--colour-primary-200)',
            }}
          >
            <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)', color: 'var(--colour-primary-900)' }}>
              Get notified when it launches
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--colour-primary-800)', lineHeight: 1.7, marginBottom: 0 }}>
              Want to know when the Voter Compass is ready? Send us a note at{' '}
              <a href="mailto:info@monctoncitypoli.ca" style={{ color: 'var(--colour-primary-700)', fontWeight: 600 }}>
                info@monctoncitypoli.ca
              </a>{' '}
              and we'll let you know.
            </p>
          </div>

          {/* Back link */}
          <Link
            to="/"
            className="btn btn-ghost"
            style={{ marginTop: 'var(--space-8)', color: 'var(--colour-grey-600)' }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
