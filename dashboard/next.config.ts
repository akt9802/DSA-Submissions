import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Run lint separately: npm run lint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
