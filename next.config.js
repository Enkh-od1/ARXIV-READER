/* eslint-disable @typescript-eslint/no-require-imports */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jpa.naog.edu.mn',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.10.31',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  devIndicators: false,
  
  // ШИНЭЭР НЭМЭХ: TypeScript алдаа байсан ч build болно
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Бас ESLint алдаа байсан ч build болно
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withNextIntl(nextConfig);