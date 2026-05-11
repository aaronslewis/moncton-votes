import { useState, useEffect, useCallback, useRef } from 'react';
import { candidates as allCandidates } from '../data/candidates.js';

// Polls close 8 PM Atlantic Daylight Time (UTC-3) = 23:00 UTC
const POLLS_CLOSE = new Date('2026-05-11T23:00:00Z');
const POLL_INTERVAL_MS = 4 * 60 * 1000;

// Ward labels are derived from areaName or contestName at render time

// ── Dev-mode mock data ─────────────────────────────────────────────────────
// Mirrors the Elections NB data shape so the UI is fully previewable locally.

function buildMockData() {
  const makeChoice = (c, i) => ({
    id: c.id,
    choiceName: c.name,
    votes: 0,
    percentage: 0,
    isIncumbent: c.incumbent ?? false,
    isWinner: false,
    isDisabled: false,
  });
  const makeContest = (contestName, voteFor, choices) => ({
    id: contestName,
    contestName,
    voteFor,
    isAcclaimed: false,
    choiceResults: choices,
  });
  const makeStats = (polls) => ({
    eligibleVoters: 75000,
    turnout: 0,
    ballotCast: 0,
    tabulators: polls,
    closedTabulators: 0,
    startedPolls: 0,
    polls,
    closedPolls: 0,
  });
  const makeArea = (contestResults, polls) => ({
    statistics: makeStats(polls),
    contestResults,
  });

  return {
    timestamp: new Date().toISOString(),
    moncton: makeArea([
      makeContest('Mayor/Maire', 1, allCandidates.mayor.map(makeChoice)),
      makeContest('Councillor at Large/Conseiller(ère) de ville', 2, allCandidates.atLarge.map(makeChoice)),
    ], 45),
    wards: {
      'w1': { ...makeArea([makeContest('Ward 1 Councillor/Conseiller(ère)', 2, allCandidates.ward1.map(makeChoice))], 12), areaName: 'Moncton Ward 1' },
      'w2': { ...makeArea([makeContest('Ward 2 Councillor/Conseiller(ère)', 2, allCandidates.ward2.map(makeChoice))], 11), areaName: 'Moncton Ward 2' },
      'w3': { ...makeArea([makeContest('Ward 3 Councillor/Conseiller(ère)', 2, allCandidates.ward3.map(makeChoice))], 11), areaName: 'Moncton Ward 3' },
      'w4': { ...makeArea([makeContest('Ward 4 Councillor/Conseiller(ère)', 2, allCandidates.ward4.map(makeChoice))], 11), areaName: 'Moncton Ward 4' },
    },
  };
}

const DEV_MOCK = import.meta.env.DEV ? buildMockData() : null;

// ── Name matching ──────────────────────────────────────────────────────────

function normalizeStr(s) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics  (Léger → Leger)
    .replace(/[^a-z\s]/gi, '')       // strip punctuation (F.P. → filtered)
    .toLowerCase()
    .trim();
}

function extractFirstLast(name) {
  const parts = normalizeStr(name)
    .split(/\s+/)
    .filter((p) => p.length > 1); // drop single-letter middle initials
  if (parts.length === 0) return null;
  if (parts.length === 1) return { first: parts[0], last: parts[0] };
  return { first: parts[0], last: parts[parts.length - 1] };
}

function buildCandidateMap() {
  const map = new Map();
  for (const c of Object.values(allCandidates).flat()) {
    const fl = extractFirstLast(c.name);
    if (fl) map.set(`${fl.first} ${fl.last}`, c);
  }
  return map;
}

const CANDIDATE_MAP = buildCandidateMap();

function lookupCandidate(electionNBName) {
  if (!electionNBName) return null;
  // Handle possible "Last, First" format from Elections NB
  const name = electionNBName.includes(',')
    ? electionNBName.split(',').reverse().join(' ').trim()
    : electionNBName;
  const fl = extractFirstLast(name);
  if (!fl) return null;
  return CANDIDATE_MAP.get(`${fl.first} ${fl.last}`) ?? null;
}

// ── Projection logic ───────────────────────────────────────────────────────
//
// Status ladder (matches how major Canadian outlets call races):
//   'elected'   — isWinner from Elections NB (official call)
//   'projected' — ≥ 40 % polls in AND margin > 30 % of estimated remaining votes
//   'leading'   — currently ahead, not yet projectable
//   null        — not in a winning position

