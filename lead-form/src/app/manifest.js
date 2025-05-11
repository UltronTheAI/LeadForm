export const dynamic = 'force-static';
export const revalidate = false;

export default function manifest() {
  return {
    name: 'Job Lead Form',
    short_name: 'Job Lead',
    description: 'Part-time job opportunities application form',
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