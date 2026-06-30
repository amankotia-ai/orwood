import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root — parent folders contain stray lockfiles.
  outputFileTracingRoot: __dirname,
  // posthog-js is browser-only; exclude it from the server bundle to prevent
  // the "__webpack_modules__[moduleId] is not a function" SSR error in dev mode.
  serverExternalPackages: ["posthog-js"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
