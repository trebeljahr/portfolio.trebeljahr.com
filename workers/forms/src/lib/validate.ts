/**
 * Field validation shared by every form route.
 *
 * Two rules matter beyond length:
 *   1. Single-line fields reject control characters. Anything that ends up in
 *      a mail header (Reply-To, Subject) must not be able to carry CR/LF and
 *      inject headers of its own.
 *   2. Failures name the offending field but never quote its value, so a
 *      response can never echo submitted input.
 */

// biome-ignore lint/suspicious/noControlCharactersInRegex: matching control characters is the point — they must not reach a mail header.
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;
/** Same, but tolerating \t \n \r inside multi-line bodies. */
// biome-ignore lint/suspicious/noControlCharactersInRegex: matching control characters is the point — they must not reach a mail header.
const CONTROL_CHARS_MULTILINE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

/**
 * Deliberately stricter than RFC 5322: no quoted local parts, no comments, no
 * address-list separators. Everything this rejects is something we do not want
 * to place in a Reply-To header anyway.
 */
const EMAIL =
  /^[^\s@,;:<>()[\]\\"]+@[^\s@,;:<>()[\]\\".]+(\.[^\s@,;:<>()[\]\\".]+)*\.[a-zA-Z]{2,}$/;

export interface FieldSpec {
  maxLength: number;
  /** Reject CR/LF and other control characters. Default true. */
  singleLine?: boolean;
  /** Additionally require a valid email address. Default false. */
  email?: boolean;
}

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; field: string; reason: string };

/**
 * Validates and trims the named fields of a parsed JSON body.
 * Unknown keys are ignored rather than rejected, so a site can post extra
 * fields (a honeypot, a form id) without a Worker change.
 */
export function validateFields<K extends string>(
  body: unknown,
  specs: Record<K, FieldSpec>,
): ValidationResult<Record<K, string>> {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, field: "body", reason: "Request body must be a JSON object." };
  }

  const source = body as Record<string, unknown>;
  const out = {} as Record<K, string>;

  for (const key of Object.keys(specs) as K[]) {
    const spec = specs[key];
    const raw = source[key];

    if (typeof raw !== "string") {
      return { ok: false, field: key, reason: `Field "${key}" is required and must be text.` };
    }

    const value = raw.trim();
    if (value.length === 0) {
      return { ok: false, field: key, reason: `Field "${key}" must not be empty.` };
    }
    if (value.length > spec.maxLength) {
      return {
        ok: false,
        field: key,
        reason: `Field "${key}" must be at most ${spec.maxLength} characters.`,
      };
    }

    const singleLine = spec.singleLine !== false;
    const forbidden = singleLine ? CONTROL_CHARS : CONTROL_CHARS_MULTILINE;
    if (forbidden.test(value)) {
      return { ok: false, field: key, reason: `Field "${key}" contains invalid characters.` };
    }

    if (spec.email === true && !EMAIL.test(value)) {
      return { ok: false, field: key, reason: `Field "${key}" must be a valid email address.` };
    }

    out[key] = value;
  }

  return { ok: true, value: out };
}

/**
 * Honeypot check. A field real users never see and never fill; bots that
 * autofill every input trip it. Returns true when the submission should be
 * silently dropped.
 */
export function trippedHoneypot(body: unknown, field: string): boolean {
  if (typeof body !== "object" || body === null) return false;
  const value = (body as Record<string, unknown>)[field];
  return typeof value === "string" && value.trim().length > 0;
}
