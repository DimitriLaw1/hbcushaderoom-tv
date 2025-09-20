import React, { useMemo } from "react";
// 👉 Import your graphics (make sure extensions match your files)
import graphic1 from "../images/graphics/graphic_1.jpg";
import graphic2 from "../images/graphics/graphic_2.jpg";
import graphic3 from "../images/graphics/graphic_3.jpg";
import graphic4 from "../images/graphics/graphic_4.jpg";
import graphic5 from "../images/graphics/graphic_5.jpg";
import graphic6 from "../images/graphics/graphic_6.jpg";
import graphic7 from "../images/graphics/graphic_7.jpg";

export default function Live() {
  const channel = "hbcushaderoom";

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
      second: "Nov 2nd, 2pm - 6pm",
      img: graphic7,
    },
    {
      id: "g3",
      title: "Snoop X Smoke",
      second: "Nov 3rd, 6pm - 10pm",
      img: graphic3,
    },
    {
      id: "g4",
      title: "20 women vs 1 man",
      second: "Nov 4th, 4pm - 8pm",
      img: graphic4,
    },
    {
      id: "g5",
      title: "Song Wars",
      second: "Nov 5th, 1pm - 4pm",
      img: graphic5,
    },
    {
      id: "g6",
      title: "Gamer Stream",
      second: "Nov 6th, 4pm - 11pm",
      img: graphic2,
    },
    {
      id: "g7",
      title: "Song Wars",
      second: "Nov 7th, 2pm - 6pm",
      img: graphic1,
    },
  ];

  return (
    <div className="container spacer" style={{ padding: "1rem 0" }}>
      <h2>Watch Live TV</h2>
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

      {/* Now Playing row */}
      <section className="now-section">
        <div className="now-header">
          <h3 className="now-title">Coming Soon</h3>
        </div>

        <div className="now-scroller" role="list">
          {nowPlaying.map((item) => (
            <article className="now-card" key={item.id} role="listitem">
              <div className="now-poster">
                <img src={item.img} alt={item.title} loading="lazy" />
              </div>
              <div className="now-name">{item.title}</div>
              {/* NEW: secondary line directly under title in gray */}
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
