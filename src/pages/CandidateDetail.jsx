import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { candidates, CANDIDATE_QUESTIONS } from '../data/candidates.js';

const TRUNCATE_AT = 500;

function incumbentLabel(candidate) {
  const seat = candidate.incumbentOf || candidate.ward;
  if (seat === 'City-Wide (Mayoral)') return 'Mayor Incumbent';
  return `${seat} Incumbent`;
}

const PhoneIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" focusable="false">
    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 16.352V17.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" focusable="false">
    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" focusable="false">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
  </svg>
);

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function AnswerBlock({ answer }) {
  const [expanded, setExpanded] = useState(false);

  if (!answer) {
    return (
      <p style={{ fontStyle: 'italic', color: 'var(--colour-grey-400)', fontSize: 'var(--text-sm)' }}>
        No answer provided.
      </p>
    );
  }

  const needsTruncation = answer.length > TRUNCATE_AT;
  const displayText = needsTruncation && !expanded ? answer.slice(0, TRUNCATE_AT) : answer;

  return (
    <div>
      <p style={{ fontSize: 'var(--text-base)', color: '#444', lineHeight: 1.8, margin: 0 }}>
        {displayText}{needsTruncation && !expanded && '…'}
      </p>
      {needsTruncation && (
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            background: 'none',
            border: 'none',
            padding: '0',
            marginTop: 'var(--space-2)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--colour-primary-600)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
          }}
          aria-expanded={expanded}
        >
          {expanded ? 'Read less ↑' : 'Read more ↓'}
        </button>
      )}
    </div>
  );
}

export default function CandidateDetail() {
  const { id } = useParams();
  const allCandidates = Object.values(candidates).flat();
  const candidate = allCandidates.find((c) => c.id === id);

  if (!candidate) {
    return (
      <div style={{ padding: 'var(--space-16) var(--space-4)', textAlign: 'center' }}>
        <h1 style={{ marginBottom: 'var(--space-4)' }}>Candidate Not Found</h1>
        <p style={{ color: 'var(--colour-grey-600)', marginBottom: 'var(--space-6)' }}>
          No candidate profile matches "<strong>{id}</strong>".
        </p>
        <Link to="/candidates" className="btn btn-primary">← Back to Candidates</Link>
      </div>
    );
  }

  const initials = getInitials(candidate.name);
  const hasContact = candidate.phone || candidate.email || candidate.facebook || candidate.website;

  return (
    <>
      {/* ── Page Header ── */}
      <div className="page-header" style={{ paddingBottom: 'var(--space-10)' }}>
        <div className="container">
          <Link
            to="/candidates"
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 'var(--text-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              marginBottom: 'var(--space-6)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ← Back to Candidates
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
            {/* Avatar */}
            {candidate.photo ? (
              <img
                src={candidate.photo}
                alt={candidate.name}
                width="96"
                height="96"
                style={{ width: '96px', height: '96px', borderRadius: 'var(--radius-full)', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', flexShrink: 0 }}
              />
            ) : (
              <div
                aria-hidden="true"
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255,255,255,0.15)',
                  border: '3px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  color: '#fff',
                  flexShrink: 0,
                  fontFamily: "'Fraunces Variable', Georgia, serif",
                }}
              >
                {initials}
              </div>
            )}

            {/* Name + badges */}
            <div>
              <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)', color: '#fff' }}>
                {candidate.name}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center' }}>
                <span className="badge badge-blue">{candidate.ward}</span>
                {candidate.incumbent && (
                  <span className="badge badge-grey">{incumbentLabel(candidate)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-16)' }}>
        <div style={{ maxWidth: '800px' }}>

          {/* Contact card */}
          {hasContact && (
            <section className="card" style={{ marginBottom: 'var(--space-8)' }} aria-label={`Contact ${candidate.name}`}>
              <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', color: '#1E2D3D' }}>
                Contact
              </h2>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {candidate.phone && (
                  <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{ color: 'var(--colour-grey-400)', flexShrink: 0 }}><PhoneIcon /></span>
                    <a href={`tel:${candidate.phone}`} style={{ fontSize: 'var(--text-sm)', color: 'var(--colour-primary-600)' }}>
                      {candidate.phone}
                    </a>
                  </li>
                )}
                {candidate.email && (
                  <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{ color: 'var(--colour-grey-400)', flexShrink: 0 }}><EmailIcon /></span>
                    <a href={`mailto:${candidate.email}`} style={{ fontSize: 'var(--text-sm)', color: 'var(--colour-primary-600)', wordBreak: 'break-all' }}>
                      {candidate.email}
                    </a>
                  </li>
                )}
                {candidate.website && (
                  <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{ color: 'var(--colour-grey-400)', flexShrink: 0 }}><GlobeIcon /></span>
                    <a href={candidate.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: 'var(--text-sm)', color: 'var(--colour-primary-600)' }}>
                      {candidate.website.replace(/^https?:\/\//, '')}
                    </a>
                  </li>
                )}
                {candidate.facebook && (
                  <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{ color: 'var(--colour-grey-400)', flexShrink: 0 }}><FacebookIcon /></span>
                    <a href={candidate.facebook} target="_blank" rel="noopener noreferrer" style={{ fontSize: 'var(--text-sm)', color: 'var(--colour-primary-600)' }}>
                      Facebook
                    </a>
                  </li>
                )}
              </ul>
            </section>
          )}

          {/* Q&A */}
          {candidate.qa && candidate.qa.length > 0 && (
            <section aria-label="Candidate Q&A">
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)', color: '#1E2D3D' }}>
                Candidate Q&amp;A
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {CANDIDATE_QUESTIONS.map((question, i) => {
                  const qa = candidate.qa[i];
                  return (
                    <div key={i} className="card" style={{ padding: 'var(--space-6)' }}>
                      <p style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--colour-grey-500)',
                        marginBottom: 'var(--space-2)',
                      }}>
                        Q{i + 1}
                      </p>
                      <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: '#1E2D3D', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
                        {question}
                      </p>
                      <AnswerBlock answer={qa?.answer ?? null} />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* No Q&A yet */}
          {(!candidate.qa || candidate.qa.length === 0) && (
            <div className="notice">
              <p>This candidate has not yet provided answers to our questionnaire.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
