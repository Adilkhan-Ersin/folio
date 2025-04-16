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
  title: "A. E. | Web Developer Portfolio",
  description: "Portfolio of Adilkhan Ersin – showcasing web development, design, and programming projects.",
  keywords: "web developer, portfolio, projects, web design, programming, Adilkhan Ersin, Adok",
  openGraph: {
    title: "A. E. | Web Developer Portfolio",
    description: "Portfolio of Adilkhan Ersin – showcasing web development, design, and programming projects.",
    url: "https://ersinadilkhan.vercel.app/",
    siteName: "A. E. | Web Developer Portfolio",
    images: [
      {
        url: "/paperIce.png",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
