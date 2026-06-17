'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface IssueAttributes {
  Title?: string;
  number?: string | number;
  publishedYear?: string | number;
  Number?: string;
}

interface IssueData {
  id?: number | string;
  documentId?: string;
  attributes?: IssueAttributes;
}

interface ArticleAttributes {
  title?: string;
  Title?: string;
  summary_text?: string;
  Summary?: string;
  author_text?: string;
  works_text?: string;
  doi?: string;
  key?: string;
  Key?: string;
  publishedAt?: string;
  customPublishedDate?: string;
  pages?: string;
  PageCount?: string;
  volume?: string;
  journalName?: string;
  issue?: {
    data?: IssueData;
  };
}

interface ArticleProps {
  article: {
    id?: number;
    documentId?: string;
    attributes?: ArticleAttributes;
  } & ArticleAttributes;
}

export default function ArticleContent({ article }: ArticleProps) {
  const t = useTranslations('ArticleContent');
  const locale = useLocale();

  const data = article?.attributes || article;
  const issueData = data?.issue?.data?.attributes || article?.issue?.data?.attributes;
  const issueId = data?.issue?.data?.id || data?.issue?.data?.documentId || article?.issue?.data?.id;

  const rawDate = data?.customPublishedDate || data?.publishedAt;
  const extractedYear = rawDate ? new Date(rawDate).getFullYear() : "2026";

  const issueNumber = issueData?.Number;
  const publishedYear = extractedYear;
  const journalTitle = issueData?.Title;

  const formatFullDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex gap-2 items-center">
        <Link href={`/${locale}/home`} className="hover:text-blue-600 transition-colors">
          {t('breadcrumbHome')}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/archive`} className="hover:text-blue-600 transition-colors">
          {t('breadcrumbArchive')}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/archive/${issueId}`} className="hover:text-blue-600 transition-colors"> 
          {t('breadcrumbArticle')}
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* ЗҮҮН ТАЛ */}
        <div className="lg:col-span-8">
          
          {/* Зохиогчийн тухай */}
          <section className="mb-8">
            <h3 className="text-lg font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800 uppercase tracking-wide">
              {t('aboutAuthor')}
            </h3>
            <div className="text-slate-900 leading-snug">
              {data?.author_text ? (
                data.author_text.split('\n').map((line, i) => {
                  if (!line.trim()) return null;
                  const isNameLine = /^[А-Я]\./.test(line.trim());
                  return (
                    <p 
                      key={i} 
                      className={isNameLine 
                        ? "font-bold text-lg mt-4 text-slate-900"
                        : "text-slate-600 text-sm mt-1 ml-1"
                      }
                    >
                      {line}
                    </p>
                  );
                })
              ) : (
                <p className="text-slate-400 italic text-sm">{t('noAuthorInfo')}</p>
              )}
            </div>
          </section>

          {/* DOI */}
          {data?.doi && (
            <div className="mb-8 text-sm">
              <span className="font-bold">{t('doiLabel')}: </span>
              <a href={data.doi} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.doi}</a>
            </div>
          )}

          {/* Түлхүүр үг */}
          {(data?.key || data?.Key) && (
            <div className="mb-10 text-sm leading-relaxed">
              <span className="font-bold">{t('keywordsLabel')}: </span>
              <span className="text-slate-700 italic">{data?.key || data?.Key}</span>
            </div>
          )}

          {/* Хураангуй */}
          <section className="mt-12">
            <h3 className="text-lg font-bold border-b-2 border-slate-200 pb-2 mb-6 text-slate-800 uppercase tracking-wide">
              {t('abstract')}
            </h3>
            <div className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">
              {data?.summary_text || data?.Summary || t('noSummary')}
            </div>
          </section>

          {/* Эх сурвалж */}
          {data?.works_text && (
            <section className="mt-12">
              <h3 className="text-lg font-bold border-b border-slate-200 pb-2 mb-6 text-slate-800 uppercase tracking-wide">
                {t('references')}
              </h3>
              <div className="text-slate-700 text-sm leading-relaxed space-y-3">
                {data.works_text.split('\n').map((line, index) => {
                  if (!line.trim()) return null;
                  
                  const renderWithLinks = (text: string) => {
                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                    return text.split(urlRegex).map((part, i) => {
                      if (part.match(urlRegex)) {
                        return (
                          <a 
                            key={i} 
                            href={part} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:underline break-all"
                          >
                            {part}
                          </a>
                        );
                      }
                      return part;
                    });
                  };

                  return (
                    <p key={index} className="pl-5 relative">
                      <span className="absolute left-0">•</span>
                      {line.match(/^([^()]+\(\d{4}\)\.)(.*)/) ? (
                        <>
                          <strong className="font-bold text-slate-900">
                            {line.match(/^([^()]+\(\d{4}\)\.)/)?.[0]}
                          </strong>
                          {renderWithLinks(line.replace(/^([^()]+\(\d{4}\)\.)/, ""))}
                        </>
                      ) : (
                        renderWithLinks(line)
                      )}
                    </p>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* БАРУУН ТАЛ: SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6 pt-10">
          
          {/* 1. PUBLISHED */}
          <div className="bg-slate-100 p-4 rounded-sm border-t-4 border-slate-300">
            <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">{t('published')}</p>
            <p className="text-slate-700 text-sm">
              {data?.customPublishedDate 
                ? formatFullDate(data.customPublishedDate as string)
                : data?.publishedAt 
                  ? formatFullDate(data.publishedAt as string)
                  : '2025.03.13'}
            </p>
          </div>

          {/* 2. HOW TO CITE */}
          <div className="bg-slate-100 p-4 rounded-sm border-t-4 border-slate-300">
            <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">{t('howToCite')}</p>
            <div className="text-slate-700 text-[13px] leading-relaxed mb-4">
              <p className="text-slate-700 text-[12px] leading-snug mb-3">
                {(() => {
                  const lines = data?.author_text?.split('\n') || [];
                  const names = lines
                    .filter(line => /^[А-Я]\./.test(line.trim()))
                    .map(line => line.split(',')[0].trim());
                  const authorStr = names.join(', ');

                  const publishedYear = extractedYear;
                  const journal = data?.title || t('articleNamePlaceholder');
                  const journalTitle = issueData?.Title || (locale === 'en' ? 'Public Administration' : 'Төрийн удирдлага');
                  const issueNumber = issueData?.Number; 
                  const pageRange = data?.pages || data?.PageCount;

                  return `${authorStr} (${publishedYear}). ${journal}, ${journalTitle}. Vol.${issueNumber}. ${pageRange}`;
                })()}
              </p>
            </div>
            
            <select className="w-full text-xs p-2 border border-slate-300 bg-white rounded-sm focus:outline-none">
              <option>APA 7</option>
            </select>
          </div>

          {/* 3. ISSUE */}
          <div className="bg-[#f8f9fa] border border-slate-200 rounded-sm overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-200 bg-[#f1f3f5]">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase mb-2">{t('issue')}</h3>
            </div>
            <div className="p-4 bg-white">
              {issueId ? (
                <Link href={`/${locale}/archive/${issueId}`} className="group block">
                  <span className="text-[#005c97] hover:underline text-[14px] font-medium leading-snug">
                    Vol. {issueNumber} ({publishedYear}): 
                    <span className="ml-1 group-hover:underline text-[#005c97]">
                      {journalTitle}
                    </span>
                  </span>
                </Link>
              ) : (
                <p className="text-slate-400 text-xs italic">{t('loading')}</p>
              )}
            </div>
          </div>

          {/* 4. LICENSE */}
          <div className="bg-slate-100 p-4 rounded-sm border-t-4 border-slate-300">
            <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">{t('license')}</p>
            <p className="text-slate-700 text-[12px] leading-snug mb-3">
              {t('copyright')} (c) {publishedYear} {(() => {
                const lines = data?.author_text?.split('\n') || [];
                const names = lines
                  .filter(line => /^[А-Я]\./.test(line.trim()))
                  .map(line => line.split(',')[0].trim());
                return names.join(', ');
              })()}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 mt-3">
                <Image 
                  src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" 
                  alt="CC" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5" 
                />
                <Image 
                  src="https://mirrors.creativecommons.org/presskit/icons/by.svg" 
                  alt="BY" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5" 
                />
                <a 
                  href="https://creativecommons.org/licenses/by/4.0/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="ml-1 text-[11px] text-blue-600 hover:underline font-medium"
                >
                  CC BY 4.0
                </a>
              </div>
              <p className="text-[11px] text-slate-500">
                {t('licenseText.prefix')} <a href="https://creativecommons.org" target="_blank" className="text-blue-600 hover:underline">{t('licenseText.link')}</a>.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}