// app/contact/page.tsx

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function ContactPage() {
  const t = await getTranslations('Contact');

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black transition-colors duration-500">
      
      {/* Гол контент */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-12">
          {t('title')}
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p className="lead text-xl mb-8">
            {t('intro')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6">
                {t('addressTitle')}
              </h2>
              <p className="mb-4">
                {t('email')}: <Link href="mailto:jpa@naog.edu.mn" className="text-blue-600 dark:text-blue-400 hover:underline">jpa@naog.edu.mn</Link>
              </p>
              <p className="mb-4">
                {t('phone')}: +70133043
              </p>
              <p>
                {t('addressLabel')}: {t('address')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}