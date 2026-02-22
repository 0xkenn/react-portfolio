import { useQuery } from "@tanstack/react-query";

import type {
  GithubPinnedReposResponse,
  GithubProfile,
  GithubProfileResponse,
  GithubRepoCard,
} from "@/types/portfolio";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export function useGithubProfile(username: string, enabled: boolean) {
  return useQuery<GithubProfileResponse, Error, GithubProfile>({
    queryKey: ["github", "profile", username],
    enabled: enabled && Boolean(username),
    staleTime: 1000 * 60 * 15,
    queryFn: () => fetchJson<GithubProfileResponse>(`/api/github/profile?username=${encodeURIComponent(username)}`),
    select: (data) => data.profile,
  });
}

export function useGithubPinnedRepos(username: string, limit: number, enabled: boolean) {
  return useQuery<GithubPinnedReposResponse, Error, GithubRepoCard[]>({
    queryKey: ["github", "pinned", username, limit],
    enabled: enabled && Boolean(username),
    staleTime: 1000 * 60 * 30,
    queryFn: () =>
      fetchJson<GithubPinnedReposResponse>(
        `/api/github/pinned-repos?username=${encodeURIComponent(username)}&limit=${limit}`,
      ),
    select: (data) => data.repos,
  });
}
