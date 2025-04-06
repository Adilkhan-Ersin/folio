'use client';
// import { useState, useEffect } from 'react';
// import Preload from '@/components/Preload';
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar';
import About from '@/components/About'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
// import Certifications from '@/components/Certifications'


export default function Home() {
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }
// , 5000);

//   })
  return (
    <>
      {/* {loading && (<Preload onLoadComplete={() => setLoading(false)} />)} */}
      <CustomCursor/>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Footer />
      <Analytics />
      <SpeedInsights />
      {/* 
      <Skills />
      <Certifications /> */}
    </>
  );
}
