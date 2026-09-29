/**
 * Listmonk transactional client (`POST /api/tx`) built on fetch.
 *
 * All of Rico's mail goes through the self-hosted Listmonk, which relays via
 * Amazon SES eu-west-1. Listmonk answers 200 once the message is queued, before
 * SMTP runs, so an SES rejection after that point never reaches this client. It
 * shows only in Listmonk → Settings → Logs.
 *
 * Checked against Listmonk v6.0.0 (`cmd/tx.go`, `models/messages.go`) and the
 * smtppool v2.0.1 header writer it sends through.
 */

export interface TxMessage {
  /** Sender. Must be an address at an SES-verified domain. */
  from: string;
  to: string;
  subject: string;
  /** Sent as text/plain. */
  text: string;
  /** Where a reply should go. Used to carry the visitor's address. */
  replyTo?: { name: string; email: string };
}

export type TxResult = { ok: true } | { ok: false; status: number; detail: string };

const REQUEST_TIMEOUT_MS = 10_000;

export async function sendTx(
  options: {
    baseUrl: string;
    apiUser: string;
    apiToken: string;
    /** A tx template with subject `{{ .Tx.Data.subject }}` and body `{{ .Tx.Data.body | Safe }}`. */
    templateId: number;
  },
  message: TxMessage,
): Promise<TxResult> {
  const headers: Record<string, string>[] = [];
  const replyTo =
    message.replyTo === undefined
      ? undefined
      : formatReplyTo(message.replyTo.name, message.replyTo.email);
  if (replyTo !== undefined) {
    headers.push({ "Reply-To": replyTo });
  }

  const body = {
    subscriber_email: message.to,
    // The default mode only sends to existing subscribers and answers 400 for
    // anyone else. `external` sends to the address as given.
    subscriber_mode: "external",
    template_id: options.templateId,
    from_email: message.from,
    // Subject and body travel as template data, never as the top-level
    // `subject` field: Listmonk compiles a `subject` containing `{{` as a Go
    // template, which would let a visitor put template actions in it.
    data: { subject: message.subject, body: message.text },
    // Plain text only. The passthrough template emits the body unescaped, so
    // `html` would render visitor input in the reader's mail client.
    content_type: "plain",
    headers,
  };

  const endpoint = `${options.baseUrl.replace(/\/+$/, "")}/api/tx`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        // btoa is fine: the user name and token are ASCII.
        Authorization: `Basic ${btoa(`${options.apiUser}:${options.apiToken}`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    const detail = error instanceof Error ? error.name : "unknown";
    return { ok: false, status: 0, detail: `transport: ${detail}` };
  }

  if (response.ok) return { ok: true };

  // Listmonk's error bodies describe the request, never the credential, so
  // this is safe to surface in logs. Truncated anyway.
  const text = await response.text().catch(() => "");
  return { ok: false, status: response.status, detail: text.slice(0, 200) };
}

const PRINTABLE_ASCII = /^[\x20-\x7e]*$/;

/** 45 bytes encode to 60 base64 characters, which keeps each word within RFC 2047's 75. */
const MAX_WORD_BYTES = 45;

/**
 * A Reply-To value that survives smtppool's header writer.
 *
 * smtppool Q-encodes any header value holding a non-ASCII character as one
 * encoded-word, address included, which leaves a Reply-To no client can parse.
 * So the value is made pure ASCII here: an ASCII display name is quoted, any
 * other name becomes RFC 2047 encoded-words. A non-ASCII address cannot be
 * saved that way, so it gets no Reply-To; the body still carries it.
 */
function formatReplyTo(name: string, email: string): string | undefined {
  if (!PRINTABLE_ASCII.test(email)) return undefined;
  const display = PRINTABLE_ASCII.test(name)
    ? `"${name.replace(/[\\"]/g, "\\$&")}"`
    : encodeWords(name);
  return `${display} <${email}>`;
}

function encodeWords(text: string): string {
  const encoder = new TextEncoder();
  const words: string[] = [];
  let chunk: number[] = [];

  // Iterating a string yields code points, so a word never splits a character.
  for (const char of text) {
    const bytes = encoder.encode(char);
    if (chunk.length + bytes.length > MAX_WORD_BYTES) {
      words.push(encodedWord(chunk));
      chunk = [];
    }
    chunk.push(...bytes);
  }
  if (chunk.length > 0) words.push(encodedWord(chunk));

  return words.join(" ");
}

function encodedWord(bytes: number[]): string {
  return `=?UTF-8?B?${btoa(String.fromCharCode(...bytes))}?=`;
}
