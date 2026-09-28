/**
 * Minimal structural type for the native Workers rate limiting binding.
 * Declared locally rather than imported so the Worker does not depend on a
 * particular @cloudflare/workers-types release exposing `RateLimit`.
 */
export interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface Env {
  /**
   * Set out of band, never committed:
   *   npx wrangler secret put MAILGUN_API_KEY
   */
  MAILGUN_API_KEY?: string;
  /** Mailgun API base. EU region for every domain Rico sends from. */
  MAILGUN_REGION_BASE: string;
  RATE_LIMIT_IP: RateLimiter;
  RATE_LIMIT_GLOBAL: RateLimiter;
}

export type RouteHandler = (request: Request, env: Env, ctx: ExecutionContext) => Promise<Response>;
