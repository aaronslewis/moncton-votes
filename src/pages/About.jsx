
import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>About This Site</h1>
        </div>
      </header>

      <div className="container">
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--space-8) 0 var(--space-16)' }}>

          {/* Who built it */}
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <div className="section-heading">
              <h2 style={{ fontSize: 'var(--text-2xl)' }}>Origin story</h2>
              <div className="section-divider" aria-hidden="true" />
            </div>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)', marginBottom: 'var(--space-4)' }}>
              Moncton Votes grew out of a personal desire to know more about the sitting councillors'
              track record. From there, when it became apparent how little information was readily
              available for voters, on the candidates they would choose from, their platforms, and basic
              voting questions — that's when the project really took off.
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)', marginBottom: 'var(--space-4)' }}>
              The site was built using <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer">Claude Code</a>,
              an AI tool that helps people build apps and websites. Discovering the information gap for voters came at the same time as discovering this new tool —
              the project followed naturally.
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)' }}>
              The site was created by Aaron Lewis, a Moncton citizen, with a great deal of input from
              community members who have helped with suggestions, fact-checks, and encouragement.
            </p>
          </section>

          {/* Funding */}
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <div className="section-heading">
              <h2 style={{ fontSize: 'var(--text-2xl)' }}>How is it funded?</h2>
              <div className="section-divider" aria-hidden="true" />
            </div>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)', marginBottom: 'var(--space-4)' }}>
              Moncton Votes is entirely self-funded. There is no advertising, no sponsorship, no
              donations, and no external funding of any kind. Hosting and domain costs are paid
              out of pocket.
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)' }}>
              No candidate, party, business, or organization has contributed money or resources to this
              site — and none have been asked to.
            </p>
          </section>

          {/* Non-partisanship */}
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <div className="section-heading">
              <h2 style={{ fontSize: 'var(--text-2xl)' }}>Non-partisanship policy</h2>
              <div className="section-divider" aria-hidden="true" />
            </div>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)', marginBottom: 'var(--space-4)' }}>
              This site does not endorse any candidate. Every effort is made to present information
              consistently and fairly across all candidates and wards. Candidate responses are published
              as submitted, with only minor mechanical corrections (punctuation, obvious typos) applied.
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)' }}>
              If you believe content on this site is inaccurate or unfair, please reach out — errors
              will be corrected promptly.
            </p>
          </section>

          {/* Contact CTA */}
          <section
            className="card"
            style={{
              background: 'var(--accent-light)',
              borderColor: 'var(--accent)',
              marginBottom: 'var(--space-10)',
            }}
            aria-label="Contact"
          >
            <h2 style={{
              fontSize: 'var(--text-xl)',
              marginBottom: 'var(--space-2)',
              color: 'var(--accent-dark)',
            }}>
              Questions or corrections?
            </h2>
            <p style={{
              color: 'var(--colour-grey-700)',
              fontSize: 'var(--text-base)',
              lineHeight: 1.7,
              marginBottom: 0,
            }}>
              Reach out at{' '}
              <a href="mailto:info@monctonvotes.ca">info@monctonvotes.ca</a>.
              {' '}Factual corrections, missing information, and thoughtful feedback are all welcome.
            </p>
          </section>

          {/* What's next */}
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <div className="section-heading">
              <h2 style={{ fontSize: 'var(--text-2xl)' }}>What's next?</h2>
              <div className="section-divider" aria-hidden="true" />
            </div>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)', marginBottom: 'var(--space-4)' }}>
              Voters should be able to easily know who they can vote for, and what that candidate stands for, in an election.
              Our democracy will struggle if this is not the case. This applies to people in Moncton,
              but also Dieppe, Riverview, and every other municipality.
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)' }}>
              As well, our democracy shouldn't rely on one person or any group of people. Our democracy
              is too important. How to provide voters with what they need, in a way they can trust, is
              what the next chapter of this project will explore.
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
