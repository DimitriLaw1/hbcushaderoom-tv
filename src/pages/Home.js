import React from "react";
import { Link } from "react-router-dom";
import ScrollingCards from "../ScrollingCards";
import hbcutv from "../video/hbcutv.mp4";
import useTvTilt from "../hooks/useTvTilt";

export default function Home() {
  useTvTilt("tv-frame");

  return (
    <>
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
                />
              </div>
            </div>
          </div>

          <div className="cta-row">
            <Link className="btn" to="/live">
              Watch Live TV
            </Link>
            <span className="hash">#HBCUSRTV</span>
          </div>
        </section>
      </main>

      <ScrollingCards />
    </>
  );
}
