/**
 * GPABadge — displays an overall score (0–100) with its descriptor tier.
 *
 * Props:
 *   score      {number}           0–100 overall score
 *   descriptor {string}           Great / Good / Okay / Poor
 *   size       {'sm'|'md'|'lg'}   optional, defaults to 'md'
 */

function getColor(score) {
  if (score >= 80) return 'var(--grade-a)';
  if (score >= 70) return 'var(--grade-b)';
  if (score >= 60) return 'var(--grade-c)';
  return 'var(--grade-d)';
}

const SIZE = {
  sm: { outer: 52, score: '1rem',   label: '0.6rem', border: 2 },
  md: { outer: 72, score: '1.4rem', label: '0.65rem', border: 3 },
  lg: { outer: 96, score: '2rem',   label: '0.75rem', border: 4 },
};

export default function GPABadge({ score, descriptor, size = 'md' }) {
  const s      = SIZE[size] ?? SIZE.md;
  const colour = getColor(score ?? 0);
  const shown  = score != null && score > 0;

  return (
    <div
      aria-label={shown ? `Score: ${score} — ${descriptor}` : 'Score pending'}
      style={{
        width:        s.outer,
        height:       s.outer,
        borderRadius: '50%',
        border:       `${s.border}px solid ${shown ? colour : 'var(--colour-grey-300)'}`,
        display:      'flex',
        flexDirection:'column',
        alignItems:   'center',
        justifyContent:'center',
        gap:          '1px',
        flexShrink:   0,
        background:   shown ? `${colour}14` : 'var(--colour-grey-50)',
      }}
    >
      <span style={{
        fontSize:   s.score,
        fontWeight: 800,
        lineHeight: 1,
        color:      shown ? colour : 'var(--colour-grey-400)',
      }}>
        {shown ? score : '—'}
      </span>
      {shown && (
        <span style={{
          fontSize:    s.label,
          fontWeight:  600,
          color:       colour,
          textTransform:'uppercase',
          letterSpacing:'0.04em',
          lineHeight:  1,
        }}>
          {descriptor}
        </span>
      )}
    </div>
  );
}
