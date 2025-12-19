// app/contact/page.tsx

import Link from 'next/link';

const navItems = [
  { label: 'Сэтгүүлийн тухай', href: '/about' },
  { label: 'Редакцын зөвлөл', href: '/editorial' },
  { label: 'Сүүлийн дугаар', href: '/latest' },
  { label: 'Архив', href: '/archive' },
  { label: 'Хүсэлт илгээх холбоо барих', href: '/contact' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black transition-colors duration-500">
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

      {/* Гол контент */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-12">
          Холбоо барих
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p className="lead text-xl mb-8">
            Бидэнтэй холбогдохыг хүсвэл доорх мэдээллийг ашиглана уу.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6">
                Редакцын хаяг
              </h2>
              <p className="mb-4">
                Email: <Link href="mailto:info@arxiv-explorer.mn" className="text-blue-600 dark:text-blue-400 hover:underline">info@arxiv-explorer.mn</Link>
              </p>
              <p className="mb-4">
                Утас: +976 9911 2233
              </p>
              <p>
                Хаяг: Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6">
                Хүсэлт илгээх
              </h2>
              <p className="mb-6">
                Зохиол илгээх, сурталчилгаа, хамтын ажиллагааны талаар хүсэлтээ доорх форм дээр бичнэ үү.
              </p>
              <Link
                href="#contact-form"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition block text-center"
              >
                Хүсэлт илгээх форм
              </Link>
            </div>
          </div>

          <div className="my-12 p-8 bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-blue-200 dark:border-blue-800 text-center">
            <p className="text-lg font-medium text-blue-800 dark:text-blue-300">
  &quot;Таны санал хүсэлт бидний хөгжлийн түлхүүр&quot; – arXiv Explorer баг
</p>
          </div>
        </div>
      </div>
    </div>
  );
}