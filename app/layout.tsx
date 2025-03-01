import type { Metadata } from "next";
import { Syne, Roboto } from "next/font/google";
import "./globals.css";

const syne = Syne({
  weight: '800',
  subsets: ["latin"],
  variable: "--font-syne",
});

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ["latin"],
  style: ['normal', 'italic'],
  variable: "--font-roboto",
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
      <body className={`${roboto.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
