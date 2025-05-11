export const dynamic = 'force-static';
export const revalidate = false;

export default function manifest() {
  return {
    name: 'LeadForm',
    short_name: 'LeadForm',
    description: 'Contact form and lead management application',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3a86ff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
} 