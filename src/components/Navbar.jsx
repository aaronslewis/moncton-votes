import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function getNavLinkClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link';
}

function getMobileNavLinkClass({ isActive }) {
  return isActive ? 'mobile-nav-link active' : 'mobile-nav-link';
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(prev => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="navbar-inner">
            {/* Brand wordmark */}
            <Link to="/" className="navbar-brand" onClick={closeMenu} style={{ fontFamily: 'inherit' }}>
              <span style={{
                fontFamily: "'Fraunces Variable', 'Fraunces', Georgia, serif",
                fontSize: '1.55rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: '#fff',
              }}>
                Moncton<span style={{ color: '#16A34A' }}>Votes</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="navbar-nav" role="list">
              <NavLink to="/" className={getNavLinkClass} end role="listitem">
                Home
              </NavLink>
              <NavLink to="/candidates" className={getNavLinkClass} role="listitem">
                Candidates
              </NavLink>
              <NavLink to="/wheretheystand" className={getNavLinkClass} role="listitem">
                Where They Stand
              </NavLink>
              <NavLink to="/resources" className={getNavLinkClass} role="listitem">
                Resources
              </NavLink>
              <NavLink to="/scorecards" className={getNavLinkClass} role="listitem">
                Scorecards
              </NavLink>
            </div>

            {/* Hamburger */}
            <button
              className="navbar-hamburger"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span
                className="hamburger-line"
                style={menuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}}
              />
              <span
                className="hamburger-line"
                style={menuOpen ? { opacity: 0 } : {}}
              />
              <span
                className="hamburger-line"
                style={menuOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`navbar-mobile-menu${menuOpen ? ' open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <div className="container">
            <NavLink to="/" className={getMobileNavLinkClass} onClick={closeMenu} end>
              Home
            </NavLink>
            <NavLink to="/candidates" className={getMobileNavLinkClass} onClick={closeMenu}>
              Candidates
            </NavLink>
            <NavLink to="/wheretheystand" className={getMobileNavLinkClass} onClick={closeMenu}>
              Where They Stand
            </NavLink>
            <NavLink to="/resources" className={getMobileNavLinkClass} onClick={closeMenu}>
              Resources
            </NavLink>
            <NavLink to="/scorecards" className={getMobileNavLinkClass} onClick={closeMenu}>
              Scorecards
            </NavLink>
          </div>
        </div>
      </nav>
      {/* Green accent bar */}
      <div className="navbar-accent" />
    </>
  );
}
