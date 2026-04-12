import { useParams, Link } from 'react-router-dom';
import { councillors, SCORECARD_CATEGORIES, getTierColors } from '../data/councillors.js';
import GradeBar from '../components/GradeBar.jsx';

export default function CouncillorProfile() {
  const { slug }     = useParams();
  const councillor   = councillors.find((c) => c.slug === slug);

  if (!councillor) {
    return (
      <div style={{ padding: 'var(--space-16) var(--space-4)', textAlign: 'center' }}>
        <h1 style={{ marginBottom: 'var(--space-4)' }}>Profile Not Found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
          No councillor profile matches "<strong>{slug}</strong>".
        </p>
        <Link to="/scorecards" className="btn btn-primary">← Back to Scorecards</Link>
      </div>
    );
  }

  const tier         = getTierColors(councillor.score);
  const initials     = councillor.name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  const summaryParas = councillor.overall_assessment?.split('\n\n') ?? [];

  return (
    <>
      {/* ── Profile header ── */}
      <div style={{
        background:   tier.bg,
        padding:      'var(--space-10) 0 var(--space-12)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}>
        <div className="container">
          <Link
            to="/scorecards"
            style={{ color: tier.text, fontSize: 'var(--text-sm)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-6)', fontWeight: 600, textDecoration: 'none', opacity: 0.8 }}
          >
            ← Back to Scorecards
          </Link>

          <div className="profile-header-row">
            {/* Avatar */}
            <div className="profile-header-avatar" style={{
              width:          '80px',
              height:         '80px',
              borderRadius:   '50%',
              background:     `${tier.bar}30`,
              border:         `3px solid ${tier.bar}`,
              alignItems:     'center',
              justifyContent: 'center',
              fontSize:       'var(--text-2xl)',
              fontWeight:     700,
              color:          tier.text,
              flexShrink:     0,
              fontFamily:     "'Fraunces Variable', 'Fraunces', Georgia, serif",
            }}>
              {initials}
            </div>

            {/* Name + meta */}
            <div className="profile-name-block">
              <h1 style={{ color: '#1E2D3D', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
                {councillor.name}
              </h1>
              <div style={{ fontSize: 'var(--text-sm)', color: '#5A6375', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span>{councillor.role}{councillor.ward && councillor.ward !== 'City-wide' && ` · ${councillor.ward}`}</span>
                {councillor.reOffering === false && (
                  <span style={{ display: 'inline-block', padding: '0.15rem 0.55rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600, background: '#F8FAFC', color: '#94A3B8', border: '1px solid #E2E8F0' }}>
                    Not re-offering
                  </span>
                )}
                {councillor.reOffering === 'mayor' && (
                  <span style={{ display: 'inline-block', padding: '0.15rem 0.55rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600, background: '#fff', color: '#166534', border: '1px solid #16A34A' }}>
                    Re-offering — Mayor
                  </span>
                )}
                {councillor.reOffering === 'atlarge' && (
                  <span style={{ display: 'inline-block', padding: '0.15rem 0.55rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600, background: '#fff', color: '#166534', border: '1px solid #16A34A' }}>
                    Re-offering — At-Large
                  </span>
                )}
                {councillor.reOffering === true && (
                  <span style={{ display: 'inline-block', padding: '0.15rem 0.55rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600, background: '#fff', color: '#166534', border: '1px solid #16A34A' }}>
                    Re-offering
                  </span>
                )}
              </div>
              {councillor.term_info && (
                <div style={{ fontSize: 'var(--text-xs)', color: '#5A6375' }}>
                  {councillor.term_info}
                </div>
              )}
            </div>

            {/* Score display */}
            <div className="profile-score" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '3.5rem', fontWeight: 800, color: tier.text, lineHeight: 1, letterSpacing: '-0.04em' }}>
                {councillor.score}
                <sup style={{ fontSize: '1.2rem', fontWeight: 600, opacity: 0.55, verticalAlign: 'super', letterSpacing: 0 }}>/100</sup>
              </div>
              <span style={{
                display:       'inline-block',
                padding:       '0.35rem 0.9rem',
                borderRadius:  '20px',
                fontSize:      '0.85rem',
                fontWeight:    700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background:    tier.bar,
                color:         '#fff',
              }}>
                {councillor.descriptor}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-16)' }}>
        <div style={{ maxWidth: '800px' }}>

          {/* Overall assessment */}
          <section className="card" style={{ marginBottom: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', color: '#1E2D3D' }}>
              Overall Assessment
            </h2>
            {summaryParas.length > 0 ? (
              summaryParas.map((para, i) => (
                <p key={i} style={{
                  fontSize:     'var(--text-base)',
                  color:        '#444',
                  lineHeight:   1.8,
                  marginBottom: i < summaryParas.length - 1 ? 'var(--space-4)' : 0,
                }}>
                  {para}
                </p>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Overall assessment pending.
              </p>
            )}
          </section>

          {/* Scorecard categories */}
          <section className="card" style={{ marginBottom: 'var(--space-8)' }}>
            <div className="scorecard-section-header">
              <h2 style={{ fontSize: 'var(--text-lg)', color: '#1E2D3D' }}>
                Category Scorecards
              </h2>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                Click "Read" to expand each assessment
              </span>
            </div>

            {SCORECARD_CATEGORIES.map((cat) => {
              const g = councillor.grades[cat.key];
              return (
                <GradeBar
                  key={cat.key}
                  category={cat.label}
                  letter={g?.letter || '—'}
                  score={g?.score   || 0}
                  notes={g?.notes   || ''}
                  note={g?.note     || null}
                />
              );
            })}
          </section>

          {/* Sources */}
          {councillor.sources && councillor.sources.length > 0 && (
            <section className="card" style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', color: '#1E2D3D' }}>
                Sources
              </h2>
              <ol style={{ paddingLeft: 'var(--space-5)', margin: 0 }}>
                {councillor.sources.map((s, i) => (
                  <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-2)', lineHeight: 1.6 }}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500 }}>
                      {s.title}
                    </a>
                    {s.outlet && (
                      <span style={{ color: 'var(--colour-grey-400)', marginLeft: 'var(--space-1)' }}>
                        — {s.outlet}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* About these scores */}
          <div className="notice" style={{ borderLeftColor: 'var(--accent)', background: '#fff' }}>
            <strong>About these scores</strong>
            <p style={{ marginTop: '0.6rem', marginBottom: '0.75rem' }}>
              These scorecards were developed through deep research conducted by Claude AI. Each councillor is
              evaluated across six equally-weighted categories built around what defines effective civic
              leadership — independent of political affiliation. Category scores are derived from letter grades
              converted to a scale out of 100 (A = 100, A− = 93, B+ = 83, B = 75, B− = 68, C+ = 58, C = 50,
              D = 25). An overall score of 80 or above is rated <strong>Great</strong>; 70–79 is{' '}
              <strong>Good</strong>; 60–69 is <strong>Okay</strong>; below 60 is <strong>Poor</strong>.
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              Research draws from City of Moncton official records and official news sources. This evaluation
              is independently produced and is not affiliated with the City of Moncton or any political party.
            </p>
            <p style={{ marginBottom: 0 }}>
              Scores are updated by feeding evidence-based information to the AI algorithm, which uses it to
              further refine its evaluation of each category. To submit evidence that may affect a score,
              email{' '}
              <a href="mailto:info@monctonvotes.ca" style={{ fontWeight: 600 }}>info@monctonvotes.ca</a>
              {' '}— all submitted evidence will be provided to the algorithm.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
