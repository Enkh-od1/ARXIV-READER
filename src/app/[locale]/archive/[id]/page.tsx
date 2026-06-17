import { getIssueById, Article } from '@/lib/strapi';
import PdfButton from '@/components/PdfButton';
import ExpandableSummary from '@/components/ExpandableSummary';
import { FileText, Eye, } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface ArticleType {
  attributes?: { Authors?: string };
  Authors?: string;
  authors?: string;
  key?: string;
  Key?: string;
}

export default async function IssueDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string; locale: string }> 
}) {
  const { id, locale } = await params;
  const t = await getTranslations('IssueDetail');
  
  // locale дамжуулна
  const issue = await getIssueById(id, locale);

  if (!issue) return (
    <p className="text-center py-20 text-slate-500 font-medium">
      {t('notFound')}
    </p>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white">
 
      <nav className="text-sm text-slate-500 mb-6 flex gap-2 items-center">
        <Link href={`/${locale}/home`} className="hover:text-blue-600 transition-colors">
          {t('breadcrumbHome')}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/archive`} className="hover:text-blue-600 transition-colors">
          {t('breadcrumbArchive')}
        </Link>
        <span></span>
      </nav>

      {/* 1. Сэтгүүлийн толгой хэсэг */}
      <div className="flex flex-col md:flex-row gap-10 mb-16 border-b pb-12 items-center md:items-start">
        <div className="w-44 h-60 relative shadow-xl rounded-md overflow-hidden border border-slate-100 shrink-0">
          <Image 
            src={issue.coverUrl || '/placeholder.png'} 
            alt={issue.title} 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="flex-1 text-center md:text-left pt-2">
          <h1 className="text-xl md:text-2xl font-bold text-[#003d71] mt-2 mb-4 leading-tight">
            {issue.title}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-900 font-bold text-sm uppercase tracking-wider">
            <span className="bg-slate-100 px-3 py-1 rounded">{t('yearLabel')}: {issue.year}</span>
            <span className="bg-slate-100 px-3 py-1 rounded">{t('issueLabel')}: {issue.number}</span>
          </div>
        </div>
      </div>

      {/* 2. Өгүүллүүдийн жагсаалт */}
      <div className="space-y-12">
        <h2 className="text-xl font-black text-[#003d71] border-b-2 border-slate-900 pb-2 inline-block">
          {t('inThisIssue')}
        </h2>

        {issue.articles?.map((article: Article) => (
          <div key={article.id} className="group border-b border-slate-100 pb-10 last:border-0 transition-all">
            
            {/* А. Өгүүллийн гарчиг */}
            <Link href={`/${locale}/articles/${article.documentId}`}>
              <h3 className="text-xl font-bold text-slate-900 mb-3 cursor-pointer hover:text-blue-700 transition-colors">
                {article.title}
              </h3>
            </Link>
            
            {/* Б. Зохиогч */}
            <p className="text-[15px] text-slate-900 mb-4 font-bold">
              {t('authorLabel')}: {(article as ArticleType).authors || (article as ArticleType).Authors || t('noAuthor')}
            </p>

            {/* В. PDF болон Дэлгэрэнгүй товчнууд */}
<div className="mb-4 flex items-center gap-3 flex-wrap">
  {article.pdfUrl ? (
    <PdfButton 
      articleId={article.documentId} 
      pdfUrl={article.pdfUrl} 
      currentViews={article.views} 
    />
  ) : (
    <span className="text-slate-300 text-xs italic">{t('noLink')}</span>
  )}
  
  {/* Дэлгэрэнгүй товч */}
  <Link 
    href={`/${locale}/articles/${article.documentId}`}
    className="inline-flex items-center gap-2 px-4 py-2 bg-[#003d71] text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-4 h-4" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5l7 7-7 7" 
      />
    </svg>
    {t('readMore')}
  </Link>
</div>

            

            {/* Г. Мета өгөгдөл */}
            <div className="flex items-center gap-6 text-slate-900 text-[13px] font-semibold mb-5">
              <div className="flex items-center gap-1.5">
                <FileText size={16} strokeWidth={2.5} />
                <span>{article.pageCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye size={16} strokeWidth={2.5} />
                <span>{article.views ?? 0}</span>
              </div>
            </div>

            {/* Д. Хураангуй */}
            {article.summary && (
              <ExpandableSummary 
                summary={article.summary} 
                keywords={(article as ArticleType).key || (article as ArticleType).Key || ""} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}