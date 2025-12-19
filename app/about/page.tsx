// app/about/page.tsx

import Link from 'next/link';

const navItems = [
  { label: 'Сэтгүүлийн тухай', href: '/about' },
  { label: 'Редакцын зөвлөл', href: '/editorial' },
  { label: 'Сүүлийн дугаар', href: '/latest' },
  { label: 'Архив', href: '/archive' },
  { label: 'Хүсэлт илгээх холбоо барих', href: '/contact' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black">
      {/* Navbar */}
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

      {/* Гол контент */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-12">
          Сэтгүүлийн тухай
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          {/* Энд таны хүссэн текст, зураг, жагсаалт гэх мэт орно */}
          <p className="lead text-xl mb-8">
            arXiv Explorer нь эрдэм шинжилгээний өгүүлэл хайх, уншихад зориулагдсан орчин үеийн платформ юм.
          </p>
          {/* ... бусад текст ... */}
        </div>
      </div>
    </div>
  );
}