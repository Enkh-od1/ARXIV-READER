// app/archive/page.tsx

import Link from 'next/link';
import { FileText, Calendar, Download, Search } from 'lucide-react';

const navItems = [
  { label: 'Сэтгүүлийн тухай', href: '/about' },
  { label: 'Редакцын зөвлөл', href: '/editorial' },
  { label: 'Сүүлийн дугаар', href: '/latest' },
  { label: 'Архив', href: '/archive' },
  { label: 'Хүсэлт илгээх холбоо барих', href: '/contact' },
];

// Жишээ архивын өгөгдөл (ирээдүйд Strapi-аас авна)
const archiveYears = [
  {
    year: 2025,
    issues: [
      { number: 'Vol. 15, No. 4', date: '2025-12-01', title: 'Хиймэл Оюун Ухаан ба Аюулгүй Байдал', pdfUrl: '#' },
      { number: 'Vol. 15, No. 3', date: '2025-09-15', title: 'Квант Тооцоолол', pdfUrl: '#' },
      { number: 'Vol. 15, No. 2', date: '2025-06-20', title: 'Машин Сургалтын Шинэчлэл', pdfUrl: '#' },
      { number: 'Vol. 15, No. 1', date: '2025-03-10', title: 'Өгөгдлийн Шинжлэх Ухаан', pdfUrl: '#' },
    ],
  },
  {
    year: 2024,
    issues: [
      { number: 'Vol. 14, No. 4', date: '2024-12-01', title: 'Блокчейн ба Децентралжуулалт', pdfUrl: '#' },
      { number: 'Vol. 14, No. 3', date: '2024-09-15', title: 'Нейрон Сүлжээний Хөгжил', pdfUrl: '#' },
    ],
  },
];

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black transition-colors duration-500">
      {/* Хөх Navbar */}
      <nav className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">arXiv Explorer</h1>

            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-blue-200 transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Archive хуудас – Орчин үеийн загвар */}
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-blue-800 dark:text-blue-400 mb-6">
            Архив
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Манай сэтгүүлийн бүх дугаарыг он, дугаараар нь ангилан хадгалсан архив. Бүтэн PDF-ээр татах боломжтой.
          </p>
        </div>

        {/* Хайлтын талбар (ирээдүйд ажилладаг болгоно) */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Дугаар, он, гарчиг хайх..."
              className="w-full pl-16 pr-6 py-5 text-lg rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-lg"
            />
          </div>
        </div>

        {/* Он бүрийн архив */}
        <div className="space-y-20">
          {archiveYears.map((yearData) => (
            <section key={yearData.year} className="scroll-mt-20">
              <h2 className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-10 text-center">
                {yearData.year} он
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {yearData.issues.map((issue) => (
                  <div
                    key={issue.number}
                    className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-blue-100 dark:border-gray-700"
                  >
                    {/* Cover placeholder */}
                    <div className="h-64 bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-20 h-20 text-blue-600 dark:text-blue-300 mx-auto mb-4" />
                        <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                          {issue.number}
                        </p>
                      </div>
                    </div>

                    <div className="p-8">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4" />
                        {new Date(issue.date).toLocaleDateString('mn-MN')}
                      </p>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                        {issue.title}
                      </h3>

                      <a
                        href={issue.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-6 bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition flex items-center justify-center gap-3 shadow-lg group-hover:scale-105 duration-300"
                      >
                        PDF Татах
                        <Download className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Доод хэсэг */}
        <div className="text-center mt-20 py-12 bg-blue-50 dark:bg-blue-900/30 rounded-3xl">
          <p className="text-2xl font-medium text-blue-800 dark:text-blue-300">
            Бүх дугаар PDF хэлбэрээр бэлэн байна
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Админ панелээс шинэ дугаар нэмэх боломжтой
          </p>
        </div>
      </div>
    </div>
  );
}