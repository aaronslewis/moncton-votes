import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Quick Links */}
            <div>
              <p className="footer-heading">Quick Links</p>
              <nav className="footer-links" aria-label="Footer navigation">
                <Link to="/">Home</Link>
                <Link to="/scorecards">Scorecards</Link>
                <Link to="/candidates">Candidates</Link>
                <Link to="/resources">Resources</Link>
                <Link to="/platforms">Platforms</Link>
              </nav>
            </div>

            {/* About */}
            <div>
              <p className="footer-heading">About This Site</p>
              <p className="footer-text">
                Moncton Votes is citizen-led and independent. We track councillor records, compile candidate
                information, and cover the voting basics — so Moncton residents can show up informed.
                We are not affiliated with any political party, campaign, or the City of Moncton.
              </p>
            </div>

            {/* Contact */}
            <div>
              <p className="footer-heading">Contact</p>
              <p className="footer-text">
                This site is maintained by local residents who believe an informed city is a better city.
              </p>
              <p className="footer-text" style={{ marginTop: '0.75rem' }}>
                Have a correction or want to contribute?{' '}
                <a href="mailto:info@monctonvotes.ca" style={{ color: '#93c5fd' }}>
                  info@monctonvotes.ca
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p className="footer-copyright">
              &copy; {currentYear} Moncton Votes &mdash; Get informed.
            </p>
            <p className="footer-disclaimer">
              This site is independently produced and is not affiliated with the City of Moncton or any political party or campaign.
              Information is provided for civic education purposes only. Always verify details with official sources.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