function computeStatus({ choice, sortedRows, voteFor, stats, isAcclaimed }) {
  if (isAcclaimed || choice.isWinner) return 'elected';

  const totalVotes = sortedRows.reduce((s, r) => s + r.votes, 0);
  if (totalVotes === 0) return null;

  const rank = sortedRows.findIndex((r) => r.id === choice.id);
  if (rank < 0 || rank >= voteFor) return null;

  const { polls = 0, closedPolls = 0 } = stats ?? {};
  const pollsFraction = polls > 0 ? closedPolls / polls : 0;

  if (pollsFraction < 0.40) return 'leading';

  // Compare against the first candidate outside the winning positions
  const firstLoserVotes = sortedRows[voteFor]?.votes ?? 0;
  const margin = choice.votes - firstLoserVotes;
  // Estimated uncounted votes (uniform-turnout assumption)
  const votesRemaining = totalVotes * (1 / pollsFraction - 1);
  // A 30-point swing: challenger gets 30 % more of remaining than their current share
  const maxSwing = votesRemaining * 0.30;

  return margin > maxSwing ? 'projected' : 'leading';
}

// ── Helpers ────────────────────────────────────────────────────────────────

function isPollsClosed() { return Date.now() >= POLLS_CLOSE.getTime(); }

// Show tables as soon as contest/candidate structure exists (even with 0 votes)
function hasContent(areaData) {
  return (areaData?.contestResults ?? []).some((c) => (c.choiceResults ?? []).length > 0);
}

function pad(n) { return String(n).padStart(2, '0'); }

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ── Countdown ─────────────────────────────────────────────────────────────

