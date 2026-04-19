
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
              track record. From there, once it became apparent how little information was readily
              available on the candidates running, their platforms, and the voting process itself —
              that's when the project really took off. There was a major gap that needed to be filled.
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)', marginBottom: 'var(--space-4)' }}>
              The site was built using <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer">Claude Code</a>,
              an AI tool that helps people build and ship software. Discovering the candidate and election information gap was well timed with discovering this new tool
              and looking for a project to use it on.
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)' }}>
              The site was created by Aaron Lewis, a Moncton resident, and has benefited
              from suggestions, fact-checks, and encouragement from a number of community connections —
              neighbours, local watchers of city politics, and people who simply wanted to see better
              civic information online.
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
              site — and none have been asked to. That independence is intentional.
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
              It's clear this site fills a real gap. Citizens can't wait for institutions to step up on
              something as important as our democracy and the leaders we elect. People need to know who
              the candidates are and what they stand for — and that need doesn't stop at Moncton's city
              limits. Dieppe, Riverview, and every other municipality face the same problem.
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--colour-grey-700)' }}>
              Democracy is too important for something this critical to depend on any one person or
              group. What's needed is an open solution — something that exists on its own terms,
              independent of any individual, and built to earn trust over time. The next chapter of
              this project will explore what that could look like.
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
