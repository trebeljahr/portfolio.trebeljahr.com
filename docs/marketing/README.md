# Marketing images

Screenshots and GitHub social preview options for portfolio.trebeljahr.com. The README embeds the screenshots from here. `manifest.json` lists every file with its pixel size, bytes, SHA-256, source and date.

All screenshots are real captures of the live site (https://portfolio.trebeljahr.com, read-only), taken on 2026-11-06 with headless Playwright Chromium at device scale factor 2.

## Screenshots

| File | Shows | Pixels |
| --- | --- | --- |
| `screenshots/home-light.jpg` | Home page, light theme (README hero) | 3200×2000 |
| `screenshots/home-dark.jpg` | Home page, dark theme | 3200×2000 |
| `screenshots/projects-light.jpg` | Home page scrolled to "Projects portfolio" | 3200×2000 |
| `screenshots/home-mobile-light.jpg` | Home page on a 390×844 phone viewport | 780×1688 |

## Social preview

GitHub's repository card: 1280×640 PNG, under 1 MB, text inside a 64 px margin. All three come from `social-preview/template.html` (`?v=a|b|c`), set in the site's own General Sans (`public/fonts/`) with the pencil mark from `components/logos/Logo.tsx` and the colours from `tailwind.config.js`.

| File | Option |
| --- | --- |
| `social-preview/social-preview-a.png` | A: screenshot-led, light. Name and role on the left, the home page on the right. |
| `social-preview/social-preview-b.png` | B: typographic, dark navy (`primary-dark`) with the indigo mark. |
| `social-preview/social-preview-c.png` | C: mosaic of nine project screenshots from `public/images/`, name on a dark scrim. |

## Regenerate

Playwright is not a dependency of this repo. `npx` fetches it for one run:

```bash
npx -y playwright@1.64.0 install chromium      # once
npx -y -p playwright@1.64.0 -c 'node scripts/marketing/capture-screenshots.mjs'
npx -y -p playwright@1.64.0 -c 'node scripts/marketing/render-social-preview.mjs'
node scripts/marketing/write-manifest.mjs
```

- `capture-screenshots.mjs --only=home-light` captures a subset. `BASE_URL=http://127.0.0.1:<port>` captures a local build instead of the live site.
- `render-social-preview.mjs --review=<file.jpg>` also writes a sheet with A, B and C side by side.
- The shot list (page, viewport, theme, scroll target) is in `scripts/marketing/shots.mjs`.
