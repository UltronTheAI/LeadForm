import '../globals.css';

export const metadata = {
  title: 'Admin Dashboard | LeadForm',
  description: 'Secure admin dashboard for managing and viewing lead submissions.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Admin Dashboard | LeadForm',
    description: 'Secure admin dashboard for managing and viewing lead submissions.',
    type: 'website',
  }
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
} 