/* ============================================================
   Resources — official, non-partisan civic links for Moncton
   ============================================================ */

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* Source badges — two trusted sources */
const SOURCES = {
  moncton: { label: 'City of Moncton', className: 'source-badge source-moncton' },
  elections: { label: 'Elections NB', className: 'source-badge source-elections' },
};

/** A single external-link card */
function ResourceLink({ title, description, url, source }) {
  const src = SOURCES[source];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`card-hover resource-link resource-link--${source}`}
    >
      <div className="resource-link-head">
        <h3>{title}</h3>
        <span className={src.className}>{src.label}</span>
      </div>
      <p>{description}</p>
      <span className="resource-link-cta">
        <ExternalIcon />
        View resource →
      </span>
    </a>
  );
}

/** A titled section of resource cards */
function ResourceSection({ id, title, blurb, links }) {
  return (
    <section aria-labelledby={id} style={{ marginBottom: 'var(--space-12)' }}>
      <div className="section-heading">
        <h2 id={id} style={{ fontSize: 'var(--text-2xl)' }}>{title}</h2>
        <div className="section-divider" aria-hidden="true" />
      </div>
      {blurb && (
        <p style={{
          color: 'var(--colour-grey-600)',
          fontSize: 'var(--text-base)',
          lineHeight: 1.7,
          maxWidth: '760px',
          marginBottom: 'var(--space-6)',
        }}>
          {blurb}
        </p>
      )}
      <div className="grid-2">
        {links.map((l) => (
          <ResourceLink key={l.url} {...l} />
        ))}
      </div>
    </section>
  );
}

/* ── Data ────────────────────────────────────────────────── */

const BASICS_LINKS = [
  {
    title: 'How City Council Works',
    description:
      "An overview of Moncton's council structure — four wards, two councillors per ward, two councillors-at-large, and a Mayor. A good starting point for understanding who represents you and how decisions are made.",
    url: 'https://www.moncton.ca/en/council',
    source: 'moncton',
  },
  {
    title: 'Role of a Councillor (Official PDF)',
    description:
      "The City of Moncton's own document describing what a councillor is responsible for — their duties, obligations, and how they are expected to serve their ward. Useful for understanding what \u201Cgood performance\u201D looks like.",
    url: 'https://www5.moncton.ca/docs/council/Role_of_a_Councillor.pdf',
    source: 'moncton',
  },
  {
    title: 'Municipal Regions',
    description:
      'An interactive map from Elections New Brunswick showing how the province is divided into municipal electoral regions. Helpful for understanding the broader landscape of local governance in New Brunswick.',
    url: 'https://www.electionsnb.ca/content/enb/en/maps/municipal-regions.html',
    source: 'elections',
  },
];

const WARD_LINKS = [
  {
    title: 'Ward Search Tool',
    description:
      'Enter your home address and instantly find out which ward you live in. The fastest and most direct way to answer "what ward am I in?" — straight from the City of Moncton.',
    url: 'https://www7.moncton.ca/myzone/wardsearch?lang=en',
    source: 'moncton',
  },
  {
    title: 'Moncton Street & Ward Map',
    description:
      "A visual map showing Moncton's streets overlaid with ward boundaries. Useful if you prefer to orient yourself geographically rather than using an address search tool.",
    url: 'https://open.moncton.ca/datasets/fef4d647e8374e7b8362768df019c0d9',
    source: 'moncton',
  },
];

const COUNCILLOR_LINKS = [
  {
    title: 'Meet Your City Council',
    description:
      'Official profiles of all current Moncton city councillors, including their ward, photo, and contact information. The authoritative source for knowing who currently holds each seat.',
    url: 'https://www.moncton.ca/en/city-council',
    source: 'moncton',
  },
];

const ACTIVITY_LINKS = [
  {
    title: 'Council Meetings & Materials',
    description:
      'Agendas, meeting minutes, and decision records from all City Council meetings. This is the primary public record of what councillors voted on, what they said, and what was decided — the most important source for tracking performance.',
    url: 'https://www.moncton.ca/en/my-govt-work-city-council/council-meetings-and-materials',
    source: 'moncton',
  },
  {
    title: 'Council Attendance Record (2021–2025)',
    description:
      'The official attendance record for Moncton City Council during the 2021–2025 term. Shows how often each councillor was present at meetings — a key measure of engagement and accountability.',
    url: 'https://www5.moncton.ca/docs/council/2021-2025_Attendance_Presences.pdf',
    source: 'moncton',
  },
  {
    title: 'My Government at Work',
    description:
      "A broader overview of the City's governance activities, including committees, reports, and decisions beyond regular council meetings. A good way to see the full scope of how your elected officials are engaged.",
    url: 'https://www.moncton.ca/en/my-govt-work',
    source: 'moncton',
  },
  {
    title: 'Participate in City Council',
    description:
      'Information on how citizens can attend meetings, make presentations, or otherwise engage directly with council. Knowing how to participate is part of being an informed citizen.',
    url: 'https://www.moncton.ca/en/get-involved/participate-city-council',
    source: 'moncton',
  },
];

