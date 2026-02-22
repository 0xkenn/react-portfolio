const GITHUB_REST_BASE = "https://api.github.com";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

function githubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "0xkenn-portfolio",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function fetchGithubProfile(username) {
  const response = await fetch(`${GITHUB_REST_BASE}/users/${encodeURIComponent(username)}`, {
    headers: githubHeaders(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub profile request failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  return {
    login: data.login,
    avatarUrl: data.avatar_url,
    bio: data.bio || undefined,
    followers: data.followers ?? 0,
    following: data.following ?? 0,
    publicRepos: data.public_repos ?? 0,
    profileUrl: data.html_url,
  };
}

export async function fetchGithubPinnedRepos(username, limit = 6) {
  const query = `query PinnedRepos($login: String!, $limit: Int!) {
    user(login: $login) {
      pinnedItems(first: $limit, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            stargazerCount
            updatedAt
            primaryLanguage { name }
          }
        }
      }
    }
  }`;

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      ...githubHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        limit,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub GraphQL request failed (${response.status}): ${text}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(`GitHub GraphQL error: ${payload.errors[0].message}`);
  }

  const nodes = payload.data?.user?.pinnedItems?.nodes ?? [];
  return nodes.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description || undefined,
    url: repo.url,
    stars: repo.stargazerCount ?? 0,
    primaryLanguage: repo.primaryLanguage?.name || undefined,
    updatedAt: repo.updatedAt || undefined,
  }));
}
