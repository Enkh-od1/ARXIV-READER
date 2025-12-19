// app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Loader2, 
  ExternalLink, 
  Calendar, 
  Users, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  pdfUrl: string;
}

const categories = [
  { label: 'Бүгд', value: '' },
  { label: 'Компьютерийн шинжлэх ухаан', value: 'cs' },
  { label: '  ↳ Хиймэл оюун ухаан (AI)', value: 'cs.AI' },
  { label: '  ↳ Машин сургалт (ML)', value: 'cs.LG' },
  { label: '  ↳ Компьютерийн алсын хараа (CV)', value: 'cs.CV' },
  { label: 'Физик', value: 'physics' },
  { label: '  ↳ Одон орон судлал', value: 'astro-ph' },
  { label: '  ↳ Өндөр энергийн физик', value: 'hep-th' },
  { label: 'Математик', value: 'math' },
  { label: '  ↳ Магадлалын онол', value: 'math.PR' },
  { label: 'Статистик', value: 'stat' },
  { label: '  ↳ Машин сургалтын статистик', value: 'stat.ML' },
  { label: 'Биологи', value: 'q-bio' },
  { label: 'Санхүү', value: 'q-fin' },
];

const navItems = [
  { label: 'Сэтгүүлийн тухай', href: '/about' },
  { label: 'Редакцын зөвлөл', href: '/editorial' },
  { label: 'Сүүлийн дугаар', href: '/latest' },
  { label: 'Архив', href: '/archive' },
  { label: 'Хүсэлт илгээх холбоо барих', href: '/contact' },
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupTab, setIsSignupTab] = useState(false);
  const resultsPerPage = 10;

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetchPapers('', '', 0);
  }, []);

  const fetchPapers = async (searchQuery: string, category: string, start: number) => {
    setLoading(true);
    try {
      let apiQuery = '';

      if (category) {
        apiQuery = `cat:${category}`;
      }

      if (searchQuery.trim()) {
        const keywordPart = `all:${encodeURIComponent(searchQuery.trim())}`;
        apiQuery = apiQuery ? `${apiQuery} AND ${keywordPart}` : keywordPart;
      }

      if (!apiQuery) {
        apiQuery = '';
      }

      const res = await fetch(
        `/api/search?query=${encodeURIComponent(apiQuery)}&start=${start}&maxResults=${resultsPerPage}`
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error('API алдаа:', res.status, errorText);
        throw new Error(`API алдаа: ${res.status}`);
      }

      const data = await res.json();
      setPapers(data.papers || []);
      setTotalResults(parseInt(data.total || '0', 10));
      setCurrentPage(Math.floor(start / resultsPerPage));
      setQuery(searchQuery.trim());
      setSelectedCategory(category);
    } catch (err) {
      console.error('fetchPapers алдаа:', err);
      setPapers([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPapers(query.trim(), selectedCategory, 0);
  };

  const handleCategoryChange = (newCategory: string) => {
    fetchPapers(query.trim(), newCategory, 0);
  };

  const goToPage = (newPage: number) => {
    if (newPage < 0) return;
    const maxPage = Math.ceil(totalResults / resultsPerPage) - 1;
    if (newPage > maxPage) return;

    const start = newPage * resultsPerPage;
    fetchPapers(query.trim(), selectedCategory, start);
  };

  const currentStart = currentPage * resultsPerPage + 1;
  const currentEnd = Math.min((currentPage + 1) * resultsPerPage, totalResults);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black transition-colors duration-500">
      {/* Navbar - Хөх өнгийн, <Link> ашигласан */}
      <nav className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <h1 className="text-2xl font-bold">arXiv Explorer</h1>
            </div>

            <ul className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-blue-200 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-blue-700 transition"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-white text-blue-800 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition shadow-md"
              >
                Нэвтрэх
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <ul className="lg:hidden mt-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block py-2 hover:text-blue-200 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>

      {/* Statistic Widget - Нэг шугаманд */}
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <p className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-2">Нийт өгүүлэл</p>
              <p className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-300">248</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <p className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-2">2025 онд нийтлэгдсэн</p>
              <p className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-300">36</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <p className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-2">Нийт хандалт</p>
              <p className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-300">127,543</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <p className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-2">Олон улсын индекс</p>
              <p className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-300">6</p>
            </div>
          </div>
        </div>
      </div>

      {/* Хайлт + Категори */}
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto mb-12">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-2xl px-6 py-5 pr-12 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-lg cursor-pointer transition-all w-full md:w-80"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 w-6 h-6 pointer-events-none" />
          </div>

          <form onSubmit={handleSubmit} className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-6 h-6" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Түлхүүр үгээр хайх..."
                className="w-full pl-16 pr-6 py-5 text-lg rounded-2xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-lg transition-all text-slate-900 dark:text-slate-100"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl disabled:opacity-70 transition flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                Хайх
              </button>
            </div>
          </form>
        </div>

        {totalResults > 0 && (
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8 text-lg">
            Нийт <span className="font-bold">{totalResults.toLocaleString()}</span> өгүүлэл олдлоо • Харуулж байна: {currentStart}–{currentEnd}
          </p>
        )}

        {papers.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium">Өгүүлэл олдсонгүй 😔</p>
          </div>
        )}

        <div className="grid gap-8">
          {papers.map((paper) => (
            <div key={paper.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-slate-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                <a href={`https://arxiv.org/abs/${paper.id}`} target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {paper.title}
                </a>
              </h2>
              <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-400 mb-5">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {paper.authors.join(', ')}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(paper.published).toLocaleDateString('mn-MN')}
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-8 line-clamp-4">{paper.summary}</p>
              <div className="flex justify-between items-center">
                <a
                  href={paper.pdfUrl}
                  target="_blank"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition"
                >
                  <FileText className="w-5 h-5 inline mr-2" />
                  PDF Унших
                </a>
                <a href={`https://arxiv.org/abs/${paper.id}`} target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">
                  arXiv дээрх хуудас <ExternalLink className="w-4 h-4 inline" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {totalResults > resultsPerPage && (
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0 || loading}
              className="px-6 py-3 bg-white dark:bg-gray-800 border rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 disabled:opacity-50 transition flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Өмнөх
            </button>
            <span className="px-6 py-3 text-slate-700 dark:text-slate-300 font-medium">
              Хуудас {currentPage + 1} / {Math.ceil(totalResults / resultsPerPage)}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentEnd >= totalResults || loading}
              className="px-6 py-3 bg-white dark:bg-gray-800 border rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 disabled:opacity-50 transition flex items-center gap-2"
            >
              Дараагийн
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Нэвтрэх / Бүртгүүлэх модал */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => {
                setIsLoginModalOpen(false);
                setIsSignupTab(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              {isSignupTab ? 'Бүртгүүлэх' : 'Нэвтрэх'}
            </h2>

            <div className="flex mb-8 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsSignupTab(false)}
                className={`flex-1 py-3 text-center font-medium transition ${
                  !isSignupTab
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Нэвтрэх
              </button>
              <button
                onClick={() => setIsSignupTab(true)}
                className={`flex-1 py-3 text-center font-medium transition ${
                  isSignupTab
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Бүртгүүлэх
              </button>
            </div>

            {!isSignupTab && (
              <>
                <button className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-xl py-3 mb-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 6.75c1.63 0 3.06.56 4.21 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-gray-700 dark:text-gray-200">Google-ээр нэвтрэх</span>
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">эсвэл</span>
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </>
            )}

            <form className="space-y-5">
              {isSignupTab && (
                <input
                  type="text"
                  placeholder="Нэр"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email хаяг"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                required
              />
              <input
                type="password"
                placeholder="Нууц үг"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                required
              />
              {isSignupTab && (
                <input
                  type="password"
                  placeholder="Нууц үг давтах"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  required
                />
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {isSignupTab ? 'Бүртгүүлэх' : 'Нэвтрэх'}
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
              {isSignupTab ? 'Аль хэдийн бүртгэлтэй юу?' : 'Бүртгэлгүй юу?'}{' '}
              <button
                onClick={() => setIsSignupTab(!isSignupTab)}
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                {isSignupTab ? 'Нэвтрэх' : 'Бүртгүүлэх'}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}