import { CANDIDATE_QUESTIONS } from '../data/candidates.js';

export default function Platforms() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>Candidate Platforms</h1>
          <p>Where the candidates stand on the issues that matter most to Moncton.</p>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--colour-grey-700)', marginBottom: 'var(--space-8)', lineHeight: 1.7 }}>
          Candidates were asked to answer the following questions. Their responses will be posted the week of April 28th.
        </p>

        <ol style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', paddingLeft: 0, listStyle: 'none' }}>
          {CANDIDATE_QUESTIONS.map((question, i) => (
            <li key={i} className="card" style={{ padding: 'var(--space-5) var(--space-6)', display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
              <span style={{
                flexShrink: 0,
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--colour-primary-600)',
                paddingTop: '2px',
                minWidth: '2rem',
              }}>
                Q{i + 1}
              </span>
              <span style={{ fontSize: 'var(--text-base)', color: '#1E2D3D', lineHeight: 1.6 }}>
                {question}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
