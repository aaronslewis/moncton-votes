import { useState } from 'react';
import { Link } from 'react-router-dom';

function ReportCardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 11l3 3L22 4"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  );
}

function CandidatesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function VoterCompassIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  );
}

function ResourcesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
}

/* ── Add to Calendar ─────────────────────────────────────── */

const VOTING_OPTIONS = [
  {
    id: 'advance-may2',
    label: 'Advance Poll — May 2',
    sublabel: 'Sat, May 2 · 10 am–8 pm',
    title: 'Vote – Advance Poll, Moncton Municipal Election',
    gcalDates: '20260502T100000/20260502T110000',
    icsStart: '20260502T100000',
    icsEnd:   '20260502T110000',
    isoStart: '2026-05-02T10:00:00',
    isoEnd:   '2026-05-02T11:00:00',
  },
  {
    id: 'advance-may4',
    label: 'Advance Poll — May 4',
    sublabel: 'Mon, May 4 · 10 am–8 pm',
    title: 'Vote – Advance Poll, Moncton Municipal Election',
    gcalDates: '20260504T100000/20260504T110000',
    icsStart: '20260504T100000',
    icsEnd:   '20260504T110000',
    isoStart: '2026-05-04T10:00:00',
    isoEnd:   '2026-05-04T11:00:00',
  },
  {
    id: 'election',
    label: 'Election Day',
    sublabel: 'Mon, May 11, 2026',
    title: 'Vote – Moncton Municipal Election',
    gcalDates: '20260511T083000/20260511T093000',
    icsStart: '20260511T083000',
    icsEnd:   '20260511T093000',
    isoStart: '2026-05-11T08:30:00',
    isoEnd:   '2026-05-11T09:30:00',
  },
];

const CAL_DESCRIPTION =
  'Moncton 2026 Municipal Election. Find your polling station: https://www.electionsnb.ca/content/enb/en/voters/search.html';

function CalendarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <path d="M9 16l2 2 4-4"/>
    </svg>
  );
}

