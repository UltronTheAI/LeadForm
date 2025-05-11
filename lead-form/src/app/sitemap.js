export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap() {
  const baseUrl = 'https://leadform.onrender.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ]
} 