const VOTING_LINKS = [
  {
    title: 'Municipal Elections 2026',
    description:
      "The City of Moncton's official page for the upcoming 2026 municipal election. Check here for dates, candidate information, and how to vote as the election approaches.",
    url: 'https://www.moncton.ca/en/municipal-elections-2026',
    source: 'moncton',
  },
  {
    title: 'Where Do I Vote?',
    description:
      'The official Elections NB voter lookup tool. Select the "Local Government" option to find your polling division, your electoral ward, and your elected representatives in Moncton.',
    url: 'https://www.electionsnb.ca/content/enb/en/voters/search.html',
    source: 'elections',
  },
  {
    title: 'Voters List',
    description:
      'Confirm that your name is on the voters list, or add/update your information in the NB Registry of Electors. You must be on the list to vote in a municipal election.',
    url: 'https://www.electionsnb.ca/content/enb/en/voters/voters-list.html',
    source: 'elections',
  },
  {
    title: 'How to Vote',
    description:
      'A step-by-step guide to voting in a New Brunswick municipal election, including advance voting options, what to expect at the polls, and accessibility services available to voters.',
    url: 'https://www.electionsnb.ca/content/enb/en/voters/how-to-vote.html',
    source: 'elections',
  },
  {
    title: 'Voter ID Requirements',
    description:
      'The official list of acceptable identification to bring to the polls on election day. Includes photo ID options and alternatives if you do not have photo ID.',
    url: 'https://www.electionsnb.ca/content/enb/en/voters/voter-id-requirements.html',
    source: 'elections',
  },
  {
    title: 'Local Government Candidates',
    description:
      'Information for anyone considering running for local government in New Brunswick, including nomination requirements and the candidate kit. Also useful for citizens who want to understand the candidacy process.',
    url: 'https://www.electionsnb.ca/content/enb/en/representatives/municipal-candidates.html',
    source: 'elections',
  },
  {
    title: 'Municipal Election Publications',
    description:
      'Historical results, reports, and official publications from past NB municipal elections. Useful for comparing participation rates, candidate histories, and past election outcomes in Moncton.',
    url: 'https://www.electionsnb.ca/content/enb/en/resources/publications/mehep.html',
    source: 'elections',
  },
];

export default function Resources() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────────── */}
      <header className="page-header">
        <div className="container">
          <h1>Official Resources</h1>
          <p>
            Links to authoritative government sources to help you understand your
            ward, your councillors, and how your city government works.
          </p>
        </div>
      </header>

      <div className="container">
        {/* ── Intro notice ─────────────────────────────────────── */}
        <div
          className="notice notice-info"
          style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-10)' }}
        >
          <p>
            <strong>All official.</strong> Every link below points to the City of
            Moncton or Elections New Brunswick. Moncton Votes does not endorse any
            organization, publication, or viewpoint — these are the authoritative
            starting points for your own research.
          </p>
        </div>

        {/* ── Sections ─────────────────────────────────────────── */}
        <ResourceSection
          id="ward-heading"
          title="Find Your Ward"
          blurb="Not sure which ward you live in? These official tools can tell you in seconds, and show you who currently represents you."
          links={WARD_LINKS}
        />

        <ResourceSection
          id="voting-heading"
          title="Voting & Elections"
          blurb="Get ready to vote — registration, candidates, and the 2026 municipal election."
          links={VOTING_LINKS}
        />

        <ResourceSection
          id="councillors-heading"
          title="2021–2026 Councillors"
          blurb="Official profiles and contact information for current council members."
          links={COUNCILLOR_LINKS}
        />

        <ResourceSection
          id="activity-heading"
          title="Follow Council Activity"
          blurb="Track meetings, votes, and decisions — the official record of what your councillors are doing."
          links={ACTIVITY_LINKS}
        />

        <ResourceSection
          id="basics-heading"
          title="Understanding the Basics"
          blurb="New to local government? Start here for an overview of how Moncton's council is structured and what councillors are actually responsible for."
          links={BASICS_LINKS}
        />

        {/* ── Suggestion box ────────────────────────────────────── */}
        <section
          className="card"
          style={{
            marginBottom: 'var(--space-16)',
            background: 'var(--accent-light)',
            borderColor: 'var(--accent)',
          }}
          aria-label="Suggest a resource"
        >
          <h2 style={{
            fontSize: 'var(--text-xl)',
            marginBottom: 'var(--space-2)',
            color: 'var(--accent-dark)',
          }}>
            Know an official resource we should add?
          </h2>
          <p style={{
            color: 'var(--colour-grey-700)',
            fontSize: 'var(--text-base)',
            lineHeight: 1.7,
            marginBottom: 0,
          }}>
            If you know of another City of Moncton or Elections NB resource that
            would help voters, send it our way at{' '}
            <a href="mailto:info@monctonvotes.ca">info@monctonvotes.ca</a>. We review
            every suggestion against our non-partisanship standard before adding it.
          </p>
        </section>

        <p style={{
          textAlign: 'center',
          fontSize: 'var(--text-xs)',
          color: 'var(--colour-grey-500)',
          maxWidth: '640px',
          margin: '0 auto var(--space-16)',
          lineHeight: 1.6,
        }}>
          All links point to official City of Moncton or Elections New Brunswick
          sources. Content on those pages is maintained by the respective
          government bodies and may be updated at any time.
        </p>
      </div>
    </>
  );
}
