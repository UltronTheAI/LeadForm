import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Page Not Found | LeadForm',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.description}>
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link href="/" className={styles.link}>
          Return to Home
        </Link>
      </div>
    </div>
  );
} 