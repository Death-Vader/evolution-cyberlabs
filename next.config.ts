import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // <--- Enables static export for GitHub Pages
  images: {
    unoptimized: true,   // <--- Prevents image errors on GitHub Pages
  },
};

export default nextConfig;