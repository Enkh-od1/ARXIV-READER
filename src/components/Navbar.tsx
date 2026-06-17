"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(mn|en)/, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <nav 
      className="text-white shadow-lg sticky top-0 z-50" 
      style={{ backgroundColor: '#003d71' }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href={`/${locale}`} className="text-2xl font-bold flex items-center gap-3">
              <Image 
                src="/logo_back.png" 
                alt="Logo" 
                width={75}
                height={75}
                className="object-contain"
              />
              <span className="font-mogul text-2xl font-bold italic">
                {t('siteTitle')}
              </span>
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            <li><Link href={`/${locale}/home`} className="hover:text-blue-200 transition">{t('home')}</Link></li>
            <li><Link href={`/${locale}/about`} className="hover:text-blue-200 transition">{t('about')}</Link></li>
            <li><Link href={`/${locale}/editorial`} className="hover:text-blue-200 transition">{t('editorial')}</Link></li>
            <li><Link href={`/${locale}/archive`} className="hover:text-blue-200 transition">{t('archive')}</Link></li>
            <li><Link href={`/${locale}/for-authors`} className="hover:text-blue-200 transition">{t('forAuthors')}</Link></li>
            <li><Link href={`/${locale}/contact`} className="hover:text-blue-200 transition">{t('contact')}</Link></li>
          </ul>

          {/* Хэл солих товч */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => switchLanguage('mn')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                locale === 'mn' 
                  ? 'bg-white text-blue-900 font-bold shadow-md' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Image 
                src="/flags/mn.svg" 
                alt="Монгол" 
                width={20} 
                height={14}
                className="rounded-sm shadow-sm"
              />
              <span className="text-sm font-semibold">MN</span>
            </button>
            
            {/* EN товч — түр идэвхгүй */}
            <button
              onClick={() => {}}
              disabled
              className="flex items-center gap-2 px-3 py-1.5 rounded-full opacity-40 cursor-not-allowed text-white"
            >
              <Image 
                src="/flags/gb.svg" 
                alt="English" 
                width={20} 
                height={14}
                className="rounded-sm shadow-sm"
              />
              <span className="text-sm font-semibold">EN</span>
            </button>
          </div>

        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <ul className="lg:hidden mt-6 flex flex-col gap-4">
            <li><Link href={`/${locale}/home`} className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link></li>
            <li><Link href={`/${locale}/about`} className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>{t('about')}</Link></li>
            <li><Link href={`/${locale}/editorial`} className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>{t('editorial')}</Link></li>
            <li><Link href={`/${locale}/archive`} className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>{t('archive')}</Link></li>
            <li><Link href={`/${locale}/for-authors`} className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>{t('forAuthors')}</Link></li>
            <li><Link href={`/${locale}/contact`} className="block py-2 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>{t('contact')}</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}
