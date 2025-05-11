import '../globals.css';

export const metadata = {
  title: 'Admin Dashboard - LeadForm',
  description: 'Admin dashboard for managing leads',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 