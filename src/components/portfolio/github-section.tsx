import { useGithubPinnedRepos, useGithubProfile } from "@/hooks/useGithub";
import type { GithubSettings } from "@/types/portfolio";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorStateCard, SectionHeading } from "@/components/portfolio/section-shared";

function ProfileSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center animate-pulse">
      <div className="w-12 h-12 rounded-full bg-muted/60 border shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 rounded bg-muted/60 w-32" />
        <div className="h-3 rounded bg-muted/50 w-2/3" />
        <div className="h-2.5 rounded bg-muted/50 w-1/2" />
      </div>
    </div>
  );
}

function RepoSkeleton() {
  return (
    <div className="rounded-lg border p-3 bg-background/30 animate-pulse space-y-2">
      <div className="h-3.5 rounded bg-muted/60 w-2/3" />
      <div className="h-3 rounded bg-muted/50 w-full" />
      <div className="h-3 rounded bg-muted/50 w-4/5" />
      <div className="flex gap-3 pt-1">
        <div className="h-2.5 rounded bg-muted/50 w-10" />
        <div className="h-2.5 rounded bg-muted/50 w-14" />
      </div>
    </div>
  );
}

export function GithubSection({ title, settings }: { title: string; settings: GithubSettings }) {
  const profileQuery = useGithubProfile(settings.username, settings.enabled);
  const reposQuery = useGithubPinnedRepos(settings.username, settings.pinnedReposLimit, settings.enabled);

  if (!settings.enabled) {
    return null;
  }

  const showError = profileQuery.isError && reposQuery.isError;

  return (
    <section id="github" className="mt-14 mb-20 w-full max-w-5xl mx-auto px-4">
      <SectionHeading title={title} subtitle="Profile summary and pinned repositories from GitHub." className="mb-4" />

      {showError ? (
        <ErrorStateCard
          title="GitHub is currently unavailable"
          description="The portfolio could not load GitHub profile data right now."
        />
      ) : null}

      <div className="space-y-4">
        <Card className="bg-transparent">
          <CardHeader className="pb-2 px-4 sm:px-5 pt-4">
            <CardTitle className="text-base">Profile</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-5 pb-4">
            {profileQuery.isLoading ? (
              <ProfileSkeleton />
            ) : profileQuery.isError ? (
              <p className="text-sm text-muted-foreground">Could not load GitHub profile right now.</p>
            ) : profileQuery.data ? (
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <img
                  src={profileQuery.data.avatarUrl}
                  alt={`${profileQuery.data.login} avatar`}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-semibold text-sm">{profileQuery.data.login}</p>
                    <a
                      href={profileQuery.data.profileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm underline text-muted-foreground hover:text-foreground"
                    >
                      View profile
                    </a>
                  </div>
                  {profileQuery.data.bio ? <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{profileQuery.data.bio}</p> : null}
                  <p className="text-xs text-muted-foreground mt-2">
                    {profileQuery.data.publicRepos} repos · {profileQuery.data.followers} followers · {profileQuery.data.following} following
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No GitHub profile data available.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-transparent">
          <CardHeader className="pb-2 px-4 sm:px-5 pt-4">
            <CardTitle className="text-base">Pinned Repositories</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-5 pb-4">
            {reposQuery.isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RepoSkeleton />
                <RepoSkeleton />
              </div>
            ) : reposQuery.isError ? (
              <p className="text-sm text-muted-foreground">Could not load pinned repositories right now.</p>
            ) : reposQuery.data?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reposQuery.data.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border p-4 bg-background/40 hover:bg-background/70 transition-colors"
                  >
                    <p className="font-medium text-sm">{repo.name}</p>
                    {repo.description ? (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{repo.description}</p>
                    ) : null}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs text-muted-foreground">
                      <span>★ {repo.stars}</span>
                      {repo.primaryLanguage ? <span>{repo.primaryLanguage}</span> : null}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No pinned repositories available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
