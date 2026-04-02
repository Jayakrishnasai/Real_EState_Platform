import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { hostname: 'images.pexels.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'me7aitdbxq.ufs.sh' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to Express backend
      },
    ];
  },
};

export default nextConfig;
