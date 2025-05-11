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
  title: "LeadForm | Contact Us",
  description: "Get in touch with our team. Submit your information and we'll get back to you as soon as possible.",
  keywords: ["contact form", "lead collection", "get in touch", "contact us", "inquiry form"],
  authors: [{ name: "Swaraj Puppalwar", url: "https://github.com/UltronTheAI" }],
  creator: "UltronTheAI",
  publisher: "LeadForm",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://leadform.onrender.com"),
  openGraph: {
    title: "LeadForm | Contact Us",
    description: "Get in touch with our team. Submit your information and we'll get back to you as soon as possible.",
    url: "/",
    siteName: "LeadForm",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadForm | Contact Us",
    description: "Get in touch with our team. Submit your information and we'll get back to you as soon as possible.",
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
