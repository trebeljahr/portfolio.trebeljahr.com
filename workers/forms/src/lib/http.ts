const JSON_TYPE = "application/json; charset=utf-8";

/** Success shape the existing contact form already understands. */
export function jsonSuccess(message: string, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify({ success: message }), {
    status: 200,
    headers: { "Content-Type": JSON_TYPE, ...headers },
  });
}

/**
 * Error shape the existing contact form already understands.
 *
 * `message` is always a fixed string chosen by this Worker. Caller input is
 * never interpolated in, so the response can never reflect submitted data back
 * to a third party.
 */
export function jsonError(
  status: number,
  message: string,
  headers: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": JSON_TYPE, ...headers },
  });
}

/**
 * Reads at most `maxBytes` from the request body. Returns null when the body
 * is, or claims to be, larger. Reading from the stream rather than
 * `request.text()` means a chunked request with no Content-Length cannot make
 * the Worker buffer an arbitrary amount before the check runs.
 */
export async function readBoundedBody(request: Request, maxBytes: number): Promise<string | null> {
  const declared = request.headers.get("content-length");
  if (declared !== null) {
    const length = Number(declared);
    if (!Number.isFinite(length) || length < 0 || length > maxBytes) return null;
  }

  const body = request.body;
  if (body === null) return "";

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}

/** True for `application/json`, with or without parameters. */
export function isJsonContentType(header: string | null): boolean {
  if (header === null) return false;
  const [type] = header.split(";");
  return type !== undefined && type.trim().toLowerCase() === "application/json";
}