function AddToCalendar() {
  const [selected, setSelected] = useState(VOTING_OPTIONS[0]);

  const googleUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(selected.title)}` +
    `&dates=${selected.gcalDates}` +
    `&details=${encodeURIComponent(CAL_DESCRIPTION)}`;

  const outlookUrl =
    `https://outlook.live.com/calendar/0/deeplink/compose` +
    `?subject=${encodeURIComponent(selected.title)}` +
    `&startdt=${selected.isoStart}` +
    `&enddt=${selected.isoEnd}` +
    `&body=${encodeURIComponent(CAL_DESCRIPTION)}`;

  function downloadIcs() {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Moncton Votes//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART:${selected.icsStart}`,
      `DTEND:${selected.icsEnd}`,
      `SUMMARY:${selected.title}`,
      `DESCRIPTION:${CAL_DESCRIPTION.replace(/,/g, '\\,')}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ];
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'moncton-vote-2026.ics';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ color: 'var(--accent)', marginBottom: 'var(--space-3)', display: 'flex', justifyContent: 'center' }}>
        <CalendarIcon />
      </div>
      <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
        Add voting day to your calendar
      </h2>
      <p style={{ color: 'var(--colour-grey-600)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-6)' }}>
        Pick when you plan to vote, then add it in one click.
      </p>

      {/* Day selector */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {VOTING_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt)}
              className={selected.id === opt.id ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ fontSize: 'var(--text-sm)', lineHeight: 1.3, padding: 'var(--space-2) var(--space-4)', width: '100%' }}
            >
              <span style={{ display: 'block', fontWeight: 600 }}>{opt.label}</span>
              <span style={{ display: 'block', fontSize: 'var(--text-xs)', opacity: 0.75, fontWeight: 400 }}>{opt.sublabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calendar service buttons */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ fontSize: 'var(--text-sm)', background: '#fff' }}
        >
          Google Calendar
        </a>
        <button
          onClick={downloadIcs}
          className="btn btn-outline"
          style={{ fontSize: 'var(--text-sm)', background: '#fff' }}
        >
          Apple Calendar
        </button>
        <a
          href={outlookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ fontSize: 'var(--text-sm)', background: '#fff' }}
        >
          Outlook
        </a>
      </div>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--colour-grey-400)', marginTop: 'var(--space-4)', lineHeight: 1.6 }}>
        Advance polls are open 10 am–8 pm. Election day polling hours vary by location — check your official polling notice.
      </p>
    </div>
  );
}

const features = [
  {
    icon: <CandidatesIcon />,
    title: 'Candidates by Ward',
    description:
      "Find who's running in your ward. Select your ward to see your ballot — Mayoral, At-Large, and ward-specific candidates.",
    link: '/candidates',
    linkLabel: 'Find Your Candidates',
    comingSoon: false,
  },
  {
    icon: <VoterCompassIcon />,
    title: 'Where They Stand',
    description:
      'Browse where candidates stand on homelessness, public safety, housing, transit, affordability, and more — in their own words.',
    link: '/platforms',
    linkLabel: 'Where They Stand',
    comingSoon: false,
  },
  {
    icon: <ResourcesIcon />,
    title: 'Resources',
    description:
      'Find official voting information, registration links, polling locations, and civic resources for the 2026 Moncton municipal election.',
    link: '/resources',
    linkLabel: 'View Resources',
    comingSoon: false,
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="hero" aria-label="Welcome">
        <div className="container">
          <div className="hero-content">
            <h1>Get informed.</h1>
            <p className="hero-body">
              Moncton's municipal election is May 11, 2026. Find out who's running in your ward, see how your current
              councillors performed, and make a choice you feel good about.
            </p>
            <div className="hero-cta">
              <Link to="/candidates" className="btn btn-primary">
                Find Your Candidates
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ── Features Grid ─────────────────────────────────────── */}
      <section className="page-section" aria-label="Site sections">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-3)' }}>
              Everything you need to vote informed
            </h2>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--colour-grey-600)', maxWidth: '560px', margin: '0 auto' }}>
              Three tools to help Moncton residents understand their council and prepare for election day.
            </p>
          </div>

          <div className="grid-3">
            {features.map((feature) => (
              <div key={feature.title} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {feature.title}
                  {feature.comingSoon && (
                    <span className="badge badge-blue" style={{ fontSize: '10px' }}>Soon</span>
                  )}
                </h3>
                <p style={{ color: 'var(--colour-grey-600)', fontSize: 'var(--text-sm)', flex: 1, lineHeight: 1.7 }}>
                  {feature.description}
                </p>
                <div style={{ marginTop: 'var(--space-5)' }}>
                  <Link
                    to={feature.link}
                    className="btn btn-outline"
                    style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-4)' }}
                  >
                    {feature.linkLabel} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Add to Calendar ──────────────────────────────────── */}
      <section
        className="page-section"
        style={{ borderTop: '1px solid var(--border)', background: '#fff' }}
        aria-label="Add voting day to your calendar"
      >
        <div className="container">
          <AddToCalendar />
        </div>
      </section>

      {/* ── About Section ─────────────────────────────────────── */}
      <section
        className="page-section"
        style={{ backgroundColor: '#EEE9E3', borderTop: '1px solid var(--border)' }}
        aria-label="About this site"
      >
        <div className="container">
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
              Citizen-led. Independent. Free.
            </h2>
            <p style={{ color: 'var(--colour-grey-600)', fontSize: 'var(--text-base)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
              Moncton Votes exists because we love this city and believe it can be more. That starts with
              council — and knowing who to vote for shouldn't take hours of digging. We track councillor
              records, compile candidate information, and cover the voting basics, so you have a real
              starting point to find the candidates who best match what you want from your city. Our goal
              is simple: better-informed voters lead to a better city council.
            </p>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--colour-grey-400)',
              borderTop: '1px solid var(--colour-grey-200)',
              paddingTop: 'var(--space-4)',
              margin: 0,
            }}>
              This site is independently produced and is not affiliated with the City of Moncton or any political party or campaign.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
