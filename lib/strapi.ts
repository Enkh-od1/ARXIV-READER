// lib/strapi.ts

const STRAPI_URL = 'http://localhost:1337';

export async function getLatestIssues() {
  const res = await fetch(
    `${STRAPI_URL}/api/issues?populate=*&sort=releaseDate:desc`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    console.error('Strapi алдаа:', res.status, await res.text());
    return [];
  }

  const data = await res.json();
  return data.data || [];
}