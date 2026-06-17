import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// i18n.ts файлын зам
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // өөрийн бусад тохиргоонууд энд (image domains гэх мэт)
};

export default withNextIntl(nextConfig);