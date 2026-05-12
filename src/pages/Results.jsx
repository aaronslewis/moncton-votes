import { candidates as allCandidates } from '../data/candidates.js';

// ── Name matching ──────────────────────────────────────────────────────────

function normalizeStr(s) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z\s]/gi, '')
    .toLowerCase()
    .trim();
}

function extractFirstLast(name) {
  const parts = normalizeStr(name)
    .split(/\s+/)
    .filter((p) => p.length > 1);
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

function lookupCandidate(name) {
  if (!name) return null;
  const normalized = name.includes(',')
    ? name.split(',').reverse().join(' ').trim()
    : name;
  const fl = extractFirstLast(normalized);
  if (!fl) return null;
  return CANDIDATE_MAP.get(`${fl.first} ${fl.last}`) ?? null;
}

// ── Static final results ───────────────────────────────────────────────────

const RESULTS = {
  moncton: {
    contestResults: [
      {
        id: 'mayor',
        contestName: 'Mayor / Maire',
        voteFor: 1,
        isAcclaimed: false,
        choiceResults: [
          { id: 1, choiceName: 'Shawn Crossman',    votes: 6593, isWinner: 1, isIncumbent: false },
          { id: 2, choiceName: 'Brian F.P. Murphy',  votes: 6299, isWinner: 0, isIncumbent: false },
          { id: 3, choiceName: 'Charles Léger',      votes: 4189, isWinner: 0, isIncumbent: false },
          { id: 4, choiceName: 'Jeffrey McCluskey',  votes:  408, isWinner: 0, isIncumbent: false },
        ],
      },
      {
        id: 'atlarge',
        contestName: 'Councillor at Large / Conseiller(ère) Général(e)',
        voteFor: 2,
        isAcclaimed: false,
        choiceResults: [
          { id: 5,  choiceName: 'Greg Turner',     votes: 7682, isWinner: 1, isIncumbent: false },
          { id: 6,  choiceName: 'Marty Kingston',  votes: 7280, isWinner: 1, isIncumbent: true  },
          { id: 7,  choiceName: 'Ana Larade',      votes: 5796, isWinner: 0, isIncumbent: false },
          { id: 8,  choiceName: 'Bryan MacDonald', votes: 4734, isWinner: 0, isIncumbent: false },
          { id: 9,  choiceName: 'Ali Ettarnichi',  votes: 2429, isWinner: 0, isIncumbent: false },
          { id: 10, choiceName: 'Carl Bainbridge', votes: 1541, isWinner: 0, isIncumbent: false },
        ],
      },
    ],
  },
  wards: {
    w1: {
      areaName: 'Ward 1',
      contestResults: [{
        id: 'ward1', contestName: 'Councillor Ward 1', voteFor: 2, isAcclaimed: false,
        choiceResults: [
          { id: 11, choiceName: 'Mike Gaudet',     votes: 2226, isWinner: 1, isIncumbent: false },
          { id: 12, choiceName: 'Felix LeBlanc',   votes: 2056, isWinner: 1, isIncumbent: false },
          { id: 13, choiceName: 'Brian Branch',    votes: 1340, isWinner: 0, isIncumbent: false },
          { id: 14, choiceName: 'Reem Fayyad',     votes: 1340, isWinner: 0, isIncumbent: false },
          { id: 15, choiceName: 'Roy MacMullin',   votes:  921, isWinner: 0, isIncumbent: false },
          { id: 16, choiceName: 'Alex Le',         votes:  243, isWinner: 0, isIncumbent: false },
        ],
      }],
    },
    w2: {
      areaName: 'Ward 2',
      contestResults: [{
        id: 'ward2', contestName: 'Councillor Ward 2', voteFor: 2, isAcclaimed: false,
        choiceResults: [
          { id: 17, choiceName: 'Marc Léger',          votes: 2150, isWinner: 1, isIncumbent: false },
          { id: 18, choiceName: 'Kristin Cavoukian',   votes: 2119, isWinner: 1, isIncumbent: false },
          { id: 19, choiceName: 'Daniel Bourgeois',    votes: 1606, isWinner: 0, isIncumbent: true  },
          { id: 20, choiceName: 'Todd Hansen',         votes:  762, isWinner: 0, isIncumbent: false },
        ],
      }],
    },
    w3: {
      areaName: 'Ward 3',
      contestResults: [{
        id: 'ward3', contestName: 'Councillor Ward 3', voteFor: 2, isAcclaimed: false,
        choiceResults: [
          { id: 21, choiceName: 'Julianna Mutch',    votes: 3018, isWinner: 1, isIncumbent: false },
          { id: 22, choiceName: 'Bryan Butler',      votes: 2512, isWinner: 1, isIncumbent: true  },
          { id: 23, choiceName: 'Dave Steeves',      votes: 2126, isWinner: 0, isIncumbent: true  },
          { id: 24, choiceName: 'Rodney Arsenault',  votes:  869, isWinner: 0, isIncumbent: false },
        ],
      }],
    },
    w4: {
      areaName: 'Ward 4',
      contestResults: [{
        id: 'ward4', contestName: 'Councillor Ward 4', voteFor: 2, isAcclaimed: false,
        choiceResults: [
          { id: 25, choiceName: 'Paul Richard',   votes: 2526, isWinner: 1, isIncumbent: true  },
          { id: 26, choiceName: 'Kate Doyle',     votes: 2349, isWinner: 1, isIncumbent: false },
          { id: 27, choiceName: 'Kevin Rogers',   votes: 1164, isWinner: 0, isIncumbent: false },
        ],
      }],
    },
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

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

function ContestTable({ contest }) {
  const { contestName, voteFor = 1, isAcclaimed, choiceResults = [] } = contest;

  const sortedRows = [...choiceResults].sort((a, b) => b.votes - a.votes);
  const totalVotes = sortedRows.reduce((s, r) => s + r.votes, 0);

  return (
    <div style={{ marginBottom: 'var(--space-6)' }}>
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

      {sortedRows.map((choice, i) => {
        const elected   = !!choice.isWinner;
        const pct       = totalVotes > 0 ? ((choice.votes / totalVotes) * 100).toFixed(1) : null;
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
              background: elected ? 'var(--colour-primary-50)' : 'transparent',
            }}
          >
            <Avatar candidate={candidate} choiceName={choice.choiceName} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: 0 }}>
              {elected
                ? <span style={{ color: 'var(--grade-a)', fontWeight: 700, fontSize: 'var(--text-sm)', flexShrink: 0 }}>✓</span>
                : <span style={{ display: 'inline-block', width: '1em', flexShrink: 0 }} />
              }
              <span style={{
                fontWeight: elected ? 600 : 400,
                fontSize: 'var(--text-sm)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {choice.choiceName}
              </span>
              {choice.isIncumbent && (
                <span className="badge badge-grey" style={{ fontSize: '0.6rem', padding: '1px 4px', flexShrink: 0 }}>Inc.</span>
              )}
              {elected && (
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--grade-a)', flexShrink: 0 }}>Elected</span>
              )}
            </div>

            <span style={{
              fontVariantNumeric: 'tabular-nums',
              fontWeight: elected ? 600 : 400,
              fontSize: 'var(--text-sm)',
              whiteSpace: 'nowrap',
              textAlign: 'right',
            }}>
              {choice.votes.toLocaleString('en-CA')}
            </span>

            <span style={{
              fontVariantNumeric: 'tabular-nums',
              fontSize: 'var(--text-sm)',
              color: 'var(--colour-grey-500)',
              whiteSpace: 'nowrap',
              textAlign: 'right',
            }}>
              {pct ? `${pct}%` : '—'}
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
  const { contestResults = [] } = areaData;
  const filtered = contestFilter ? contestResults.filter(contestFilter) : contestResults;
  if (filtered.length === 0) return null;

  return (
    <section className="card" style={{ marginBottom: 'var(--space-6)', padding: 0, overflow: 'hidden' }}>
      <div style={{
        padding: 'var(--space-4) var(--space-5)',
        borderBottom: '1px solid var(--colour-grey-200)',
      }}>
        <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 700 }}>{title}</h2>
      </div>
      <div style={{ padding: 'var(--space-4) var(--space-5)' }}>
        {filtered.map((c, i) => (
          <ContestTable key={c.id ?? i} contest={c} />
        ))}
      </div>
    </section>
  );
}

const isMayor   = (c) => /mayor|maire/i.test(c.contestName);
const isAtLarge = (c) => /at.large|général/i.test(c.contestName);

// ── Page ───────────────────────────────────────────────────────────────────

export default function Results() {
  const { moncton, wards } = RESULTS;

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>2026 Election — Final Results</h1>
          <p>Moncton municipal election, May 11, 2026. Official results from Elections NB.</p>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>

        <AreaCard title="Mayor"               areaData={moncton} contestFilter={isMayor} />
        <AreaCard title="Councillor At-Large" areaData={moncton} contestFilter={isAtLarge} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-6)',
        }}>
          {Object.entries(wards).map(([id, wardData]) => (
            <AreaCard key={id} title={wardData.areaName} areaData={wardData} />
          ))}
        </div>

        <div style={{
          marginTop: 'var(--space-8)',
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid var(--colour-grey-200)',
          fontSize: 'var(--text-sm)',
          color: 'var(--colour-grey-500)',
        }}>
          <p>
            ✓ Elected &nbsp;·&nbsp;
            Inc. = Incumbent &nbsp;·&nbsp;{' '}
            <a
              href="https://www3.gnb.ca/elections/results-resultats/2026-05-11/MUN/MUN.html"
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
