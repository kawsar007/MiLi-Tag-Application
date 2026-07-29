import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma's generated client relies on native bindings — keep it (and bcrypt,
  // which also ships a native path) out of the server bundle instead of
  // letting Next try to bundle them.
  serverExternalPackages: ["@prisma/client", "bcryptjs"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;