function Countdown({ target }) {
  const [ms, setMs] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => {
    setMs(Math.max(0, target - Date.now()));
    const id = setInterval(() => setMs(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);
  if (ms === 0) return null;
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {h > 0 ? `${h}h ` : ''}{m}m {pad(s)}s
    </span>
  );
}

// ── Status display ─────────────────────────────────────────────────────────

const STATUS_META = {
  elected:   { icon: '✓', label: 'Elected',   color: 'var(--grade-a)' },
  projected: { icon: '◆', label: 'Projected',  color: 'var(--colour-primary-600)' },
  leading:   { icon: '▲', label: 'Leading',    color: 'var(--colour-grey-400)' },
};

// ── Avatar ─────────────────────────────────────────────────────────────────

function Avatar({ candidate, choiceName }) {
  const SIZE = 32;
  if (candidate?.photo) {
    return (
      <img
        src={candidate.photo}
        alt=""
        loading="lazy"
        decoding="async"
        width={SIZE}
        height={SIZE}
        style={{
          width: SIZE, height: SIZE,
          borderRadius: 'var(--radius-full)',
          objectFit: 'cover',
          flexShrink: 0,
          border: '1px solid var(--colour-grey-200)',
        }}
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      style={{
        width: SIZE, height: SIZE,
        borderRadius: 'var(--radius-full)',
        background: 'var(--colour-grey-200)',
        color: 'var(--colour-grey-600)',
        fontSize: '0.65rem',
        fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        letterSpacing: '-0.01em',
      }}
    >
      {getInitials(choiceName)}
    </div>
  );
}

// ── Contest table ──────────────────────────────────────────────────────────

function ContestTable({ contest, stats }) {
  const { contestName, voteFor = 1, isAcclaimed, choiceResults = [] } = contest;

  const sortedRows = [...choiceResults]
    .filter((c) => !c.isDisabled)
    .sort((a, b) => b.votes - a.votes);

  const totalVotes = sortedRows.reduce((s, r) => s + r.votes, 0);
  const anyVotes   = totalVotes > 0;

  return (
    <div style={{ marginBottom: 'var(--space-6)' }}>
      {/* Contest label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
        <h3 style={{
          margin: 0,
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          color: 'var(--colour-grey-500)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          {contestName}
        </h3>
        {isAcclaimed && <span className="badge badge-blue">Acclaimed</span>}
        {!isAcclaimed && voteFor > 1 && <span className="badge badge-grey">Top {voteFor} elected</span>}
      </div>

      {/* Candidate rows */}
      {sortedRows.map((choice, i) => {
        const status    = computeStatus({ choice, sortedRows, voteFor, stats, isAcclaimed });
        const meta      = status ? STATUS_META[status] : null;
        const highlight = status === 'elected' || status === 'projected';
        const pct       = anyVotes ? ((choice.votes / totalVotes) * 100).toFixed(1) : null;
        const candidate = lookupCandidate(choice.choiceName);

        return (
          <div
            key={choice.id ?? i}
            style={{
              display: 'grid',
              gridTemplateColumns: '32px 1fr 3.5rem 3.5rem',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-2) var(--space-3)',
              borderBottom: '1px solid var(--colour-grey-100)',
              background: highlight ? 'var(--colour-primary-50)' : 'transparent',
            }}
          >
            {/* Avatar */}
            <Avatar candidate={candidate} choiceName={choice.choiceName} />

            {/* Name + badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: 0 }}>
              {meta
                ? <span title={meta.label} style={{ color: meta.color, fontWeight: 700, fontSize: 'var(--text-sm)', flexShrink: 0 }}>{meta.icon}</span>
                : <span style={{ display: 'inline-block', width: '1em', flexShrink: 0 }} />
              }
              <span style={{
                fontWeight: highlight ? 600 : 400,
                fontSize: 'var(--text-sm)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {choice.choiceName}
              </span>
              {choice.isIncumbent && (
                <span className="badge badge-grey" style={{ fontSize: '0.6rem', padding: '1px 4px', flexShrink: 0 }}>Inc.</span>
              )}
              {status === 'projected' && (
                <span className="badge badge-blue" style={{ fontSize: '0.6rem', padding: '1px 4px', flexShrink: 0 }}>Projected</span>
              )}
              {status === 'elected' && !isAcclaimed && (
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--grade-a)', flexShrink: 0 }}>Elected</span>
              )}
              {isAcclaimed && i === 0 && (
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--grade-a)', flexShrink: 0 }}>Acclaimed</span>
              )}
            </div>

            {/* Votes */}
            <span style={{
              fontVariantNumeric: 'tabular-nums',
              fontWeight: highlight ? 600 : 400,
              fontSize: 'var(--text-sm)',
              whiteSpace: 'nowrap',
              textAlign: 'right',
            }}>
              {isAcclaimed ? '—' : choice.votes.toLocaleString('en-CA')}
            </span>

            {/* % */}
            <span style={{
              fontVariantNumeric: 'tabular-nums',
              fontSize: 'var(--text-sm)',
              color: 'var(--colour-grey-500)',
              whiteSpace: 'nowrap',
              textAlign: 'right',
            }}>
              {isAcclaimed || !anyVotes ? '—' : `${pct}%`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Area card ──────────────────────────────────────────────────────────────

function AreaCard({ title, areaData, contestFilter }) {
  if (!areaData) return null;
  const { statistics, contestResults = [] } = areaData;
  const filtered = contestFilter ? contestResults.filter(contestFilter) : contestResults;
  if (filtered.length === 0) return null;

  const { polls = 0, closedPolls = 0 } = statistics ?? {};
  const reportingPct = polls > 0 ? Math.round((closedPolls / polls) * 100) : 0;

  return (
    <section className="card" style={{ marginBottom: 'var(--space-6)', padding: 0, overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: 'var(--space-4) var(--space-5)',
        borderBottom: '1px solid var(--colour-grey-200)',
      }}>
        <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 700 }}>{title}</h2>
        {polls > 0 && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--colour-grey-500)', whiteSpace: 'nowrap', marginLeft: 'var(--space-3)' }}>
            {closedPolls}/{polls} polls ({reportingPct}%)
          </span>
        )}
      </div>
      <div style={{ padding: 'var(--space-4) var(--space-5)' }}>
        {filtered.map((c, i) => (
          <ContestTable key={c.id ?? i} contest={c} stats={statistics} />
        ))}
      </div>
    </section>
  );
}

// ── Contest filters ────────────────────────────────────────────────────────

const isMayor   = (c) => /mayor|maire/i.test(c.contestName);
const isAtLarge = (c) => /at.large|de ville/i.test(c.contestName);

// ── Page ───────────────────────────────────────────────────────────────────

export default function Results() {
  const [results,     setResults]     = useState(DEV_MOCK); // pre-fill in dev
  const [lastUpdated, setLastUpdated] = useState(DEV_MOCK ? new Date() : null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [nextPoll,    setNextPoll]    = useState(DEV_MOCK ? new Date(Date.now() + POLL_INTERVAL_MS) : null);
  const [pollsClosed, setPollsClosed] = useState(() => DEV_MOCK ? true : isPollsClosed());
  const intervalRef = useRef(null);

  const fetchResults = useCallback(async () => {
    if (DEV_MOCK) return; // dev: keep mock data, skip real fetch
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/.netlify/functions/elections-results');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setResults(json);
      setLastUpdated(new Date());
      setNextPoll(new Date(Date.now() + POLL_INTERVAL_MS));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (DEV_MOCK) return; // dev: no polling needed

    if (isPollsClosed()) {
      fetchResults();
      intervalRef.current = setInterval(fetchResults, POLL_INTERVAL_MS);
      return () => clearInterval(intervalRef.current);
    }

    const delay = POLLS_CLOSE.getTime() - Date.now();
    const timeoutId = setTimeout(() => {
      setPollsClosed(true);
      fetchResults();
      intervalRef.current = setInterval(fetchResults, POLL_INTERVAL_MS);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalRef.current);
    };
  }, [fetchResults]);

  const moncton    = results?.moncton;
  const wards      = results?.wards ?? {};
  const showTables = hasContent(moncton);

  const adtTime = (d) =>
    d.toLocaleTimeString('en-CA', {
      timeZone: 'America/Moncton',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>2026 Election — Live Results</h1>
          <p>Moncton municipal election, May 11, 2026. Unofficial results from Elections NB.</p>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>

        {!pollsClosed && (
          <div className="notice notice-info" style={{ marginBottom: 'var(--space-6)' }}>
            <p>
              <strong>Polls are open until 8:00 PM ADT.</strong>{' '}
              Results will load automatically — <Countdown target={POLLS_CLOSE.getTime()} /> remaining.
            </p>
          </div>
        )}

        {pollsClosed && loading && !results && (
          <div className="notice notice-info" style={{ marginBottom: 'var(--space-6)' }}>
            <p>Loading results from Elections NB…</p>
          </div>
        )}

        {error && (
          <div className="notice" style={{ marginBottom: 'var(--space-6)' }}>
            <p>
              Could not load results: {error}.{' '}
              <button
                className="btn btn-ghost"
                style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-2)' }}
                onClick={fetchResults}
              >
                Retry
              </button>
            </p>
          </div>
        )}

        {pollsClosed && results && !showTables && (
          <div className="notice notice-info" style={{ marginBottom: 'var(--space-6)' }}>
            <p>No results available yet from Elections NB. Checking every 4 minutes.</p>
          </div>
        )}

        {lastUpdated && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 'var(--text-xs)',
            color: 'var(--colour-grey-500)',
            marginBottom: 'var(--space-6)',
          }}>
            <span>
              {DEV_MOCK ? 'Dev preview — mock data (all zeros)' : `Updated ${adtTime(lastUpdated)} ADT`}
            </span>
            <span>
              {!DEV_MOCK && (loading
                ? 'Refreshing…'
                : nextPoll && <><Countdown target={nextPoll.getTime()} /> until next check</>
              )}
            </span>
          </div>
        )}

        {showTables && (
          <>
            <AreaCard title="Mayor"               areaData={moncton} contestFilter={isMayor} />
            <AreaCard title="Councillor At-Large" areaData={moncton} contestFilter={isAtLarge} />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-6)',
            }}>
              {Object.entries(wards).map(([id, wardData]) => {
                const title = wardData?.areaName ?? id;
                return <AreaCard key={id} title={title} areaData={wardData} />;
              })}
            </div>
          </>
        )}

        <div style={{
          marginTop: 'var(--space-8)',
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid var(--colour-grey-200)',
          fontSize: 'var(--text-sm)',
          color: 'var(--colour-grey-500)',
        }}>
          <p>
            ▲ Leading &nbsp;·&nbsp;
            ◆ Projected (lead exceeds a 30-point swing in remaining ballots) &nbsp;·&nbsp;
            ✓ Elected (official Elections NB call) &nbsp;·&nbsp;
            Results refresh every 4 minutes &nbsp;·&nbsp;{' '}
            <a
              href="https://www3.gnb.ca/elections/results-resultats/2026-05-11/MUN/MUN.html#at/cd88ce35-4e2a-43d0-81f3-bfbe27ac2664/ar/1064/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Elections NB results →
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
