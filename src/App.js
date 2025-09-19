import React, { useEffect, useState } from "react";
import "./App.css";
import ScrollingCards from "./ScrollingCards";
import hbcutv from "./video/hbcutv.mp4";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // Subtle 3D hover effect on the TV frame
    const tv = document.getElementById("tv-frame");
    if (!tv) return;

    const onMove = (e) => {
      const rect = tv.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tv.style.transform = `rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
    };
    const onLeave = () => {
      tv.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    tv.addEventListener("mousemove", onMove);
    tv.addEventListener("mouseleave", onLeave);
    return () => {
      tv.removeEventListener("mousemove", onMove);
      tv.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="App">
      {/* Split background */}
      <div className="bg-split"></div>

      {/* ====== HEADER with hamburger ====== */}
      <header className="container site-header">
        <div className="brand-row">
          {/* Moved burger to the LEFT */}
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

          <a href="/" className="brand">
            HBCU ShadeRoom TV
          </a>

          {/* Desktop links on the far right */}
          <nav className="links-desktop">
            <a href="/">Home</a>
            <a href="#advertise">Advertise with us</a>
            <a href="#partner">Become a partner</a>
          </nav>
        </div>

        {/* Mobile menu panel */}
        <nav
          id="site-menu"
          className={`menu-panel ${menuOpen ? "open" : ""}`}
          role="menu"
        >
          <a href="/" role="menuitem" onClick={() => setMenuOpen(false)}>
            HBCU ShadeRoom TV
          </a>
          <a
            href="#advertise"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            Advertise with us
          </a>
          <a href="#partner" role="menuitem" onClick={() => setMenuOpen(false)}>
            Become a partner
          </a>
        </nav>

        {/* Backdrop */}
        <div
          className={`menu-backdrop ${menuOpen ? "show" : ""}`}
          onClick={() => setMenuOpen(false)}
        />
      </header>

      {/* ====== HERO ====== */}
      <main className="container hero">
        <section className="copy">
          <p className="eyebrow">HBCU Shaderoom TV</p>
          <h1 className="title">
            HBCU Streaming <span className="accent">Platform.</span>
          </h1>
          <p className="subtitle">
            The #1 network for eccentric HBCU news, culture, music, fashion and
            campus talk which is unfiltered, unapologetic, and always real. Plus
            live shows and events you won’t see anywhere else.
          </p>
        </section>

        {/* TV with placeholder video */}
        <section className="visual">
          <div id="tv-frame" className="tv">
            <div className="bezel">
              <div className="screen">
                <video
                  src={hbcutv}
                  className="real-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                >
                  Sorry, your browser doesn’t support embedded videos.
                </video>
              </div>
            </div>
          </div>

          <div className="cta-row">
            <a className="btn" href="#apply">
              Watch Live TV
            </a>
            <span className="hash">#HBCUSRTV</span>
          </div>
        </section>
      </main>

      {/* Scrolling Cards */}
      <ScrollingCards />

      {/* Anchor sections for menu targets (optional placeholders) */}
      <section id="advertise" className="container spacer"></section>
      <section id="partner" className="container spacer"></section>

      <footer className="container footer">
        © {new Date().getFullYear()} HBCU Shaderoom TV. A Product of HBCU
        Shaderoom, LLC. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
