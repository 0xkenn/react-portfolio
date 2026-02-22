import { useSpotifyPlaylists, useSpotifyTopTracks } from "@/hooks/useSpotify";
import type { SpotifySettings } from "@/types/portfolio";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorStateCard, SectionHeading } from "@/components/portfolio/section-shared";

function RowSkeleton({ withImage = true }: { withImage?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-2.5 bg-background/30 animate-pulse">
      {withImage ? <div className="w-10 h-10 rounded bg-muted/60 shrink-0" /> : null}
      <div className="flex-1 space-y-1.5">
        <div className="h-3 rounded bg-muted/60 w-2/3" />
        <div className="h-2.5 rounded bg-muted/50 w-1/2" />
      </div>
      <div className="h-3 rounded bg-muted/50 w-8" />
    </div>
  );
}

export function SpotifySection({ title, settings }: { title: string; settings: SpotifySettings }) {
  const playlistIds = settings.featuredPlaylists
    .slice()
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .map((item) => item.spotifyPlaylistId);

  const topTracksQuery = useSpotifyTopTracks({
    enabled: settings.enabled,
    limit: settings.topTracksLimit,
    range: settings.topTracksRange,
  });
  const playlistsQuery = useSpotifyPlaylists({ enabled: settings.enabled, playlistIds });

  if (!settings.enabled) {
    return null;
  }

  const showError = topTracksQuery.isError && (playlistIds.length === 0 || playlistsQuery.isError);

  return (
    <section id="spotify" className="mt-14 w-full max-w-5xl mx-auto px-4">
      <SectionHeading title={title} subtitle="Top tracks and curated playlists from Spotify." className="mb-4" />

      {showError ? (
        <ErrorStateCard
          title="Spotify is currently unavailable"
          description="The portfolio could not load Spotify data right now. Try again later."
        />
      ) : null}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 items-start">
        <Card className="bg-transparent">
          <CardHeader className="pb-2 px-4 sm:px-5 pt-4">
            <CardTitle className="text-base">Top Tracks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 px-4 sm:px-5 pb-4">
            {topTracksQuery.isLoading ? (
              <div className="space-y-2">
                <RowSkeleton />
                <RowSkeleton />
                <RowSkeleton />
              </div>
            ) : topTracksQuery.isError ? (
              <p className="text-sm text-muted-foreground">Could not load top tracks right now.</p>
            ) : topTracksQuery.data?.length ? (
              <ol className="space-y-2">
                {topTracksQuery.data.map((track, index) => (
                  <li key={track.id} className="flex items-center gap-2.5 rounded-lg border p-2.5 bg-background/30">
                    <span className="text-xs font-semibold text-muted-foreground w-5">{index + 1}</span>
                    {track.albumImageUrl ? (
                      <img src={track.albumImageUrl} alt={track.name} className="w-10 h-10 rounded object-cover" />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{track.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{track.artists.join(", ")}</p>
                    </div>
                    {track.externalUrl ? (
                      <a
                        href={track.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs underline text-muted-foreground hover:text-foreground"
                      >
                        Open
                      </a>
                    ) : null}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">No top tracks available yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-transparent">
          <CardHeader className="pb-2 px-4 sm:px-5 pt-4">
            <CardTitle className="text-base">Featured Playlists</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 px-4 sm:px-5 pb-4">
            {playlistIds.length === 0 ? (
              <p className="text-sm text-muted-foreground">Add playlist IDs in Sanity to populate this section.</p>
            ) : playlistsQuery.isLoading ? (
              <div className="space-y-2">
                <RowSkeleton />
                <RowSkeleton />
              </div>
            ) : playlistsQuery.isError ? (
              <p className="text-sm text-muted-foreground">Could not load playlists right now.</p>
            ) : playlistsQuery.data?.length ? (
              <div className="space-y-2">
                {playlistsQuery.data.map((playlist) => (
                  <div key={playlist.id} className="rounded-lg border p-2.5 bg-background/30 flex gap-2.5 items-center">
                    {playlist.imageUrl ? (
                      <img src={playlist.imageUrl} alt={playlist.name} className="w-10 h-10 rounded object-cover" />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{playlist.name}</p>
                      {playlist.ownerName ? (
                        <p className="text-xs text-muted-foreground truncate">By {playlist.ownerName}</p>
                      ) : null}
                      {typeof playlist.trackCount === "number" ? (
                        <p className="text-xs text-muted-foreground">{playlist.trackCount} tracks</p>
                      ) : null}
                    </div>
                    {playlist.externalUrl ? (
                      <a
                        href={playlist.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs underline text-muted-foreground hover:text-foreground"
                      >
                        Open
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No playlists available yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
