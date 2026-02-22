import { badRequest, methodNotAllowed, serverError, setCacheHeaders } from "../_lib/response.js";
import { normalizeSpotifyPlaylist, spotifyFetch } from "../_lib/spotify.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }

  const idsParam = String(req.query.ids || "").trim();
  if (!idsParam) {
    return badRequest(res, "Missing ids query parameter");
  }

  const ids = [...new Set(idsParam.split(",").map((id) => id.trim()).filter(Boolean))].slice(0, 10);
  if (!ids.length) {
    return badRequest(res, "No valid playlist IDs provided");
  }

  try {
    const playlists = await Promise.all(ids.map((id) => spotifyFetch(`/playlists/${encodeURIComponent(id)}`)));
    setCacheHeaders(res, 1800, 86400);
    return res.status(200).json({
      playlists: playlists.map(normalizeSpotifyPlaylist),
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Spotify playlists error", error);
    return serverError(res, "Failed to load Spotify playlists");
  }
}
