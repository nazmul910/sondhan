import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dashboard.shondan.org",
      },
      {
        protocol: "https",
        hostname: "health.thesyndicates.team",
        pathname: "/storage/uploads/doctors/**",
      },
      {
        protocol: "http",
        hostname: "dashboard.shondan.org",
      },
      {
        protocol: "http",
        hostname: "health-app.test",
      },
      {
        protocol: "https",
        hostname: "health-app.test",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
