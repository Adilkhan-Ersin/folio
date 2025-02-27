// components/Hero.tsx
'use client'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useGSAP(() => {
    gsap.to('.title-gsp', {
      scrollTrigger: {
        trigger: '.header',
        start: 'top top',
        scrub: 1.9},
      xPercent: -50
    });
    gsap.to('.header .stroketx', {
      scrollTrigger: {
        trigger: '.header',
        start: 'top top',
        scrub: 1.9
      },
      xPercent: 50
    });
  });

  return (
    <section className="header overflow-hidden relative flex justify-center items-center w-full h-[100vh] font-[Syne]" id='hero'>
      <h1 className='title relative m-0 text-[4.375vw] text-center uppercase mix-blend-difference leading-[1.1] text-[var(--second-color)] z-[2]'>
        <span className='title-gsp inline-block will-change-transform'>Ersin Adilkhan</span>
        <span className='stroketx'>Digital Creator</span>
      </h1>
    </section>
  )
}