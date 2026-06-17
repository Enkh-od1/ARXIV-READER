import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['mn', 'en'],
  defaultLocale: 'mn',
  localePrefix: 'always',
  localeDetection: false  // ← ЭНЭ ХЭСГИЙГ НЭМНЭ
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};