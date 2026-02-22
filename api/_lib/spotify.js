const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

function getSpotifyEnv() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify env vars");
  }

  return { clientId, clientSecret, refreshToken };
}

export async function getSpotifyAccessToken() {
  const { clientId, clientSecret, refreshToken } = getSpotifyEnv();
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Spotify token refresh failed (${response.status}): ${text}`);
  }

  const payload = await response.json();
  return payload.access_token;
}

export async function spotifyFetch(path) {
  const accessToken = await getSpotifyAccessToken();
  const response = await fetch(`${SPOTIFY_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Spotify API failed (${response.status}): ${text}`);
  }

  return response.json();
}

export function normalizeSpotifyTrack(track) {
  return {
    id: track.id,
    name: track.name,
    artists: Array.isArray(track.artists) ? track.artists.map((artist) => artist.name).filter(Boolean) : [],
    albumName: track.album?.name,
    albumImageUrl: track.album?.images?.[0]?.url,
    externalUrl: track.external_urls?.spotify,
    previewUrl: track.preview_url ?? null,
  };
}

export function normalizeSpotifyPlaylist(playlist) {
  return {
    id: playlist.id,
    name: playlist.name,
    description: playlist.description || undefined,
    imageUrl: playlist.images?.[0]?.url,
    externalUrl: playlist.external_urls?.spotify,
    ownerName: playlist.owner?.display_name || playlist.owner?.id,
    trackCount: typeof playlist.tracks?.total === "number" ? playlist.tracks.total : undefined,
  };
}
