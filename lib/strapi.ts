const STRAPI_URL = 'http://localhost:1337'; // Локал туршилтын үед
// Байршуулсны дараа өөрчил: 'http://таны-серверийн-ip:1337' эсвэл домэйн

export async function getLatestIssues() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/issues?populate=*&sort=releaseDate:desc`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      console.error('Strapi алдаа:', res.status, await res.text());
      return [];
    }

    const data = await res.json();

    // ← Энд Strapi-аас ирсэн бүтэн өгөгдлийг console-д хэвлэнэ
    console.log('Strapi data:', data);

    // data.data нь массив (issues-ийн жагсаалт)
    return data.data || [];
  } catch (error) {
    console.error('Strapi холболтын алдаа:', error);
    return [];
  }
}