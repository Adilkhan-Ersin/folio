// app/certificats.tsx
'use client'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  useGSAP(() => {
    gsap.to('.title-gsp', {
      scrollTrigger: {
        trigger: '.header',
        start: 'top top',
        scrub: 1.9},
      xPercent: -80
    });
    gsap.to('.header .stroketx', {
      scrollTrigger: {
        trigger: '.header',
        start: 'top top',
        scrub: 1.9
      },
      xPercent: 80
    });
  });

  return (
    <>
      <CustomCursor/>
      <Navbar />
      <section className="header overflow-hidden relative flex justify-center items-center w-full h-[100vh] font-[Syne]" id='hero'>
        <h1 className='title relative m-0 text-[4.375vw] text-center uppercase mix-blend-difference leading-[1.1] text-[var(--second-color)] z-[2]'>
          <span className='title-gsp inline-block will-change-transform'>Fuck</span>
          <Link href='/' className='stroketx'>You</Link>
        </h1>
      </section>
      <div className='h-screen w-screen'></div>
    </>
  );
}