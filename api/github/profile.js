import { methodNotAllowed, serverError, setCacheHeaders } from "../_lib/response.js";
import { fetchGithubProfile } from "../_lib/github.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }

  const username = String(req.query.username || process.env.GITHUB_USERNAME || "").trim();
  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  try {
    const profile = await fetchGithubProfile(username);
    setCacheHeaders(res, 1800, 86400);
    return res.status(200).json({ profile, fetchedAt: new Date().toISOString() });
  } catch (error) {
    console.error("GitHub profile error", error);
    return serverError(res, "Failed to load GitHub profile");
  }
}
