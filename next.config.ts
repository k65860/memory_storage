import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "axtxiyzjmoenznxnmtct.supabase.co",
      },
      {
        protocol: "https",
        hostname: "ilovecharacter.com",
      },
    ],
  },
};

export default nextConfig;
