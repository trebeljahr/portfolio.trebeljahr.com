# forms-api

Shared form-handling Cloudflare Worker for Rico's static sites.

The sites are static exports on Workers Static Assets, so they cannot run
server code and cannot hold a secret. Anything that needs one — sending mail,
talking to a newsletter backend — lives here instead. This Worker is deployed
separately from any site and is not part of the portfolio build.

**Live:** `https://forms-api.ricoslabs.workers.dev`

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/contact` | portfolio.trebeljahr.com contact form → email via Listmonk and SES |
| `OPTIONS` | `/contact` | CORS preflight |

### `POST /contact`

Request — `Content-Type: application/json`, max 16 KiB:

```json
{
  "name": "Ada Lovelace",
  "from": "ada@example.com",
  "subject": "Hello",
  "text": "Message body",
  "company": ""
}
```

`company` is an optional honeypot. Real users never see the field; a filled one
is answered with a normal success response and no mail is sent.

Responses:

```json
{ "success": "Sent email, all good" }
{ "error": "…" }
```

| Status | Meaning |
|---|---|
| `200` | Accepted (or silently dropped by the honeypot) |
| `400` | Malformed JSON, missing field, bad email, field too long |
| `403` | Origin not in the allowlist, or absent |
| `404` / `405` | Unknown path / wrong method |
| `413` | Body over 16 KiB |
| `415` | `Content-Type` is not `application/json` |
| `429` | Rate limited — `Retry-After: 60` |
| `502` | Listmonk rejected the message or was unreachable |
| `503` | `LISTMONK_API_TOKEN` is not set |

Error messages name the offending field but never quote its value, so the
response cannot reflect submitted input back at a third party.

## Setup

Mail goes out through the self-hosted Listmonk at
`https://listmonk.trebeljahr.com` (`POST /api/tx`), which relays via Amazon SES
eu-west-1. The Worker needs two things in Listmonk:

- **Tx template `forms-api-tx`** (id 15): subject `{{ .Tx.Data.subject }}`,
  body `{{ .Tx.Data.body | Safe }}` and nothing else. The Worker sends
  `content_type: "plain"`, so an HTML wrapper would arrive as visible markup.
- **API user `forms-api`** on a role that grants only `tx:send`. That is the
  one permission `/api/tx` checks.

URL, user name and template id are plain `vars` in `wrangler.jsonc`. The API
token is a secret. It is never in this repo, in `wrangler.jsonc`, or in a log
line. Set it once per Worker:

```bash
npx wrangler secret put LISTMONK_API_TOKEN
```

Then deploy:

```bash
npx wrangler deploy
```

For local development, put the token in `.dev.vars` (gitignored) and run
`npx wrangler dev`.

## Mail behaviour

Messages are sent from `noreply@mail.portfolio.trebeljahr.com`. That domain is
an SES identity with Easy DKIM and the custom MAIL FROM
`bounce.mail.portfolio.trebeljahr.com`, so SPF and DKIM both align with the
From address. The visitor's address goes in `Reply-To`, so replying reaches
them. Sending *from* the visitor's address — which the previous Next.js handler
did — fails SPF alignment and has no valid DKIM signature for its own `From`
domain, which is what a spoofed message looks like to a receiver.

Messages are plain text only. The previous handler also sent the body as
`html`, rendering unescaped visitor input in the reader's mail client.

The visitor's subject is passed as template data, never as `/api/tx`'s own
`subject` field: Listmonk compiles a `subject` that contains `{{` as a Go
template.

Listmonk answers `200` once the message is queued, before SMTP runs. A `200`
from this Worker therefore means "accepted by Listmonk", not "delivered". An
SES rejection after that point shows only in Listmonk → Settings → Logs.

SES is still in its sandbox, so it only delivers to verified addresses. The
contact form's one recipient is verified.

## Abuse protection

Native Workers rate limiting, not a KV counter:

- **Per IP:** 3 requests per 60s
- **Per route:** 30 requests per 60s

KV would give a globally shared counter and arbitrary window lengths, but every
request would need a read plus a write. The free tier allows 1,000 KV writes a
day, so the limiter would be the first thing to fall over under the abuse it
exists to prevent — and KV's ~60s edge cache means the "global" view is not
actually there during a burst. The native binding costs no I/O and no quota.

Its tradeoff: limits are counted **per Cloudflare location**, so a distributed
flood multiplies its allowance by the number of colos it reaches. The second,
coarser limiter caps how much any one location can emit regardless of source
address.

No CAPTCHA.

## Adding another site

1. Add the site's origins to `ORIGINS_BY_SITE` in `src/lib/cors.ts`.
2. Add a module under `src/routes/`.
3. Register it in `ROUTES` in `src/index.ts`.
4. Add any new secret with `npx wrangler secret put <NAME>`.

Everything reusable — CORS, bounded body reads, field validation, rate
limiting, the Listmonk client — already lives in `src/lib/`.

## Layout

```
src/
  index.ts          # router, CORS gate, error boundary
  types.ts          # Env bindings
  lib/
    cors.ts         # origin allowlist, preflight
    http.ts         # JSON responses, bounded body read
    validate.ts     # field specs, email check, honeypot
    ratelimit.ts    # native binding wrapper
    listmonk.ts     # Listmonk /api/tx via fetch
    mailgun.ts      # unused; removed once Listmonk delivery is confirmed
  routes/
    contact.ts      # POST /contact
```
