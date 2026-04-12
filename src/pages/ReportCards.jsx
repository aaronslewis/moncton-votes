import { Link } from 'react-router-dom';
import { councillors, SCORECARD_CATEGORIES, getTierColors } from '../data/councillors.js';

// Sorted alphabetically by first name
const alphabetical = [...councillors].sort((a, b) => a.name.localeCompare(b.name));

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
          <h1>2021–2026 Council Performance Scorecards</h1>
          <p>Independent performance scorecards for every member of Moncton City Council.</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)' }}>

        {/* ── Summary table ── */}
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-5)' }}>
            All 2021–2026 Councillors
          </h2>
          <div className="table-wrapper" style={{ padding: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Councillor</th>
                  <th>Score</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {alphabetical.map((c) => {
                  const tier = getTierColors(c.score);
                  return (
                    <tr key={c.id} style={{ background: tier.bg }}>
                      <td style={{ boxShadow: `inset 5px 0 0 ${tier.bar}`, paddingLeft: '1.25rem' }}>
                        <Link
                          to={`/scorecards/${c.slug}`}
                          style={{ fontWeight: 600, color: '#1E2D3D', display: 'block', fontSize: '0.925rem', textDecoration: 'none' }}
                        >
                          {c.name}
                        </Link>
                        <div style={{ fontSize: '0.775rem', color: '#5A6375', marginTop: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span>{c.role}{c.ward && c.ward !== 'City-wide' ? ` — ${c.ward}` : ''}</span>
                          <ReOfferingBadge reOffering={c.reOffering} />
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: tier.text, letterSpacing: '-0.01em' }}>
                          {c.score}
                          <small style={{ fontSize: '0.7em', opacity: 0.6 }}>/100</small>
                        </span>
                      </td>
                      <td>
                        <DescriptorBadge descriptor={c.descriptor} bar={tier.bar} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Scorecard grid ── */}
        <section>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
            Individual Scorecards
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
            Click any card to view the full assessment, category breakdown, and supporting details.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {alphabetical.map((c) => {
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
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12), 0 0 0 1px #E2DDD8'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px #E2DDD8'}
                  >
                    {/* Coloured band */}
                    <div style={{ background: tier.bg, padding: '1.1rem 1.25rem 1rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: tier.text }}>
                        {c.score}<sup style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.6, verticalAlign: 'super', marginLeft: '0.1rem' }}>/100</sup>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem', paddingTop: '0.15rem' }}>
                        <DescriptorBadge descriptor={c.descriptor} bar={tier.bar} />
                        <span style={{ fontSize: '0.72rem', color: tier.text, opacity: 0.7 }}>
                          {wardLabel ?? c.role}
                        </span>
                      </div>
                    </div>

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
