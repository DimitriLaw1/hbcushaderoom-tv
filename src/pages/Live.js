import React, { useEffect, useMemo, useState } from "react";
// Local art for the offline hero (pick any you like)
import graphic1 from "../images/graphics/graphic_1.jpg";
import graphic2 from "../images/graphics/graphic_2.jpg";
import graphic3 from "../images/graphics/graphic_3.jpg";
import graphic4 from "../images/graphics/graphic_4.jpg";
import graphic5 from "../images/graphics/graphic_5.jpg";
import graphic6 from "../images/graphics/graphic_6.jpg";
import graphic7 from "../images/graphics/graphic_7.jpg";
import poster from "../images/graphics/hbcusrtvBLACK.jpg";

export default function Live() {
  const channel = "hbcushaderoom";
  const [isLive, setIsLive] = useState(null); // null = loading
  const [error, setError] = useState("");

  const src = useMemo(() => {
    const parents = new Set();
    parents.add(window.location.hostname);
    const extra = process.env.REACT_APP_TWITCH_PARENT_EXTRA;
    if (extra) parents.add(extra);

    const parentParams = Array.from(parents)
      .filter(Boolean)
      .map((p) => `parent=${encodeURIComponent(p)}`)
      .join("&");

    return `https://player.twitch.tv/?channel=${channel}&${parentParams}`;
  }, [channel]);

  useEffect(() => {
    let timer;
    const load = async () => {
      try {
        const r = await fetch("/api/twitch-status");
        const j = await r.json();
        setIsLive(Boolean(j.live));
        setError("");
      } catch (e) {
        setError("Couldn’t check stream status.");
        setIsLive(false);
      }
    };
    load();
    // Re-check every 60s
    timer = setInterval(load, 60000);
    return () => clearInterval(timer);
  }, []);

  const nowPlaying = [
    {
      id: "g1",
      title: "HBCU Love Island",
      second: "Nov 1st, 1pm - 2pm",
      img: graphic6,
    },
    {
      id: "g2",
      title: "HBCU Blind Dates",
      second: "Nov 2nd, 1pm - 2pm",
      img: graphic7,
    },
    {
      id: "g3",
      title: "Snoop X Smoke",
      second: "Nov 3rd, 1pm - 2pm",
      img: graphic3,
    },
    {
      id: "g4",
      title: "20 women vs 1 man",
      second: "Nov 4th, 1pm - 2pm",
      img: graphic4,
    },
    {
      id: "g5",
      title: "Song Wars",
      second: "Nov 5th, 1pm - 2pm",
      img: graphic5,
    },
    {
      id: "g6",
      title: "Gamer Stream",
      second: "Nov 6th, 1pm - 2pm",
      img: graphic2,
    },
    {
      id: "g7",
      title: "Song Wars",
      second: "Nov 7th, 1pm - 2pm",
      img: graphic1,
    },
  ];

  return (
    <div className="container spacer" style={{ padding: "1rem 0" }}>
      {/* ADDED CLASS */}
      <h2 className="live-title">Watch Live TV</h2>

      {isLive === null ? (
        /* Loading skeleton */
        <div className="live-skeleton" />
      ) : isLive ? (
        /* LIVE: show Twitch iframe */
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            src={src}
            allowFullScreen
            frameBorder="0"
            title="HBCU ShadeRoom TV"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      ) : (
        /* OFFLINE: custom interface */
        <OfflineHero />
      )}

      {error && (
        <p className="adv-msg err" style={{ marginTop: 8 }}>
          {error}
        </p>
      )}

      {/* Coming Soon row */}
      <section className="now-section">
        <div className="now-header">
          <h3 className="now-title">Coming Soon</h3>
          <a className="now-viewall" href="/live">
            View All
          </a>
        </div>

        <div className="now-scroller" role="list">
          {nowPlaying.map((item) => (
            <article className="now-card" key={item.id} role="listitem">
              <div className="now-poster">
                <img src={item.img} alt={item.title} loading="lazy" />
              </div>
              <div className="now-name">{item.title}</div>
              <div
                className="now-second"
                style={{
                  color: "var(--muted)",
                  fontSize: "12px",
                  marginTop: "2px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.second}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

/* --- Offline hero component --- */
function OfflineHero() {
  return (
    <div className="offline-wrap" style={{ backgroundImage: `url(${poster})` }}>
      <div className="offline-overlay" />
      <div className="offline-card">
        <div className="offline-pill">OFFLINE</div>
        <h4 className="offline-title">We’re not live right now</h4>
        <p className="offline-sub">
          Catch up on recent streams or check the schedule below.
        </p>
        <div className="offline-actions">
          <a
            className="btn btn-primary"
            href="https://www.twitch.tv/hbcushaderoom/videos?filter=archives&sort=time"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch latest stream
          </a>
          <a
            className="btn btn-outline"
            href="https://www.twitch.tv/hbcushaderoom"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on Twitch
          </a>
        </div>
      </div>
    </div>
  );
}
