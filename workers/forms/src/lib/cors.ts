/**
 * Origin allowlist for the shared forms Worker.
 *
 * Never `*`: this endpoint sends mail, so any origin that can reach it can
 * make Rico's domain send mail on its behalf. Grouped per site so adding
 * ricos.site's newsletter or collection-of-beauty's subscribe endpoint is a
 * one-line change here plus a new route module.
 */
const ORIGINS_BY_SITE: Record<string, readonly string[]> = {
  portfolio: ["https://portfolio.trebeljahr.com", "https://portfolio.ricoslabs.workers.dev"],
  // Dev servers. Only loopback — a public origin would defeat the allowlist.
  local: [
    "http://localhost:3801",
    "http://localhost:3000",
    "http://127.0.0.1:3801",
    "http://127.0.0.1:3000",
  ],
  // Reserved for the next two consumers. Uncomment when their routes land.
  // "ricos-site": ["https://ricos.site", "https://www.ricos.site"],
  // "collection-of-beauty": ["https://collectionofbeauty.com"],
};

const ALLOWED_ORIGINS = new Set(Object.values(ORIGINS_BY_SITE).flat());

export function isAllowedOrigin(origin: string | null): origin is string {
  return origin !== null && ALLOWED_ORIGINS.has(origin);
}

/**
 * CORS response headers for an already-validated origin. `Vary: Origin` keeps
 * Cloudflare's cache from serving one site's allowance to another.
 */
export function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    Vary: "Origin",
  };
}

export function preflightHeaders(origin: string): Record<string, string> {
  return {
    ...corsHeaders(origin),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}
