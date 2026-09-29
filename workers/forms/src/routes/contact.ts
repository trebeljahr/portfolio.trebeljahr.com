import { isJsonContentType, jsonError, jsonSuccess, readBoundedBody } from "../lib/http";
import { sendTx } from "../lib/listmonk";
import { checkRateLimits } from "../lib/ratelimit";
import { trippedHoneypot, validateFields } from "../lib/validate";
import type { Env } from "../types";

/**
 * SES domain identity for this site: Easy DKIM, MAIL FROM
 * `bounce.mail.portfolio.trebeljahr.com`, DNS in the trebeljahr.com zone.
 */
const SENDING_DOMAIN = "mail.portfolio.trebeljahr.com";

/**
 * Fixed sender at the sending domain.
 *
 * The Next.js handler this replaces set `from: "<visitor name> <visitor email>"`.
 * That address is one we are not authorised to send for, so every message
 * failed SPF alignment at the receiver and had no valid DKIM signature for its
 * own From domain — it is exactly the shape of a spoof. Sending from the
 * domain we control keeps SPF and DKIM aligned; the visitor's address goes in
 * Reply-To, so hitting reply still reaches them.
 */
const FROM = `Portfolio Contact Form <noreply@${SENDING_DOMAIN}>`;
const TO = "ricotrebeljahr@gmail.com";

/** Tagged so a shared inbox stays readable once other sites use this Worker. */
const SUBJECT_PREFIX = "[portfolio]";

const MAX_BODY_BYTES = 16 * 1024;

const HONEYPOT_FIELD = "company";

const FIELDS = {
  name: { maxLength: 100 },
  from: { maxLength: 254, email: true },
  subject: { maxLength: 200 },
  text: { maxLength: 5_000, singleLine: false },
} as const;

export async function handleContact(
  request: Request,
  env: Env,
  _ctx: ExecutionContext,
): Promise<Response> {
  // Cheap checks first, so abuse never reaches body parsing or Listmonk.
  const rate = await checkRateLimits(
    request,
    { ip: env.RATE_LIMIT_IP, global: env.RATE_LIMIT_GLOBAL },
    "contact",
  );
  if (!rate.allowed) {
    console.warn(`contact: rate limited (${rate.scope})`);
    return jsonError(429, "Too many messages from this address. Try again in a minute.", {
      "Retry-After": "60",
    });
  }

  if (!isJsonContentType(request.headers.get("content-type"))) {
    return jsonError(415, "Content-Type must be application/json.");
  }

  const raw = await readBoundedBody(request, MAX_BODY_BYTES);
  if (raw === null) {
    return jsonError(413, "Message is too large.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return jsonError(400, "Request body is not valid JSON.");
  }

  // Answer a bot exactly as we answer a human, so it learns nothing.
  if (trippedHoneypot(parsed, HONEYPOT_FIELD)) {
    console.warn("contact: honeypot tripped");
    return jsonSuccess("Sent email, all good");
  }

  const validated = validateFields(parsed, FIELDS);
  if (!validated.ok) {
    return jsonError(400, validated.reason);
  }
  const { name, from, subject, text } = validated.value;

  const apiToken = env.LISTMONK_API_TOKEN;
  if (apiToken === undefined || apiToken === "") {
    console.error("contact: LISTMONK_API_TOKEN is not set on this Worker");
    return jsonError(503, "The contact form is temporarily unavailable.");
  }

  const result = await sendTx(
    {
      baseUrl: env.LISTMONK_URL,
      apiUser: env.LISTMONK_API_USER,
      apiToken,
      templateId: env.LISTMONK_TX_TEMPLATE_ID,
    },
    {
      from: FROM,
      to: TO,
      subject: `${SUBJECT_PREFIX} ${subject}`,
      text: `From: ${name} <${from}>\n\n${text}`,
      replyTo: { name, email: from },
    },
  );

  if (!result.ok) {
    // Status and Listmonk's own message only — never the token, never the payload.
    console.error(`contact: listmonk rejected (status=${result.status}) ${result.detail}`);
    return jsonError(502, "Could not send the message right now. Please try again later.");
  }

  return jsonSuccess("Sent email, all good");
}
