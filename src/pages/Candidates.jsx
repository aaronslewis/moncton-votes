import { useState } from 'react';
import { candidates, WARDS } from '../data/candidates.js';

/* ── Contact icons (aria-hidden SVGs, labels on the parent <a>) ─────── */
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

/** Get initials from a candidate name string */
function getInitials(name) {
  const clean = name.replace(/\[|\]/g, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** A single candidate card */
function CandidateCard({ candidate }) {
  const initials = getInitials(candidate.name);

  return (
    <div className="card candidate-card">
      <div className="candidate-card-header">
        {/* Avatar: photo if available, otherwise initials */}
        {candidate.photo ? (
          <img
            src={candidate.photo}
            alt={candidate.name}
            loading="lazy"
            decoding="async"
            width="84"
            height="84"
            style={{ width: '84px', height: '84px', borderRadius: 'var(--radius-full)', objectFit: 'cover', flexShrink: 0 }}
          />
        ) : (
          <div
            className="avatar-placeholder"
            style={{ width: '84px', height: '84px', fontSize: 'var(--text-xl)', flexShrink: 0 }}
            aria-hidden="true"
          >
            {initials}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: 'var(--text-base)',
            fontWeight: 700,
            marginBottom: 'var(--space-1)',
            color: 'var(--colour-grey-900)',
          }}>
            {candidate.name}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', alignItems: 'center' }}>
            <span className="badge badge-blue" style={{ fontSize: 'var(--text-xs)' }}>
              {candidate.ward}
            </span>
            {candidate.incumbent && (
              <span className="badge badge-grey" style={{ fontSize: 'var(--text-xs)' }}>
                Incumbent
              </span>
            )}
          </div>
          {candidate.website && (
            <a
              href={candidate.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--colour-primary-600)', marginTop: 'var(--space-1)', display: 'inline-block' }}
            >
              Campaign site →
            </a>
          )}
        </div>
      </div>

      {/* Bio */}
      {candidate.bio && (
        <p className="candidate-card-body">{candidate.bio}</p>
      )}

      {/* Platform points */}
      {candidate.platform && candidate.platform.length > 0 && (
        <div>
          <p style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--colour-grey-500)',
            marginBottom: 'var(--space-2)',
          }}>
            Key Platform Points
          </p>
          <ul className="candidate-platform">
            {candidate.platform.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contact icons */}
      {(candidate.phone || candidate.email || candidate.facebook) && (
        <ul className="candidate-contact" aria-label={`Contact ${candidate.name}`}>
          {candidate.phone && (
            <li>
              <a
                href={`tel:${candidate.phone}`}
                className="contact-icon-link"
                aria-label={`Call ${candidate.name} at ${candidate.phone}`}
              >
                <PhoneIcon />
                <span className="sr-only">{candidate.phone}</span>
              </a>
            </li>
          )}
          {candidate.email && (
            <li>
              <a
                href={`mailto:${candidate.email}`}
                className="contact-icon-link"
                aria-label={`Email ${candidate.name}`}
              >
                <EmailIcon />
                <span className="sr-only">{candidate.email}</span>
              </a>
            </li>
          )}
          {candidate.facebook && (
            <li>
              <a
                href={candidate.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon-link"
                aria-label={`${candidate.name} on Facebook (opens in new tab)`}
              >
                <FacebookIcon />
                <span className="sr-only">Facebook</span>
              </a>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

/** A section of candidates with a heading */
function CandidateSection({ title, candidateList, id }) {
  if (!candidateList || candidateList.length === 0) return null;
  return (
    <section aria-labelledby={id} style={{ marginBottom: 'var(--space-10)' }}>
      <div className="section-heading">
        <h2 id={id} style={{ fontSize: 'var(--text-2xl)' }}>{title}</h2>
        <div className="section-divider" aria-hidden="true" />
        <span className="badge badge-grey">{candidateList.length} candidate{candidateList.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="grid-2">
        {candidateList.map((c) => (
          <CandidateCard key={c.id} candidate={c} />
        ))}
      </div>
    </section>
  );
}

export default function Candidates() {
  const [selectedWard, setSelectedWard] = useState('');

  const wardCandidates = selectedWard ? candidates[selectedWard] : [];
  const wardLabel = selectedWard ? WARDS.find((w) => w.value === selectedWard)?.label : '';

  return (
    <>
      {/* ── Page Header ───────────────────────────────────────── */}
      <header className="page-header">
        <div className="container">
          <h1>2026 Election — Candidates</h1>
          <p>
            Find who's running for Mayor, At-Large, and your ward seat in the May 11, 2026
            Moncton municipal election.
          </p>
        </div>
      </header>

      <div className="container">
        {/* ── Voting breakdown notice ──────────────────────────── */}
        <div
          className="notice notice-info"
          style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}
        >
          <p>
            <strong>On election day you will vote for:</strong> 1 Mayor &nbsp;·&nbsp;
            2 At-Large Councillors &nbsp;·&nbsp; 2 Ward Councillors (for your ward).
            {' '}
            <a
              href="https://www.moncton.ca/en/municipal-elections-2026"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source: City of Moncton →
            </a>
          </p>
        </div>

        {/* ── Ward Filter ──────────────────────────────────────── */}
        <section
          className="card"
          style={{ marginTop: 'var(--space-10)', marginBottom: 'var(--space-10)' }}
          aria-label="Filter candidates by ward"
        >
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
            Filter by Ward
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--colour-grey-600)', marginBottom: 'var(--space-4)' }}>
            Mayoral and At-Large candidates appear on every ballot. Select your ward to also see your ward candidates.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 240px', maxWidth: '360px' }}>
              <label htmlFor="ward-select" className="sr-only">Select your ward</label>
              <select
                id="ward-select"
                className="form-select"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
              >
                <option value="">All wards</option>
                {WARDS.map((ward) => (
                  <option key={ward.value} value={ward.value}>
                    {ward.label}
                  </option>
                ))}
              </select>
            </div>
            {selectedWard && (
              <button
                onClick={() => setSelectedWard('')}
                className="btn btn-ghost"
                style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-2)', flexShrink: 0 }}
              >
                Clear ×
              </button>
            )}
          </div>

          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--colour-grey-500)', marginTop: 'var(--space-4)' }}>
            Don't know your ward?{' '}
            <a
              href="https://www7.moncton.ca/myzone/wardsearch?lang=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find it on the City of Moncton website →
            </a>
          </p>
        </section>

        {/* ── Mayoral Candidates ──────────────────────────────── */}
        <CandidateSection
          id="mayoral-heading"
          title="Mayoral Candidates"
          candidateList={candidates.mayor}
        />

        {/* ── At-Large Candidates ─────────────────────────────── */}
        <CandidateSection
          id="atlarge-heading"
          title="At-Large Candidates"
          candidateList={candidates.atLarge}
        />

        {/* ── Ward Candidates (conditional) ───────────────────── */}
        {selectedWard && wardCandidates && wardCandidates.length > 0 && (
          <CandidateSection
            id="ward-heading"
            title={`${wardLabel} Candidates`}
            candidateList={wardCandidates}
          />
        )}

        {selectedWard && (!wardCandidates || wardCandidates.length === 0) && (
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
              {wardLabel} Candidates
            </h2>
            <div className="notice">
              <p>No candidates have been confirmed for {wardLabel} yet. Check back as nominations are filed.</p>
            </div>
          </section>
        )}

        {/* ── All Ward Candidates (no ward selected) ──────────── */}
        {!selectedWard && (
          <section style={{ marginBottom: 'var(--space-16)' }} aria-label="All ward candidates">
            <div style={{ marginTop: 'var(--space-8)' }}>
              {WARDS.map((ward) => (
                <div key={ward.value} style={{ marginBottom: 'var(--space-8)' }}>
                  <div className="section-heading">
                    <h3 style={{ fontSize: 'var(--text-xl)' }}>
                      {ward.label}
                    </h3>
                    <div className="section-divider" aria-hidden="true" />
                  </div>
                  <div className="grid-2">
                    {(candidates[ward.value] || []).map((c) => (
                      <CandidateCard key={c.id} candidate={c} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedWard && (
          <div style={{ paddingBottom: 'var(--space-8)' }} />
        )}

        {/* ── Official source link ─────────────────────────────── */}
        <div style={{
          paddingBottom: 'var(--space-16)',
          borderTop: '1px solid var(--colour-grey-200)',
          paddingTop: 'var(--space-6)',
          fontSize: 'var(--text-sm)',
          color: 'var(--colour-grey-500)',
        }}>
          <p>
            Official candidate list:{' '}
            <a
              href="https://www1.gnb.ca/Elections/en/mun26may11/26may11generalmuncandidatelist-e.asp?ELECTIONTOWNID=120TOWNID22958"
              target="_blank"
              rel="noopener noreferrer"
            >
              Elections New Brunswick →
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
