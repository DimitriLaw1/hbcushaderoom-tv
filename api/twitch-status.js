// Vercel serverless function: GET /api/twitch-status
// Returns: { live: boolean, title?, viewer_count?, started_at?, thumbnail_url? }

let cachedToken = null;
let tokenExpiresAt = 0;

export default async function handler(req, res) {
  const channelLogin = process.env.TWITCH_CHANNEL_LOGIN || "hbcushaderoom";
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    res.status(500).json({ error: "Missing TWITCH_CLIENT_ID/SECRET env vars" });
    return;
  }

  try {
    const now = Date.now();
    if (!cachedToken || now >= tokenExpiresAt) {
      // Get app access token
      const tokenResp = await fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
        { method: "POST" }
      );
      if (!tokenResp.ok) {
        const t = await tokenResp.text();
        throw new Error(`Token error: ${tokenResp.status} ${t}`);
      }
      const tokenJson = await tokenResp.json();
      cachedToken = tokenJson.access_token;
      // expires_in is seconds
      tokenExpiresAt = now + (tokenJson.expires_in - 60) * 1000; // refresh 1 min early
    }

    // Is the channel live?
    const liveResp = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${channelLogin}`,
      {
        headers: {
          "Client-Id": clientId,
          Authorization: `Bearer ${cachedToken}`,
        },
      }
    );

    if (!liveResp.ok) {
      const t = await liveResp.text();
      throw new Error(`Helix error: ${liveResp.status} ${t}`);
    }

    const liveJson = await liveResp.json();
    const stream = liveJson.data?.[0];

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

    if (stream) {
      const thumb = (stream.thumbnail_url || "")
        .replace("{width}", "1280")
        .replace("{height}", "720");

      res.status(200).json({
        live: true,
        title: stream.title,
        viewer_count: stream.viewer_count,
        started_at: stream.started_at,
        thumbnail_url: thumb,
      });
    } else {
      res.status(200).json({ live: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Twitch status" });
  }
}
