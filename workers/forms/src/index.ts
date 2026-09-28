import { corsHeaders, isAllowedOrigin, preflightHeaders } from "./lib/cors";
import { jsonError } from "./lib/http";
import type { Env, RouteHandler } from "./types";

/**
 * Shared form-handling Worker.
 *
 * One route per form endpoint; everything reusable lives in src/lib. Adding
 * ricos.site's newsletter signup or collection-of-beauty's subscribe endpoint
 * means a new module under src/routes, an entry in ROUTES, and that site's
 * origins in src/lib/cors.ts.
 */
const ROUTES: Record<string, Partial<Record<string, RouteHandler>>> = {};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get("origin");

    // Browser-only endpoint: an allowed Origin is required on every request,
    // including the preflight. Requests without one get nothing back.
    if (!isAllowedOrigin(origin)) {
      return jsonError(403, "Origin not allowed.");
    }

    const { pathname } = new URL(request.url);
    const methods = ROUTES[pathname];

    if (request.method === "OPTIONS") {
      if (methods === undefined) return jsonError(404, "Not found.", corsHeaders(origin));
      return new Response(null, { status: 204, headers: preflightHeaders(origin) });
    }

    if (methods === undefined) {
      return jsonError(404, "Not found.", corsHeaders(origin));
    }

    const handler = methods[request.method];
    if (handler === undefined) {
      const allowed = [...Object.keys(methods), "OPTIONS"].join(", ");
      return jsonError(405, "Method not allowed.", {
        ...corsHeaders(origin),
        Allow: allowed,
      });
    }

    // A handler that throws would otherwise produce an opaque 500 with no CORS
    // headers, which the form sees only as a network failure.
    let response: Response;
    try {
      response = await handler(request, env, ctx);
    } catch (error) {
      console.error(`unhandled error on ${pathname}:`, error);
      response = jsonError(500, "Something went wrong.");
    }

    // CORS headers belong on error responses too, or the browser hides the
    // body and the form can only report a generic failure.
    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(corsHeaders(origin))) {
      headers.set(key, value);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<Env>;
