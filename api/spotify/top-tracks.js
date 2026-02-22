import { methodNotAllowed, serverError, setCacheHeaders } from "../_lib/response.js";
import { normalizeSpotifyTrack, spotifyFetch } from "../_lib/spotify.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }

  const limit = Math.min(Number(req.query.limit ?? 5) || 5, 10);
  const range = ["short_term", "medium_term", "long_term"].includes(req.query.range)
    ? req.query.range
    : "medium_term";

  try {
    const payload = await spotifyFetch(`/me/top/tracks?limit=${limit}&time_range=${range}`);
    setCacheHeaders(res, 900, 43200);
    return res.status(200).json({
      tracks: Array.isArray(payload.items) ? payload.items.map(normalizeSpotifyTrack) : [],
      fetchedAt: new Date().toISOString(),
      source: "spotify",
    });
  } catch (error) {
    console.error("Spotify top tracks error", error);
    return serverError(res, "Failed to load Spotify top tracks");
  }
}
