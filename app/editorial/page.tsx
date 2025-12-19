// app/editorial/page.tsx

import Link from 'next/link';

const navItems = [
  { label: 'Сэтгүүлийн тухай', href: '/about' },
  { label: 'Редакцын зөвлөл', href: '/editorial' },
  { label: 'Сүүлийн дугаар', href: '/latest' },
  { label: 'Архив', href: '/archive' },
  { label: 'Хүсэлт илгээх холбоо барих', href: '/contact' },
];

export default function EditorialPage() {
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
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-12">
          Редакцын зөвлөл
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p className="lead text-xl mb-8">
            Манай сэтгүүлийн редакцын зөвлөл нь эрдэм шинжилгээний өндөр чанартай өгүүлэл нийтлэхэд чухал үүрэг гүйцэтгэдэг.
          </p>

          <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mt-12 mb-8">
            Ерөнхий редактор
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-40 h-40" />
              <div>
                <h3 className="text-2xl font-bold">Проф. Др. Бат-Эрдэнэ</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">ШУТИС-ийн профессор</p>
                <p className="mt-4">Хиймэл оюун ухаан, машин сургалтын чиглэлээр 20+ жил ажилласан туршлагатай.</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mt-12 mb-8">
            Редакцын зөвлөлийн гишүүд
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-2">Др. Сувд</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">МУИС-ийн дэд профессор</p>
              <p>Компьютерийн алсын хараа, өгөгдлийн шинжлэх ухаан</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-2">Др. Энхбат</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">ШУА-ийн эрдэм шинжилгээний ажилтан</p>
              <p>Квант тооцоолол, криптографи</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-2">Проф. Оюун</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">ХААИС-ийн профессор</p>
              <p>Био информатик, генетикийн алгоритм</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-2">Др. Болд</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">МУИС-ийн багш</p>
              <p>Машин сургалт, нейрон сүлжээ</p>
            </div>
          </div>

          <div className="my-12 p-8 bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-blue-200 dark:border-blue-800 text-center">
            <p className="text-lg font-medium text-blue-800 dark:text-blue-300">
              Редакцын зөвлөл нь өгүүллийн чанар, шинжлэх ухааны үнэн зөвийг хангахад бүх хүчээ дайчилдаг.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}