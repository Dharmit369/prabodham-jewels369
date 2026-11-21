import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 90 is used by the hero background image for sharper output
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      // Compile Tailwind CSS v4 utilities (relative, min-h-[...], aspect-square, etc.)
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
