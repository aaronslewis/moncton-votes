import { Link } from 'react-router-dom';
import { councillors, SCORECARD_CATEGORIES, getTierColors } from '../data/councillors.js';

const alphabetical = [...councillors].sort((a, b) => a.name.localeCompare(b.name));
const reOffering    = alphabetical.filter(c => c.reOffering !== false);
const notReOffering = alphabetical.filter(c => c.reOffering === false);

const reOfferingStyle = {
  display:      'inline-block',
  padding:      '0.15rem 0.55rem',
  borderRadius: '20px',
  fontSize:     '0.68rem',
  fontWeight:   600,
  background:   '#fff',
  color:        '#166534',
  border:       '1px solid #16A34A',
  whiteSpace:   'nowrap',
};

const notReOfferingStyle = {
  ...reOfferingStyle,
  background: '#F8FAFC',
  color:      '#94A3B8',
  border:     '1px solid #E2E8F0',
};

function ReOfferingBadge({ reOffering }) {
  if (reOffering === false)     return <span style={notReOfferingStyle}>Not re-offering</span>;
  if (reOffering === 'mayor')   return <span style={reOfferingStyle}>Re-offering — Mayor</span>;
  if (reOffering === 'atlarge') return <span style={reOfferingStyle}>Re-offering — At-Large</span>;
  if (reOffering === true)      return <span style={reOfferingStyle}>Re-offering</span>;
  return null;
}

function DescriptorBadge({ descriptor, bar }) {
  return (
    <span style={{
      display:       'inline-block',
      padding:       '0.2rem 0.65rem',
      borderRadius:  '20px',
      fontSize:      '0.72rem',
      fontWeight:    700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      background:    bar,
      color:         '#fff',
    }}>
      {descriptor}
    </span>
  );
}

export default function ReportCards() {
  return (
    <>
      {/* ── Page header ── */}
      <div className="page-header">
        <div className="container">
          <h1>Performance Scorecards</h1>
          <p>Independent performance scorecards for every member of Moncton City Council.</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)' }}>

        {/* ── Guide ── */}
        <section style={{ marginBottom: 'var(--space-10)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', color: '#1E2D3D' }}>Guide</h2>
          <p style={{ fontSize: 'var(--text-base)', color: '#444', lineHeight: 1.75, margin: 0 }}>
            These scorecards are the result of a deep, AI-powered analysis of each councillor's performance
            record across six categories that define high-performing civic leadership. Scores reflect each
            councillor's contribution to an effective and functional city council — not their political
            views or alignment. Click any councillor to see the full score breakdown, category-by-category
            reasoning, and sources. Use this as a starting point for your own research, not the final word.
          </p>
        </section>

        {/* ── Scorecard grid ── */}
        <section>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>
            2021–2026 Councillor Scorecards
          </h2>

          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', color: '#1E2D3D' }}>Re-offering</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: 'var(--space-10)' }}>
            {reOffering.map((c) => {
              const tier = getTierColors(c.score);
              const excerpt = c.overall_assessment?.split('\n\n')[0] ?? '';
              const wardLabel = c.ward && c.ward !== 'City-wide' ? c.ward : null;
              return (
                <Link
                  key={c.id}
                  to={`/scorecards/${c.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
                >
                  <div style={{
                    background:   '#fff',
                    borderRadius: '10px',
                    overflow:     'hidden',
                    boxShadow:    '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px #E2DDD8',
                    display:      'flex',
                    flexDirection:'column',
                    flex:         1,
                    transition:   'box-shadow 0.15s',
                    borderTop:    `4px solid ${tier.bar}`,
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12), 0 0 0 1px #E2DDD8'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px #E2DDD8'}
                  >

                    {/* Body */}
                    <div style={{ padding: '1rem 1.25rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <div>
                        <div style={{ fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif", fontSize: '1.15rem', fontWeight: 700, color: '#1E2D3D', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                          {c.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#5A6375', fontWeight: 500, marginTop: '0.15rem' }}>
                          {c.role}{c.ward && c.ward !== 'City-wide' ? ` · ${c.ward}` : ''}
                        </div>
                        {c.reOffering !== undefined && (
                          <div style={{ marginTop: '0.35rem' }}>
                            <ReOfferingBadge reOffering={c.reOffering} />
                          </div>
                        )}
                      </div>
                      {excerpt && (
                        <p style={{ fontSize: '0.845rem', color: '#444', lineHeight: 1.55, flex: 1, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {excerpt}
                        </p>
                      )}
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 600, color: '#14532D', marginTop: '0.25rem' }}>
                        View scorecard →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', color: '#1E2D3D' }}>Not Re-offering</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {notReOffering.map((c) => {
              const tier = getTierColors(c.score);
              const excerpt = c.overall_assessment?.split('\n\n')[0] ?? '';
              const wardLabel = c.ward && c.ward !== 'City-wide' ? c.ward : null;
              return (
                <Link
                  key={c.id}
                  to={`/scorecards/${c.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
                >
                  <div style={{
                    background:   '#fff',
                    borderRadius: '10px',
                    overflow:     'hidden',
                    boxShadow:    '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px #E2DDD8',
                    display:      'flex',
                    flexDirection:'column',
                    flex:         1,
                    transition:   'box-shadow 0.15s',
                    borderTop:    `4px solid ${tier.bar}`,
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12), 0 0 0 1px #E2DDD8'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px #E2DDD8'}
                  >
                    <div style={{ padding: '1rem 1.25rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <div>
                        <div style={{ fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif", fontSize: '1.15rem', fontWeight: 700, color: '#1E2D3D', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                          {c.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#5A6375', fontWeight: 500, marginTop: '0.15rem' }}>
                          {c.role}{c.ward && c.ward !== 'City-wide' ? ` · ${c.ward}` : ''}
                        </div>
                        {c.reOffering !== undefined && (
                          <div style={{ marginTop: '0.35rem' }}>
                            <ReOfferingBadge reOffering={c.reOffering} />
                          </div>
                        )}
                      </div>
                      {excerpt && (
                        <p style={{ fontSize: '0.845rem', color: '#444', lineHeight: 1.55, flex: 1, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {excerpt}
                        </p>
                      )}
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 600, color: '#14532D', marginTop: '0.25rem' }}>
                        View scorecard →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Grade legend ── */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: 'var(--space-6)', marginTop: 'var(--space-12)' }}>
          {[
            { label: 'Great', range: '80 – 100', bg: '#D1FAE5', text: '#065F46' },
            { label: 'Good',  range: '70 – 79',  bg: '#DBEAFE', text: '#1E40AF' },
            { label: 'Okay',  range: '60 – 69',  bg: '#FEF3C7', text: '#92400E' },
            { label: 'Poor',   range: 'Below 60', bg: '#FEE2E2', text: '#991B1B' },
          ].map((tier) => (
            <div key={tier.label} style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '0.5rem',
              padding:       '0.5rem 1rem',
              borderRadius:  '8px',
              fontSize:      '0.8rem',
              fontWeight:    600,
              background:    tier.bg,
              color:         tier.text,
            }}>
              {tier.label}
              <span style={{ fontWeight: 400, opacity: 0.75 }}>{tier.range}</span>
            </div>
          ))}
        </div>

        {/* ── Combined methodology + corrections notice ── */}
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
    </>
  );
}
