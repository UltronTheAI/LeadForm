import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Job Lead Form | Part-Time Opportunities",
  description: "Looking for part-time work? Apply now to earn money in your spare time. Submit your information and our HR team will contact you.",
  keywords: ["part-time job", "earn money", "job application", "job opportunity", "flexible work", "employment"],
  authors: [{ name: "Swaraj Puppalwar", url: "https://github.com/UltronTheAI" }],
  creator: "UltronTheAI",
  publisher: "Job Lead Form",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://leadform.onrender.com"),
  openGraph: {
    title: "Job Lead Form | Part-Time Opportunities",
    description: "Looking for part-time work? Apply now to earn money in your spare time. Submit your information and our HR team will contact you.",
    url: "/",
    siteName: "Job Lead Form",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Lead Form | Part-Time Opportunities",
    description: "Looking for part-time work? Apply now to earn money in your spare time. Submit your information and our HR team will contact you.",
    creator: "@UltronTheAI",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
