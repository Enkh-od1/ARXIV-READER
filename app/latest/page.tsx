// app/latest/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { FileText, Calendar, Download } from 'lucide-react';
import { getLatestIssues } from '@/lib/strapi';

interface Issue {
  id: number;
  attributes: {
    number: string;
    releaseDate: string;
    title: string;
    articlesCount: number;
    pdfFile: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    coverImage?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

const STRAPI_URL = 'http://localhost:1337';

export default async function LatestIssue() {
  const issues = await getLatestIssues();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black">
      {/* Хөх Navbar – өмнөх кодыг энд тавина уу */}
      <nav className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">arXiv Explorer</h1>
            <ul className="flex items-center gap-8">
              {/* Navbar линкүүд */}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-16">
          Сүүлийн дугаар
        </h1>

        <div className="grid gap-12">
          {issues.map((issue: Issue) => (
            <div
              key={issue.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center p-8">
  {issue.attributes.coverImage?.data?.attributes?.url ? (
    <Image
      src={`${STRAPI_URL}${issue.attributes.coverImage.data.attributes.url}`}
      alt="Дугаарын нүүр зураг"
      width={800}
      height={600}
      className="rounded-xl shadow-lg object-contain"
      unoptimized
    />
  ) : (
    <FileText className="w-32 h-32 text-blue-600 dark:text-blue-300" />
  )}
</div>

              <div className="md:w-2/3 p-10 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {issue.attributes.number}
                  </h2>
                  <p className="text-xl text-blue-800 dark:text-blue-300 mb-6">
                    {issue.attributes.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5" />
                    {new Date(issue.attributes.releaseDate).toLocaleDateString('mn-MN')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Нийт өгүүлэл: <span className="font-bold">{issue.attributes.articlesCount}</span>
                  </p>
                </div>

                <Link
                  href={`${STRAPI_URL}${issue.attributes.pdfFile.data.attributes.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition flex items-center justify-center gap-3 shadow-lg"
                >
                  Бүтэн дугаарыг PDF-ээр татах
                  <Download className="w-6 h-6" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}