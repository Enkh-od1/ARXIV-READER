import { getJournalInfo, getLatestIssue } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import type { Partner, InformationSection } from '@/types/journal';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Home');

  const journal = await getJournalInfo(locale);
  const latestIssue = await getLatestIssue(locale);

  if (!journal) {
    return (
      <div className="p-10 text-center text-gray-500 font-medium">
        {t('errorLoading')}
      </div>
    );
  }

  return (
    <main className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Зүүн тал */}
        <div className="lg:col-span-3 space-y-6">

          {/* 1. Hero card — Сэтгүүлийн тухай */}
          <section className="rounded-2xl bg-[#003d71] px-6 py-8 md:px-8 md:py-10 shadow-xl">

            <h1 className="mb-4 text-2xl font-semibold leading-snug text-white md:text-3xl">
              {t('about.title')}
            </h1>
            <div className="mb-6 text-sm leading-relaxed text-white/80 space-y-2">
              <p>{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
              <p>{t('about.paragraph3')}</p>
              <p>{t('about.paragraph4')}</p>
              <p>{t('about.address')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
                {t('about.issnPrint')} 2959-6351
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
                {t('about.issnOnline')} 3135-4580
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
                ISSN-L 2959-6351
              </span>
            </div>
          </section>

          {/* 2. Сүүлийн дугаар */}
          {latestIssue && (
            <section className="bg-white p-4 md:p-5 rounded-2xl shadow-lg border border-blue-100 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#003d71]" />
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-[#003d71]">
                  {t('latestIssue.title')}
                </h2>
                <span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-[#003d71]">
                  {latestIssue.year} {t('latestIssue.year')}
                </span>
              </div>
              <div className="flex gap-6 items-center">
                <div className="relative w-24 h-32 md:w-32 md:h-44 shrink-0 rounded-md overflow-hidden shadow-lg border border-white">
                  <Image
                    src={latestIssue.coverUrl || '/no-cover.jpg'}
                    alt={latestIssue.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  
                  <h3 className="text-xl md:text-2xl font-semibold text-[#003d71] leading-snug">
                    № {latestIssue.number} — {latestIssue.title}
                  </h3>
                  <Link
                    href={`/${locale}/archive/${latestIssue.documentId}`}
                    className="w-fit bg-[#003d71] text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-blue-800 transition-all"
                  >
                    {t('latestIssue.viewButton')} →
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Баруун тал — Sidebar */}
        <aside className="h-fit">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100 sticky top-6">

            {/* Мэдээлэл */}
            <h2 className="text-lg font-semibold text-[#003d71] mb-5 text-center border-b pb-4">
              {t('information.title')}
            </h2>
            <div className="space-y-5 text-center">
              <div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t('information.callForPapers')}
                </p>
                <p className="text-slate-600 mt-2 text-sm">
                  {t('information.email')} : jpa@naog.edu.mn
                </p>
                <div className="mt-4 flex justify-center">
                  <Link
                    href={`/${locale}/for-authors`}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
                  >
                    {t('information.readMore')}
                  </Link>
                </div>
              </div>

              {(journal.informationSections?.length ?? 0) > 0 &&
                journal.informationSections?.map((section: InformationSection, index: number) => (
                  <div key={index}>
                    {section.sectionLogo && (
                      <div className="mx-auto mb-3 w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full border border-blue-100 p-2">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'https://jpa.naog.edu.mn'}${section.sectionLogo}`}
                          alt={section.sectionTitle || 'Section logo'}
                          width={200}
                          height={150}
                          unoptimized
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-sm font-semibold text-[#003d71]">{section.sectionTitle}</h3>
                    {section.sectionDescription && (
                      <p className="text-gray-500 mt-1 text-sm leading-relaxed">{section.sectionDescription}</p>
                    )}
                  </div>
                ))
              }
            </div>

            {/* Эрхлэн гаргагч */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h2 className="text-base font-semibold text-[#003d71] mb-4 text-center">
                {t('publisher.title')}
              </h2>
              <div className="space-y-3">
                {journal.partners?.map((partner: Partner, index: number) => (
                  <Link
                    key={index}
                    href={partner.partnerUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-center"
                  >
                    {partner.partnerLogo && (
                      <div className="w-full h-28 flex items-center justify-center bg-white rounded-xl border border-blue-100 p-4 mb-1.5 group-hover:border-blue-300 transition-all">
                        <Image
                          src={`https://jpa.naog.edu.mn${partner.partnerLogo}`}
                          alt={partner.partnerName || 'Partner'}
                          width={200}
                          height={150}
                          unoptimized
                          className="object-contain max-h-full mx-auto"
                        />
                      </div>
                    )}
                    <p className="text-xs font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">
                      {partner.partnerName}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Нэмэлт лого — Crossref + Logo 2 */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-center bg-white rounded-xl border border-blue-100 p-3 hover:border-blue-300 transition-all">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://assets.crossref.org/logo/crossref-logo-200.svg"
                    width={200}
                    height={130}
                    alt="Crossref logo"
                    className="object-contain max-h-10 mx-auto"
                  />
                </div>
                <div className="flex items-center justify-center bg-white rounded-xl border border-blue-100 p-3 hover:border-blue-300 transition-all">
                  <Image
                    src="/original.svg"
                    alt="Logo 2"
                    width={160}
                    height={80}
                    unoptimized
                    className="object-contain max-h-10 mx-auto"
                  />
                </div>
              </div>
            </div>

          </div>
        </aside>

      </div>
      </div>
    </main>
  );
}
