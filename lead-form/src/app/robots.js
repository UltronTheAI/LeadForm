export const dynamic = 'force-static';
export const revalidate = false;

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/*']
      }
    ],
    sitemap: 'https://leadform.onrender.com/sitemap.xml',
    host: 'https://leadform.onrender.com'
  }
} 