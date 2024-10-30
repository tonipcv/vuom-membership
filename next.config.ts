import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/push/onesignal/:path*',
        destination: '/push/onesignal/:path*',
      },
    ];
  },
  /* outras opções de configuração aqui */
};

export default nextConfig;
