export function setCacheHeaders(res, seconds = 1800, staleSeconds = 86400) {
  res.setHeader("Cache-Control", `public, s-maxage=${seconds}, stale-while-revalidate=${staleSeconds}`);
}

export function json(res, status, body) {
  res.status(status).json(body);
}

export function badRequest(res, message) {
  return json(res, 400, { error: message });
}

export function methodNotAllowed(res) {
  return json(res, 405, { error: "Method not allowed" });
}

export function serverError(res, message = "Internal server error") {
  return json(res, 500, { error: message });
}
