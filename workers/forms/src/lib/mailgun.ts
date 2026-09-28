/**
 * Mailgun EU client built on fetch + FormData.
 *
 * Deliberately not mailgun.js: that SDK depends on Node built-ins and form-data,
 * neither of which belongs in a Worker. The REST API is a single multipart POST,
 * so the SDK buys nothing here.
 */

export interface MailgunMessage {
  /** Envelope sender. Must be an address at the sending domain. */
  from: string;
  to: string;
  subject: string;
  text: string;
  /** Where a reply should go. Used to carry the visitor's address. */
  replyTo?: string;
}

export type MailgunResult = { ok: true } | { ok: false; status: number; detail: string };

const REQUEST_TIMEOUT_MS = 10_000;

export async function sendMessage(
  options: {
    apiKey: string;
    apiBase: string;
    domain: string;
  },
  message: MailgunMessage,
): Promise<MailgunResult> {
  const form = new FormData();
  form.set("from", message.from);
  form.set("to", message.to);
  form.set("subject", message.subject);
  // Plain text only. The previous handler also sent the message as `html`,
  // which rendered unescaped visitor input in the reader's mail client.
  form.set("text", message.text);
  if (message.replyTo !== undefined) {
    form.set("h:Reply-To", message.replyTo);
  }

  const endpoint = `${options.apiBase}/${encodeURIComponent(options.domain)}/messages`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        // btoa is fine: the key is ASCII.
        Authorization: `Basic ${btoa(`api:${options.apiKey}`)}`,
      },
      body: form,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    const detail = error instanceof Error ? error.name : "unknown";
    return { ok: false, status: 0, detail: `transport: ${detail}` };
  }

  if (response.ok) return { ok: true };

  // Mailgun's error bodies describe the request, never the credential, so this
  // is safe to surface in logs. Truncated anyway.
  const body = await response.text().catch(() => "");
  return { ok: false, status: response.status, detail: body.slice(0, 200) };
}
