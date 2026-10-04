const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // `_headers` is Cloudflare config, not a served file: precaching it 404s and
  // aborts the service worker install. Setting this replaces the default, so
  // `noprecache` is listed again.
  publicExcludes: ["!noprecache/**/*", "!_headers", "!_redirects"],
  workboxOptions: {
    // The plugin's defaults, plus dynamic-css-manifest.json: newer Next.js emits
    // it as a build-only file that `output: "export"` never ships, and the
    // plugin's own filter predates it.
    exclude: [
      /\/_next\/static\/.*(?<!\.p)\.woff2/,
      /\.map$/,
      /^manifest.*\.js$/,
      /dynamic-css-manifest\.json$/,
    ],
  },
});

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = [withPWA, withBundleAnalyzer].reduce(
  (config, plugin) => plugin(config),
  nextConfig,
);
