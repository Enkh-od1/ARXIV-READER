'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const [activeTab,] = useState('policy');
  const t = useTranslations('About');

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-6 py-16 max-w-4xl">

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          {activeTab === 'intro' ? (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#003d71] mb-6">
                {t('intro.title')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-justify text-sm md:text-base">
                {t('intro.description')}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#003d71] mb-6">
                {t('policy.title')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-justify text-sm md:text-base">
                {t('policy.intro')}
              </p>

              <ul className="list-disc pl-12 space-y-1 text-justify text-slate-600 dark:text-slate-400 text-sm md:text-base">
                <li>{t('policy.topics.item1')}</li>
                <li>{t('policy.topics.item2')}</li>
                <li>{t('policy.topics.item3')}</li>
                <li>{t('policy.topics.item4')}</li>
                <li>{t('policy.topics.item5')}</li>
                <li>{t('policy.topics.item6')}</li>
                <li>{t('policy.topics.item7')}</li>
                <li>{t('policy.topics.item8')}</li>
                <li>{t('policy.topics.item9')}</li>
                <li>{t('policy.topics.item10')}</li>
              </ul>

              <p className="my-4 font-bold text-[#003d71]">
                {t('policy.typesTitle')}
              </p>
              <ul className="list-disc pl-12 space-y-1 text-justify text-slate-600 dark:text-slate-400 text-sm md:text-base">
                <li>{t('policy.types.item1')}</li>
                <li>{t('policy.types.item2')}</li>
                <li>{t('policy.types.item3')}</li>
                <li>{t('policy.types.item4')}</li>
              </ul>

              <p className="my-4 text-slate-700">{t('policy.freeNote')}</p>

              <p className="my-4 text-slate-700">
                {t('policy.emailLabel')} : <a href="mailto:jpa@naog.edu.mn" className="underline text-blue-600 hover:text-blue-800 transition-colors">
                  jpa@naog.edu.mn
                </a>
              </p>

              <p className="my-4 font-bold text-[#003d71]">
                {t('process.title')}
              </p>
              <p className="my-4 text-slate-700">{t('process.step1')}</p>
              <p className="my-4 text-slate-700">{t('process.step2')}</p>
              <p className="my-4 text-slate-700">{t('process.step3')}</p>
              <p className="my-4 text-slate-700">{t('process.step4')}</p>

              <p className="my-4 font-bold text-[#003d71]">
                {t('openAccess.title')}
              </p>
              <p className="my-4 text-slate-700">{t('openAccess.intro')}</p>
              <p className="my-4 text-slate-700">
                {t('openAccess.doajPrefix')} <a href="https://doaj.org/about/" target="_blank" rel="noreferrer" className="underline text-blue-600 hover:text-blue-800 transition-colors">DOAJ</a>{t('openAccess.doajSuffix')}
              </p>
              <p className="my-4 text-slate-700">
                {t('openAccess.copyrightPrefix')} <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" className="underline text-blue-600 hover:text-blue-800 transition-colors">CC BY 4.0</a>
                <Image 
                  src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" 
                  alt="CC" 
                  width={20} 
                  height={20} 
                  className="w-4 h-4 inline-block mx-1" 
                />
                <Image 
                  src="https://mirrors.creativecommons.org/presskit/icons/by.svg" 
                  alt="BY" 
                  width={20} 
                  height={20} 
                  className="w-4 h-4 inline-block mx-1" 
                />
                {t('openAccess.copyrightSuffix')}
              </p>
              <p className="my-4 text-slate-700">{t('openAccess.noEmbargo')}</p>

              <p className="my-4 font-bold text-[#003d71]">
                {t('ip.title')}
              </p>
              <p className="my-4 text-slate-700">{t('ip.paragraph1')}</p>
              <p className="my-4 text-slate-700">{t('ip.paragraph2')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}