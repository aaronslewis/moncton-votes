import { useState } from 'react';
import { Link } from 'react-router-dom';
import { candidates, CANDIDATE_QUESTIONS } from '../data/candidates.js';

const RACE_OPTIONS = [
  { value: 'mayor',   label: 'Mayor (City-Wide)' },
  { value: 'atlarge', label: 'At-Large' },
  { value: 'ward1',   label: 'Ward 1' },
  { value: 'ward2',   label: 'Ward 2' },
  { value: 'ward3',   label: 'Ward 3' },
  { value: 'ward4',   label: 'Ward 4' },
];

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_SIZE = 44;
const avatarBase = {
  width: `${AVATAR_SIZE}px`,
  height: `${AVATAR_SIZE}px`,
  minWidth: `${AVATAR_SIZE}px`,
  borderRadius: 'var(--radius-full)',
  flexShrink: 0,
  overflow: 'hidden',
};

function CandidateAvatar({ candidate }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = getInitials(candidate.name);

  if (candidate.photo && !imgFailed) {
    return (
      <div style={avatarBase}>
        <img
          src={candidate.photo}
          alt={candidate.name}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          onError={() => setImgFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        ...avatarBase,
        background: 'var(--colour-primary-100)',
        border: '2px solid var(--colour-primary-200)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'var(--text-sm)',
        fontWeight: 700,
        color: 'var(--colour-primary-700)',
        fontFamily: "'Fraunces Variable', Georgia, serif",
      }}
    >
      {initials}
    </div>
  );
}

function AnswerBlock({ answer }) {
  if (!answer) return null;

  return (
    <p style={{ fontSize: 'var(--text-sm)', color: '#444', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line' }}>
      {answer}
    </p>
  );
}

const selectStyle = {
  padding: 'var(--space-3) var(--space-4)',
  fontSize: 'var(--text-base)',
  border: '1.5px solid var(--colour-grey-300)',
  borderRadius: 'var(--radius-lg)',
  background: '#fff',
  cursor: 'pointer',
  width: '100%',
};

export default function Platforms() {
  const [race, setRace] = useState('');
  const [questionIndex, setQuestionIndex] = useState('');

  const raceCandidates = race ? (candidates[race] ?? []) : [];
  const hasSelections = race !== '' && questionIndex !== '';
  const qIdx = hasSelections ? parseInt(questionIndex, 10) : null;

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>Candidate Platforms</h1>
          <p>Where the candidates stand on the issues that matter most to Moncton.</p>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>

        {/* ── Compare by question ── */}
        <section aria-labelledby="compare-heading" style={{ marginBottom: 'var(--space-16)' }}>
          <h2 id="compare-heading" style={{ fontSize: 'var(--text-xl)', color: '#1E2D3D', marginBottom: 'var(--space-2)' }}>
            Compare responses
          </h2>
          <p style={{ color: 'var(--colour-grey-600)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
            Choose a race and a question to see how each candidate responded side by side.
          </p>

          {/* Selectors */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: '1 1 200px', minWidth: 0 }}>
              <label htmlFor="race-select" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--colour-grey-700)' }}>
                Contest
              </label>
              <select
                id="race-select"
                value={race}
                onChange={(e) => setRace(e.target.value)}
                style={{ ...selectStyle, color: race ? '#1E2D3D' : 'var(--colour-grey-500)' }}
              >
                <option value="">Select a contest…</option>
                {RACE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: '3 1 320px', minWidth: 0 }}>
              <label htmlFor="question-select" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--colour-grey-700)' }}>
                Question
              </label>
              <select
                id="question-select"
                value={questionIndex}
                onChange={(e) => setQuestionIndex(e.target.value)}
                style={{ ...selectStyle, color: questionIndex !== '' ? '#1E2D3D' : 'var(--colour-grey-500)' }}
              >
                <option value="">Select a question…</option>
                {CANDIDATE_QUESTIONS.map((q, i) => (
                  <option key={i} value={i}>
                    Q{i + 1} — {q.length > 72 ? q.slice(0, 72) + '…' : q}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Empty state */}
          {!hasSelections && (
            <div style={{
              padding: 'var(--space-12) var(--space-6)',
              textAlign: 'center',
              background: 'var(--colour-grey-50)',
              borderRadius: 'var(--radius-xl)',
              border: '1px dashed var(--colour-grey-200)',
            }}>
              <p style={{ color: 'var(--colour-grey-400)', fontSize: 'var(--text-sm)', margin: 0 }}>
                Select a race and question above to compare responses.
              </p>
            </div>
          )}

          {/* Results */}
          {hasSelections && (
            <div>
              <div style={{ paddingTop: 'var(--space-8)', marginBottom: 'var(--space-6)' }}>
                <p style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--colour-primary-600)',
                  marginBottom: 'var(--space-2)',
                }}>
                  Q{qIdx + 1}
                </p>
                <p style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  color: '#1E2D3D',
                  lineHeight: 1.3,
                  margin: 0,
                  fontFamily: "'Fraunces Variable', Georgia, serif",
                }}>
                  {CANDIDATE_QUESTIONS[qIdx]}
                </p>
              </div>

              {raceCandidates.length === 0 ? (
                <div className="notice"><p>No candidates found for this contest.</p></div>
              ) : (() => {
                const responded = raceCandidates.filter((c) => c.qa && c.qa[qIdx]?.answer);
                const didNotRespond = raceCandidates.filter((c) => !c.qa || !c.qa[qIdx]?.answer);
                return (
                  <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {responded.map((candidate) => {
                    const answer = candidate.qa?.[qIdx]?.answer ?? null;

                    return (
                      <div key={candidate.id} className="card" style={{ padding: 'var(--space-6)' }}>
                        {/* Candidate header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                          <CandidateAvatar candidate={candidate} />
                          <div>
                            <p style={{ fontWeight: 700, color: '#1E2D3D', fontSize: 'var(--text-base)', margin: 0 }}>
                              {candidate.name}
                            </p>
                            {candidate.incumbent && (
                              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--colour-grey-500)', margin: 0, fontWeight: 500 }}>
                                Incumbent
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Answer */}
                        <AnswerBlock answer={answer} />

                        {/* Link to full profile */}
                        <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--colour-grey-100)' }}>
                          <Link
                            to={`/candidates/${candidate.id}`}
                            style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--colour-primary-600)', textDecoration: 'none' }}
                          >
                            View all responses →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {didNotRespond.length > 0 && (
                  <div style={{ marginTop: 'var(--space-10)' }}>
                    <p style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--colour-grey-400)',
                      marginBottom: 'var(--space-3)',
                    }}>
                      Did not respond
                    </p>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {didNotRespond.map((candidate) => (
                        <li key={candidate.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', background: 'var(--colour-grey-50)', borderRadius: 'var(--radius-lg)', gap: 'var(--space-4)' }}>
                          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--colour-grey-600)' }}>{candidate.name}</span>
                          <Link to={`/candidates/${candidate.id}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--colour-primary-600)', textDecoration: 'none', flexShrink: 0 }}>
                            View profile →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                  </>
                );
              })()}
            </div>
          )}
        </section>


      </div>
    </>
  );
}
