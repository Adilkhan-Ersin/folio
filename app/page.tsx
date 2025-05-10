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
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ( async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        new LocomotiveScroll();

        setTimeout(() => {
          setIsLoading(false);
          window.scrollTo(0, 0);
        }, 3000);
      }
    )()
  }, []);

  return (
    <main>
      <span className='noise z-[1000]'></span>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
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
