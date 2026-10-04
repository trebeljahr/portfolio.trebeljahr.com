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
