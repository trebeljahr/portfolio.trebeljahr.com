// The screenshots of portfolio.trebeljahr.com, shared by capture-screenshots.mjs
// and write-manifest.mjs.
export const baseUrl = (process.env.BASE_URL ?? "https://portfolio.trebeljahr.com").replace(
  /\/$/,
  "",
);

const desktop = { width: 1600, height: 1000 };
const mobile = { width: 390, height: 844 };

// theme: hooks/useThemeSwitcher.tsx reads localStorage "theme".
// css: injected before the capture; hides the floating back-to-top button.
const hideToTop = ".scrollToTop { display: none !important; }";
export const shots = [
  { name: "home-light", path: "/", viewport: desktop, theme: "light" },
  { name: "home-dark", path: "/", viewport: desktop, theme: "dark" },
  // Scrolled so the section heading sits near the top and the cards show.
  {
    name: "projects-light",
    path: "/",
    viewport: desktop,
    theme: "light",
    scrollTo: "h2:has-text('Projects portfolio')",
    css: hideToTop,
  },
  { name: "home-mobile-light", path: "/", viewport: mobile, theme: "light", mobile: true },
];
