'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function YearFilter({ years }: { years: number[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = searchParams.get('year') || '';
  const locale = useLocale();
  const t = useTranslations('Archive');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    if (year) {
      router.push(`/${locale}/archive?year=${year}`);
    } else {
      router.push(`/${locale}/archive`);
    }
  };

  return (
    <div className="relative inline-block w-150px">
      <select
        value={currentYear}
        onChange={handleChange}
        className="w-full appearance-none bg-white border border-gray-200 text-[#003d71] text-sm rounded-md py-2 px-3 pr-10 outline-none cursor-pointer hover:border-gray-400 transition-colors"
        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
      >
        <option value="">{t('allYears')}</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y} {t('yearLabel')}
          </option>
        ))}
      </select>
      
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </div>
    </div>
  );
}