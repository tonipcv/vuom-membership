/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minios3-minio.dpbdp1.easypanel.host',
        port: '',
        pathname: '/katsu/news/**',
      },
    ],
    domains: ['www.facebook.com'],
    unoptimized: true,
  },
  reactStrictMode: true,
  experimental: {
    serverExternalPackages: ['@prisma/client'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 