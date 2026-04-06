# portfolio.trebeljahr.com

My personal portfolio site, built with Next.js 15, React 19, and Tailwind CSS.

**Live:** [portfolio.trebeljahr.com](https://portfolio.trebeljahr.com)

## Stack

- **Framework:** Next.js 15 (Pages Router)
- **UI:** React 19, Tailwind CSS 3, Framer Motion 11
- **Language:** TypeScript 5
- **PWA:** @ducanh2912/next-pwa
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
components/
  about/        # Bio, client logos, stats
  contact/      # Contact form (Mailgun)
  logos/         # SVG company logos (ESA, Klarna, Henkel, flowkey, Ironhack, Softgames)
  projects/     # Project grid and cards
  shared/       # Header, footer, banner
  layout/       # Page layout wrapper
data/
  projectsData.ts   # Project definitions
pages/
  index.tsx     # Home
  cv.tsx        # CV / resume
  api/contact.ts    # Contact form endpoint
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint + Prettier |
| `npm run analyze` | Bundle analysis |

## License

MIT
