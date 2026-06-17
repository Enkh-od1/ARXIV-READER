'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ForAuthorsClient() { 
  const [activeTab, setActiveTab] = useState(1);
  const t = useTranslations('ForAuthors');

  const tabs = [
    { id: 1, name: t('tabs.requirements'), title: t('tabs.requirements') },
    { id: 2, name: t('tabs.ethics'), title: t('tabs.ethics') },
    { id: 3, name: t('tabs.review'), title: t('tabs.reviewFull') },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#003d71] mb-6 text-center uppercase">
          {t('pageTitle')}
        </h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-12 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-4 font-semibold transition-all ${
                activeTab === tab.id 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="animate-fadeIn min-h-400px">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003d71] mb-6 uppercase">
            {currentTab?.title}
          </h2>
          
          <div className="prose prose-slate max-w-none dark:prose-invert text-justify leading-1.7 
            prose-p:my-0 prose-li:my-0 prose-ul:my-2 prose-ol:my-2 
            prose-strong:text-[#003d71]">
            
            {/* TAB 1: ТАВИГДАХ ШААРДЛАГА */}
            {activeTab === 1 && (
              <div className="space-y-4">
                <ol className="pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                  <li><strong className="text-[#003d71]">1.</strong> {t('tab1.intro.item1')}</li>
                  <li><strong className="text-[#003d71]">2.</strong> {t('tab1.intro.item2')}</li>
                  <li><strong className="text-[#003d71]">3.</strong> {t('tab1.intro.item3')}</li>
                  <li><strong className="text-[#003d71]">4.</strong> {t('tab1.intro.item4')}</li>
                  <li><strong className="text-[#003d71]">5.</strong> {t('tab1.intro.item5')} <a href="mailto:jpa@naog.edu.mn" className="text-blue-600 underline font-medium">jpa@naog.edu.mn</a></li>
                </ol>

                <hr className="my-8 border-gray-200" />
                <h3 className="text-center text-lg md:text-xl font-bold text-[#003d71] mt-4 mb-2 uppercase">
                  {t('tab1.sectionA.title')}
                </h3>
                
                <p className="font-bold text-[#003d71]">{t('tab1.sectionA.part1Title')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.1.</strong> {t('tab1.sectionA.item1_1')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.2.</strong> {t('tab1.sectionA.item1_2')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.3.</strong> {t('tab1.sectionA.item1_3')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.4.</strong> {t('tab1.sectionA.item1_4')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.5.</strong> {t('tab1.sectionA.item1_5')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.6.</strong> {t('tab1.sectionA.item1_6')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.7.</strong> {t('tab1.sectionA.item1_7')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.8.</strong> {t('tab1.sectionA.item1_8')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.9.</strong> {t('tab1.sectionA.item1_9')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.10.</strong> {t('tab1.sectionA.item1_10')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.11.</strong> {t('tab1.sectionA.item1_11')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.12.</strong> {t('tab1.sectionA.item1_12')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">1.13.</strong> {t('tab1.sectionA.item1_13')}</p>

                <p className="font-bold text-[#003d71]">{t('tab1.sectionA.part2Title')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.1.</strong> {t('tab1.sectionA.item2_1')}</p>
                <ul className="list-disc pl-12 space-y-1 text-justify">
                  <li>{t('tab1.sectionA.item2_1_a')}</li>
                  <li>{t('tab1.sectionA.item2_1_b')}</li>
                  <li>{t('tab1.sectionA.item2_1_c')}</li>
                </ul>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.2.</strong> {t('tab1.sectionA.item2_2')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.3.</strong> {t('tab1.sectionA.item2_3')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.4.</strong> {t('tab1.sectionA.item2_4')}</p>
                <li>{t('tab1.sectionA.item2_4_mn')}</li>
                <p className="text-slate-600">{t('tab1.sectionA.item2_4_mnExample')}</p>
                <li>{t('tab1.sectionA.item2_4_en')}</li>
                <p className="text-slate-600">{t('tab1.sectionA.item2_4_enExample')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.5.</strong> {t('tab1.sectionA.item2_5')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.6.</strong> {t('tab1.sectionA.item2_6')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.7.</strong> {t('tab1.sectionA.item2_7')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.8.</strong> {t('tab1.sectionA.item2_8')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.9.</strong> {t('tab1.sectionA.item2_9')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.10.</strong> {t('tab1.sectionA.item2_10')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.11.</strong> {t('tab1.sectionA.item2_11')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.12.</strong> {t('tab1.sectionA.item2_12')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.13.</strong> {t('tab1.sectionA.item2_13')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.14.</strong> {t('tab1.sectionA.item2_14')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.15.</strong> {t('tab1.sectionA.item2_15')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.16.</strong> {t('tab1.sectionA.item2_16')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">2.17.</strong> {t('tab1.sectionA.item2_17')}</p>

                <p className="font-bold text-[#003d71]">{t('tab1.sectionA.part3Title')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">3.1.</strong> {t('tab1.sectionA.item3_1')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">3.2.</strong> {t('tab1.sectionA.item3_2')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">3.3.</strong> {t('tab1.sectionA.item3_3')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">3.4.</strong> {t('tab1.sectionA.item3_4')}</p>
                <p className="text-slate-600"><strong className="text-[#003d71]">3.5.</strong> {t('tab1.sectionA.item3_5')} <a href="mailto:jpa@naog.edu.mn" className="text-blue-600 underline font-medium">https://doi.org/xxxx.</a></p>

                <h3 className="text-center text-lg md:text-xl font-bold text-[#003d71] mt-4 mb-2 uppercase">
                  {t('tab1.sectionB.title')}
                </h3>

                {/* Хүснэгт */}
                <div className="overflow-x-auto my-8">
                  <table className="min-w-full border-collapse border border-slate-300 text-sm md:text-[15px]">
                    <thead>
                      <tr className="bg-[#f8fafc] text-[#003d71]">
                        <th className="border border-slate-300 p-3 w-[12%]"></th>
                        <th className="border border-slate-300 p-3 w-[18%] font-bold text-center">{t('tab1.table.col1')}</th>
                        <th className="border border-slate-300 p-3 w-[20%] font-bold bg-blue-50/30">{t('tab1.table.col2')}</th>
                        <th className="border border-slate-300 p-3 w-[19%] font-bold text-center">{t('tab1.table.col3')}</th>
                        <th className="border border-slate-300 p-3 w-[19%] font-bold text-center">{t('tab1.table.col4')}</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr>
                        <td className="border border-slate-300 p-3 font-bold text-center bg-slate-50 text-[#003d71]">{t('tab1.table.row1.label')}</td>
                        <td className="border border-slate-300 p-3 leading-relaxed">{t('tab1.table.row1.col1')}</td>
                        <td className="border border-slate-300 p-3 leading-relaxed bg-blue-50/10">{t('tab1.table.row1.col2')}</td>
                        <td className="border border-slate-300 p-3 leading-relaxed">{t('tab1.table.row1.col3')}</td>
                        <td className="border border-slate-300 p-3 leading-relaxed">{t('tab1.table.row1.col4')}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-3 font-bold text-center bg-slate-50 text-[#003d71]">{t('tab1.table.row2.label')}</td>
                        <td className="border border-slate-300 p-3">{t('tab1.table.row2.col1')}</td>
                        <td className="border border-slate-300 p-3 bg-blue-50/10">{t('tab1.table.row2.col2')}</td>
                        <td className="border border-slate-300 p-3">{t('tab1.table.row2.col3')}</td>
                        <td className="border border-slate-300 p-3">{t('tab1.table.row2.col4')}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-3 font-bold text-center bg-slate-50 text-[#003d71]">{t('tab1.table.row3.label')}</td>
                        <td className="border border-slate-300 p-3 align-top">
                          <ul className="list-disc pl-5 space-y-2">
                            <li>{t('tab1.table.row3.col1_a')}</li>
                            <li>{t('tab1.table.row3.col1_b')}</li>
                            <li>{t('tab1.table.row3.col1_c')}</li>
                          </ul>
                        </td>
                        <td className="border border-slate-300 p-3 align-top bg-blue-50/10">
                          <ul className="list-disc pl-5 space-y-2">
                            <li>{t('tab1.table.row3.col2_a')}</li>
                            <li>{t('tab1.table.row3.col2_b')}</li>
                          </ul>
                        </td>
                        <td className="border border-slate-300 p-3 align-top">
                          <ul className="list-disc pl-5 space-y-2">
                            <li>{t('tab1.table.row3.col3_a')}</li>
                            <li>{t('tab1.table.row3.col3_b')}</li>
                            <li>{t('tab1.table.row3.col3_c')}</li>
                            <li>{t('tab1.table.row3.col3_d')}</li>
                          </ul>
                        </td>
                        <td className="border border-slate-300 p-3 align-top">
                          <ul className="list-disc pl-5 space-y-2">
                            <li>{t('tab1.table.row3.col4_a')}</li>
                            <li>{t('tab1.table.row3.col4_b')}</li>
                            <li>{t('tab1.table.row3.col4_c')}</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-3 font-bold text-center bg-slate-50 text-[#003d71]">{t('tab1.table.row4.label')}</td>
                        <td className="border border-slate-300 p-3">{t('tab1.table.row4.col1')}</td>
                        <td className="border border-slate-300 p-3 bg-blue-50/10">{t('tab1.table.row4.col2')}</td>
                        <td className="border border-slate-300 p-3">{t('tab1.table.row4.col3')}</td>
                        <td className="border border-slate-300 p-3">{t('tab1.table.row4.col4')}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-3 font-bold text-center bg-slate-50 text-[#003d71]">{t('tab1.table.row5.label')}</td>
                        <td className="border border-slate-300 p-3">{t('tab1.table.row5.col1')}</td>
                        <td className="border border-slate-300 p-3 bg-blue-50/10">{t('tab1.table.row5.col2')}</td>
                        <td className="border border-slate-300 p-3">{t('tab1.table.row5.col3')}</td>
                        <td className="border border-slate-300 p-3">{t('tab1.table.row5.col4')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: ЁС ЗҮЙН ХЭМ ХЭМЖЭЭ */}
            {activeTab === 2 && (
              <div className="space-y-4 text-slate-600">
                <p>{t('tab2.intro')}</p>
                
                <p className="my-4 font-bold text-[#003d71]">{t('tab2.boardTitle')}</p>
                <ul className="list-disc pl-12 space-y-1 text-justify">
                  <li>{t('tab2.board.item1')}</li>
                  <li>{t('tab2.board.item2')}</li>
                  <li>{t('tab2.board.item3')}</li>
                  <li>{t('tab2.board.item4')}</li>
                  <li>{t('tab2.board.item5')}</li>
                  <li>{t('tab2.board.item6')}</li>
                  <li>{t('tab2.board.item7')}</li>
                </ul>

                <p className="my-4 font-bold text-[#003d71]">{t('tab2.reviewerTitle')}</p>
                <ul className="list-disc pl-12 space-y-1 text-justify">
                  <li>{t('tab2.reviewer.item1')}</li>
                  <li>{t('tab2.reviewer.item2')}</li>
                  <li>{t('tab2.reviewer.item3')}</li>
                  <li>{t('tab2.reviewer.item4')}</li>
                </ul>

                <p className="my-4 font-bold text-[#003d71]">{t('tab2.authorTitle')}</p>
                <ul className="list-disc pl-12 space-y-1 text-justify">
                  <li>{t('tab2.author.item1')}</li>
                  <li>{t('tab2.author.item2')}</li>
                  <li>{t('tab2.author.item3')}</li>
                  <li>{t('tab2.author.item4')}</li>
                </ul>

                <p className="my-4 font-bold text-[#003d71]">{t('tab2.plagiarismTitle')}</p>
                <ul className="list-disc pl-12 space-y-1 text-justify">
                  <li>{t('tab2.plagiarism.item1')}</li>
                  <li>{t('tab2.plagiarism.item2')}</li>
                </ul>

                <p className="my-4 font-bold text-[#003d71]">{t('tab2.correctionTitle')}</p>
                <ul className="list-disc pl-12 space-y-1 text-justify">
                  <li>{t('tab2.correction.item1')}</li>
                  <li>{t('tab2.correction.item2')}</li>
                </ul>
              </div>
            )}

            {/* TAB 3: ХЯНАН МАГАДАЛГАА */}
            {activeTab === 3 && (
              <div className="space-y-4 text-slate-600">
                <p>{t('tab3.intro')}</p>
                <span className="block my-6 relative w-full overflow-hidden rounded-2xl shadow-xl border border-slate-100 bg-white p-2">
                  <Image
                    src="/ENKHOD01.png" 
                    alt="Process Map"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </span>

                <p className="my-4 font-bold text-[#003d71]">{t('tab3.step1.title')}</p>
                <p className="my-4 text-[#003d71]">{t('tab3.step1.desc')}</p>
                <ul className="list-disc pl-12 space-y-1 text-justify">
                  <li>{t('tab3.step1.item1')}</li>
                  <li>{t('tab3.step1.item2')}</li>
                  <li>{t('tab3.step1.item3')}</li>
                  <li>{t('tab3.step1.item4')}</li>
                </ul>
                <p className="my-4 text-[#003d71]">{t('tab3.step1.note')}</p>

                <p className="my-4 font-bold text-[#003d71]">{t('tab3.step2.title')}</p>
                <p className="my-4 text-[#003d71]">{t('tab3.step2.desc')}</p>

                <p className="my-4 font-bold text-[#003d71]">{t('tab3.step3.title')}</p>
                <p className="my-4 text-[#003d71]">{t('tab3.step3.desc')}</p>

                <p className="my-4 font-bold text-[#003d71]">{t('tab3.step4.title')}</p>
                <p className="my-4 text-[#003d71]">{t('tab3.step4.desc')}</p>
                <ul className="list-disc pl-12 space-y-1 text-justify">
                  <li>{t('tab3.step4.item1')}</li>
                  <li>{t('tab3.step4.item2')}</li>
                  <li>{t('tab3.step4.item3')}</li>
                  <li>{t('tab3.step4.item4')}</li>
                  <li>{t('tab3.step4.item5')}</li>
                </ul>
                <p className="my-4 text-[#003d71]">{t('tab3.step4.note')}</p>

                <p className="my-4 font-bold text-[#003d71]">{t('tab3.step5.title')}</p>
                <p className="my-4 text-[#003d71]">{t('tab3.step5.desc')}</p>
                <ul className="list-disc pl-12 space-y-1 text-justify">
                  <li>{t('tab3.step5.item1')}</li>
                  <li>{t('tab3.step5.item2')}</li>
                  <li>{t('tab3.step5.item3')}</li>
                  <li>{t('tab3.step5.item4')}</li>
                </ul>
                <p className="my-4 text-[#003d71]">{t('tab3.step5.note')}</p>

                <p className="my-4 font-bold text-[#003d71]">{t('tab3.step6.title')}</p>
                <p className="my-4 text-[#003d71]">{t('tab3.step6.desc')}</p>

                <p className="my-4 font-bold text-[#003d71]">{t('tab3.step7.title')}</p>
                <p className="my-4 text-[#003d71]">{t('tab3.step7.desc')}</p>

                <p className="my-4 font-bold text-[#003d71]">{t('tab3.step8.title')}</p>
                <p className="my-4 text-[#003d71]">{t('tab3.step8.desc')}</p>

                <p className="my-4 font-bold text-[#003d71]">{t('tab3.step9.title')}</p>
                <p className="my-4 text-[#003d71]">{t('tab3.step9.desc')}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}