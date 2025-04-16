'use client';
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar';
import About from '@/components/About'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 3000);
  }, []);

  return (
    <main>
      { isLoading && <Preloader />}
      <CustomCursor/>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Footer />
      <Analytics />
      <SpeedInsights />
    </main>
  );
}
