import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <div className="bg-split" />

      <header className="container site-header">
        <div className="brand-row">
          {/* Hamburger */}
          <button
            className="burger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>

          {/* Brand */}
          <Link to="/" className="brand">
            HBCU ShadeRoom TV
          </Link>

          {/* Desktop Nav */}
          <nav className="links-desktop">
            <Link to="/">Home</Link>
            <Link to="/advertise">Advertise with us</Link>
            <Link to="/live">Watch Live TV</Link>
          </nav>
        </div>

        {/* Mobile menu */}
        <nav
          id="site-menu"
          className={`menu-panel ${menuOpen ? "open" : ""}`}
          role="menu"
        >
          <Link to="/" role="menuitem" onClick={() => setMenuOpen(false)}>
            HBCU ShadeRoom TV
          </Link>
          <Link
            to="/advertise"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            Advertise with us
          </Link>
          <Link to="/live" role="menuitem" onClick={() => setMenuOpen(false)}>
            Watch Live TV
          </Link>
        </nav>

        {/* Backdrop */}
        <div
          className={`menu-backdrop ${menuOpen ? "show" : ""}`}
          onClick={() => setMenuOpen(false)}
        />
      </header>

      {/* Page content */}
      {children}

      <footer className="container footer">
        © {new Date().getFullYear()} HBCU Shaderoom TV. A Product of HBCU
        Shaderoom, LLC. All rights reserved.
      </footer>
    </div>
  );
}
