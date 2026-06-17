import type { Metadata } from 'next';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import localFont from 'next/font/local';
import { Noto_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['mn', 'en'];

// Фонтын зам - [locale] folder доторх тул ../../../public
const mogulHelios = localFont({
  src: '../../../public/fonts/Mogul Helios.ttf', 
  variable: '--font-mogul',
  fallback: ['Inter', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

const notoSans = Noto_Sans({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Төрийн удирдлага',
  description: 'Монгол arXiv өгүүлэл хайгч',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Хэл буруу бол 404
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${mogulHelios.variable} ${notoSans.className}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}