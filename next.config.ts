import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tailwind v4 via the Turbopack loader (as scaffolded by create-next-app).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    qualities: [60, 75, 90],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // Old aromeosayi.org URLs → new structure (PRD §9). 301 so search engines move rankings over.
  async redirects() {
    return [
      { source: "/invite-apostle", destination: "/invite", statusCode: 301 },
      { source: "/book-store", destination: "/books", statusCode: 301 },
      { source: "/book-store/:path*", destination: "/books", statusCode: 301 },
      { source: "/partnership", destination: "/partner", statusCode: 301 },
    ];
  },
};

export default nextConfig;
