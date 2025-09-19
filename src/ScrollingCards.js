// src/ScrollingCards.js
import React, { useRef } from "react";
import "./ScrollingCards.css";
import streamers from "./images";

function ScrollingCards() {
  const railRef = useRef(null);

  const scrollByAmount = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const amount = Math.round(rail.clientWidth * 0.85);
    rail.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const groups = chunk(streamers, 6);

  return (
    <section className="cards-wrap">
      <div className="cards-header">
        <h2 className="cards-title">Meet the Streamers</h2>
        <p className="cards-subtitle">
          Discover amazing talent and creators from our community.
        </p>
      </div>

      <button
        className="rail-btn rail-btn--left"
        aria-label="Previous"
        onClick={() => scrollByAmount(-1)}
      >
        ‹
      </button>

      <div className="cards-rail" ref={railRef}>
        {groups.map((avatarGroup, idx) => (
          <FeatureCard
            key={idx}
            title={`Featured Group ${idx + 1}`}
            avatars={avatarGroup}
          />
        ))}
      </div>

      <button
        className="rail-btn rail-btn--right"
        aria-label="Next"
        onClick={() => scrollByAmount(1)}
      >
        ›
      </button>
    </section>
  );
}

function FeatureCard({ title, subtitle, avatars = [] }) {
  return (
    <article className="card">
      <div className="card-avatars">
        {avatars.map((streamer, i) => (
          <div key={i} className="avatar-wrapper">
            <img
              className="avatar"
              alt={`Streamer ${i + 1}`}
              src={streamer.src}
              loading="lazy"
            />
            <p className="avatar-handle">{streamer.handle}</p>
          </div>
        ))}
      </div>
      <h3 className="card-title">{title}</h3>
    </article>
  );
}

export default ScrollingCards;
