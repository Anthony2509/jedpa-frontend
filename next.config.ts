import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // Every screen in app/(app) waits for AuthGuard to check the session in the browser (the
    // token is not in a cookie), so the server never renders them and the default validation
    // reports each page as "dropped". Only segments that export `instant` are validated.
    instantInsights: {
      validationLevel: "manual-warning",
    },
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
