import { methodNotAllowed, serverError, setCacheHeaders } from "../_lib/response.js";
import { fetchGithubPinnedRepos } from "../_lib/github.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }

  const username = String(req.query.username || process.env.GITHUB_USERNAME || "").trim();
  const limit = Math.min(Number(req.query.limit ?? 6) || 6, 10);

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  try {
    const repos = await fetchGithubPinnedRepos(username, limit);
    setCacheHeaders(res, 1800, 86400);
    return res.status(200).json({ repos, fetchedAt: new Date().toISOString() });
  } catch (error) {
    console.error("GitHub pinned repos error", error);
    return serverError(res, "Failed to load GitHub pinned repositories");
  }
}
