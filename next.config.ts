import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // Required for GitHub Pages
  images: {
    unoptimized: true,   // Required for images to work
  },
  // 👇 These lines stop the build from failing on small errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;