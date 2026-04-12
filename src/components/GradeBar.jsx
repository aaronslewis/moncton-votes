import { useState } from 'react';

/**
 * GradeBar — one row in a councillor's scorecard.
 *
 * Props:
 *   category  {string}   Display label for the category
 *   letter    {string}   Letter grade (A+, B-, C, …)
 *   score     {number}   Score out of 100
 *   notes     {string}   Multi-paragraph assessment text
 *   note      {string|null}  Optional revision notice (e.g. "UPDATED: …")
 */

function gradeColors(letter, score) {
  if (!letter || letter === '—') return { bar: '#D1D5DB', text: '#6B7280', bg: '#F3F4F6' };
  if (score >= 80) return { bar: '#059669', text: '#065F46', bg: '#D1FAE5' };
  if (score >= 70) return { bar: '#2563EB', text: '#1E40AF', bg: '#DBEAFE' };
  if (score >= 60) return { bar: '#D97706', text: '#92400E', bg: '#FEF3C7' };
  return { bar: '#DC2626', text: '#991B1B', bg: '#FEE2E2' };
}

export default function GradeBar({ category, letter, score, notes, note }) {
  const [expanded, setExpanded] = useState(false);
  const colors  = gradeColors(letter, score);
  const hasData = letter && letter !== '—';
  const barWidth = hasData ? `${Math.min(score, 100)}%` : '0%';

  return (
    <div style={{
      borderBottom:  '1px solid var(--border)',
      paddingBottom: 'var(--space-4)',
      marginBottom:  'var(--space-4)',
    }}>
      {/* ── Header row ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        {/* Letter grade — filled circle */}
        <span style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          '2.5rem',
          height:         '2.5rem',
          borderRadius:   '50%',
          background:     hasData ? colors.bg : '#F3F4F6',
          fontSize:       'var(--text-sm)',
          fontWeight:     800,
          color:          hasData ? colors.text : '#9CA3AF',
          flexShrink:     0,
        }}>
          {letter || '—'}
        </span>

        {/* Category name + score */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-2)' }}>
            <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: '#1E2D3D' }}>
              {category}
            </span>
            {hasData && (
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {score}/100
              </span>
            )}
          </div>

          {/* Visual bar */}
          <div style={{
            marginTop:    'var(--space-1)',
            height:       '6px',
            borderRadius: '9999px',
            background:   'var(--colour-grey-100)',
            overflow:     'hidden',
          }}>
            <div style={{
              height:     '100%',
              width:      barWidth,
              borderRadius: '9999px',
              background:   colors.bar,
              transition:   'width 0.4s ease',
            }} />
          </div>
        </div>

        {/* Toggle button */}
        {hasData && notes && (
          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              background:   'none',
              border:       '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding:      '2px 8px',
              fontSize:     'var(--text-xs)',
              color:        'var(--text-muted)',
              cursor:       'pointer',
              whiteSpace:   'nowrap',
              flexShrink:   0,
            }}
            aria-expanded={expanded}
          >
            {expanded ? 'Hide ▲' : 'Read ▼'}
          </button>
        )}
      </div>

      {/* ── Assessment text ── */}
      {expanded && notes && (
        <div style={{ marginTop: 'var(--space-3)' }}>
          {notes.split('\n\n').map((para, i) => (
            <p key={i} style={{
              fontSize:     'var(--text-sm)',
              color:        '#444',
              lineHeight:   1.75,
              marginBottom: i < notes.split('\n\n').length - 1 ? 'var(--space-3)' : 0,
            }}>
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
