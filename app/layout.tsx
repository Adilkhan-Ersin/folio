import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// const roboto = Roboto({
//   weight: ['100', '300', '400', '500', '700', '900'],
//   subsets: ["latin"],
//   style: ['normal', 'italic'],
//   variable: "--font-roboto",
// })

const inter = Inter({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ["latin"],
  style: ['normal', 'italic'],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Adilkhan - Portfolio",
  description: "Portfolio of Adilkhan Ersin – showcasing web development, design, and programming projects.",
  keywords: "web developer, portfolio, projects, web design, programming, Adilkhan Ersin, Adok",
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Adilkhan - Portfolio",
    description: "Portfolio of Adilkhan Ersin – showcasing web development, design, and programming projects.",
    url: "https://ersinadilkhan.vercel.app/",
    siteName: "Adilkhan - Portfolio",
    images: [
      {
        url: "https://ersinadilkhan.vercel.app/img/paperIce.png",
        width: 1024,
        height: 1024,
        alt: "Paper Ice",
        type: "image/png",
      },
    ],
    locale: "en_US, en, ru_RU, ru, kk_KZ, kk",
    type: "website",
  },
};

export default function RootLayout({ children}: Readonly<{ children: React.ReactNode; }>){
  return (
    <html lang="en">
      <head><meta name="apple-mobile-web-app-title" content="Adilkhan" /></head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
