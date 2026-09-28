import type { RateLimiter } from "../types";

/**
 * Rate limiting: native binding, not a KV counter.
 *
 * KV was the obvious alternative — a counter per IP with a TTL — and it buys
 * a globally shared view plus arbitrary window lengths. It loses on three
 * counts that matter for a public mail endpoint on the free plan:
 *
 *   - Every request needs a read and a write. The free tier allows 1,000 KV
 *     writes per day, so the rate limiter itself becomes the thing that falls
 *     over first under the abuse it exists to stop.
 *   - KV is eventually consistent with a ~60s edge cache, so the "global"
 *     view it promises is not actually there during a burst.
 *   - Two extra round trips on every legitimate submission.
 *
 * The native binding costs nothing, adds no I/O, and is accurate enough. Its
 * one real drawback is that limits are counted per Cloudflare location, so a
 * distributed flood gets its allowance multiplied by the number of colos it
 * reaches. That is what the second, coarser limiter is for: it caps how much
 * any one location can emit regardless of how many source addresses it sees.
 */

export interface RateLimitOutcome {
  allowed: boolean;
  /** Which limiter rejected, for logging. Never sent to the client. */
  scope?: "ip" | "global";
}

export function clientKey(request: Request): string {
  // CF-Connecting-IP is set by the edge and cannot be spoofed by the client.
  return request.headers.get("cf-connecting-ip") ?? "unknown";
}

export async function checkRateLimits(
  request: Request,
  limiters: { ip: RateLimiter; global: RateLimiter },
  routeName: string,
): Promise<RateLimitOutcome> {
  const perIp = await limiters.ip.limit({ key: `${routeName}:${clientKey(request)}` });
  if (!perIp.success) return { allowed: false, scope: "ip" };

  const perRoute = await limiters.global.limit({ key: routeName });
  if (!perRoute.success) return { allowed: false, scope: "global" };

  return { allowed: true };
}
