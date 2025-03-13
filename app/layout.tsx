import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  weight: '800',
  subsets: ["latin"],
  variable: "--font-syne",
});

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
  title: "Adilkhan Ersin",
  description: "Adilkhan Ersin's personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
