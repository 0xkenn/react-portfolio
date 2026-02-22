import { useQuery } from "@tanstack/react-query";

import type {
  SpotifyPlaylistCard,
  SpotifyPlaylistsResponse,
  SpotifyTrackCard,
  SpotifyTopTracksResponse,
} from "@/types/portfolio";

type UseSpotifyTopTracksOptions = {
  enabled: boolean;
  limit?: number;
  range?: "short_term" | "medium_term" | "long_term";
};

type UseSpotifyPlaylistsOptions = {
  enabled: boolean;
  playlistIds: string[];
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export function useSpotifyTopTracks({ enabled, limit = 5, range = "medium_term" }: UseSpotifyTopTracksOptions) {
  return useQuery<SpotifyTopTracksResponse, Error, SpotifyTrackCard[]>({
    queryKey: ["spotify", "top-tracks", { limit, range }],
    enabled,
    staleTime: 1000 * 60 * 10,
    queryFn: () => fetchJson<SpotifyTopTracksResponse>(`/api/spotify/top-tracks?limit=${limit}&range=${range}`),
    select: (data) => data.tracks,
  });
}

export function useSpotifyPlaylists({ enabled, playlistIds }: UseSpotifyPlaylistsOptions) {
  const normalizedIds = playlistIds.filter(Boolean).join(",");

  return useQuery<SpotifyPlaylistsResponse, Error, SpotifyPlaylistCard[]>({
    queryKey: ["spotify", "playlists", normalizedIds],
    enabled: enabled && playlistIds.length > 0,
    staleTime: 1000 * 60 * 30,
    queryFn: () => fetchJson<SpotifyPlaylistsResponse>(`/api/spotify/playlists?ids=${encodeURIComponent(normalizedIds)}`),
    select: (data) => data.playlists,
  });
}
