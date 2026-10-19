# portfolio.trebeljahr.com

My personal portfolio site, built with Next.js 16, React 19, and Tailwind CSS.

**Live:** [portfolio.trebeljahr.com](https://portfolio.trebeljahr.com)

## Stack

- **Framework:** Next.js 16 (Pages Router), static export (`output: "export"`)
- **UI:** React 19, Tailwind CSS 3, Framer Motion 11
- **Language:** TypeScript 5
- **PWA:** @ducanh2912/next-pwa
- **Deployment:** Cloudflare Workers Static Assets
- **Forms:** shared `forms-api` Worker (see [`workers/forms`](workers/forms/README.md))

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3801](http://localhost:3801).

## Project Structure

```
components/
  about/        # Bio, client logos, stats
  contact/      # Contact form (posts to the forms Worker)
  logos/         # SVG company logos (ESA, Klarna, Henkel, flowkey, Ironhack, Softgames)
  projects/     # Project grid and cards
  shared/       # Header, footer, banner
  layout/       # Page layout wrapper
data/
  projectsData.ts   # Project definitions
pages/
  index.tsx     # Home
  cv.tsx        # CV / resume
  imprint.tsx   # Legal notice
  privacy.tsx   # Every host the browser contacts and every key it stores
workers/
  forms/        # Shared forms Worker — deployed separately, not part of the site build
```

## Configuration

Copy `.env.example` to `.env.local`. Every `NEXT_PUBLIC_*` value is inlined into
the static export at build time, so changing one needs a rebuild and redeploy.

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | `https://forms-api.ricoslabs.workers.dev/contact` | Absolute URL of the contact form endpoint |

## Contact form

The static export ships no API routes, so the form posts to the shared
`forms-api` Worker instead of a local `/api/contact`. That Worker holds the
Listmonk credential, validates and rate-limits submissions, and is deployed on
its own — `npm run build` does not touch it.

The origin the form is served from must be in the Worker's allowlist
(`workers/forms/src/lib/cors.ts`), including `localhost` for development.

Setup and deployment: [`workers/forms/README.md`](workers/forms/README.md).

## Privacy page

`/privacy` names every host a visitor's browser contacts and everything the site
stores in the browser. A new third-party request (script, font, image, embed,
`fetch` call), a new storage key, or another host in `NEXT_PUBLIC_CONTACT_ENDPOINT`
updates `pages/privacy.tsx` and its `UPDATED_ON` in the same change.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run Biome |
| `npm run analyze` | Bundle analysis |

## License

MIT
