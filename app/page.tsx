import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar';
import About from '@/components/About'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor';
import { Analytics } from "@vercel/analytics/react"
// import Certifications from '@/components/Certifications'


export default function Home() {
  return (
    <>
      <CustomCursor/>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Footer />
      <Analytics />
      {/* 
      <Skills />
      <Certifications /> */}
    </>
  );
}
