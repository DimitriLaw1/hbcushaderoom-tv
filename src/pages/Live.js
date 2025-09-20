import React, { useMemo } from "react";

/**
 * Twitch requires the `parent` URL param to match the current host.
 * Optionally add an extra parent (e.g., your Vercel preview/production) via env:
 * REACT_APP_TWITCH_PARENT_EXTRA=your-vercel-domain.vercel.app
 */
export default function Live() {
  const channel = "hbcushaderoom";

  const src = useMemo(() => {
    const parents = new Set();
    // current host (localhost or production)
    parents.add(window.location.hostname);
    // optional extra domain from env
    const extra = process.env.REACT_APP_TWITCH_PARENT_EXTRA;
    if (extra) parents.add(extra);

    const parentParams = Array.from(parents)
      .filter(Boolean)
      .map((p) => `parent=${encodeURIComponent(p)}`)
      .join("&");

    return `https://player.twitch.tv/?channel=${channel}&${parentParams}`;
  }, []);

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
    </div>
  );
}
