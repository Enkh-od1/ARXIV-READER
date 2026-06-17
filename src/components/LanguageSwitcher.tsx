'use client';
import {useRouter, usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(mn|en)/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => switchLanguage('mn')}
        className={currentLocale === 'mn' ? 'font-bold' : ''}
      >
        МН
      </button>
      <span>|</span>
      <button 
        onClick={() => switchLanguage('en')}
        className={currentLocale === 'en' ? 'font-bold' : ''}
      >
        EN
      </button>
    </div>
  );
}