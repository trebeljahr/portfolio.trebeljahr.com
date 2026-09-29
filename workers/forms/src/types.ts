/**
 * Minimal structural type for the native Workers rate limiting binding.
 * Declared locally rather than imported so the Worker does not depend on a
 * particular @cloudflare/workers-types release exposing `RateLimit`.
 */
export interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface Env {
  /** Self-hosted Listmonk. It relays through Amazon SES eu-west-1. */
  LISTMONK_URL: string;
  /** Listmonk API user whose role grants only `tx:send`. */
  LISTMONK_API_USER: string;
  /**
   * Set out of band, never committed:
   *   npx wrangler secret put LISTMONK_API_TOKEN
   */
  LISTMONK_API_TOKEN?: string;
  /** Plain-text passthrough tx template, `forms-api-tx` in Listmonk. */
  LISTMONK_TX_TEMPLATE_ID: number;
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
