// components/Hero.tsx
'use client'
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useEffect } from 'react';

export default function Hero() {
  // useEffect(() => {
  //   gsap.registerPlugin(useGSAP, ScrollTrigger);
  // }, []);

  // useGSAP(() => {
  // });

  return (
    <section className="header overflow-hidden relative w-full h-[100vh]" id='hero'>
      <div className='h-full w-full relative flex flex-col justify-between pt-12'>
        <div className='flex justify-between'>
          <h1 className='relative m-0 text-[14vh] uppercase mix-blend-difference leading-[0.8] text-[var(--second-color)] z-[2]'>
            <span className='inline-block relative font-[canopee]'>Adilkhan</span>
          </h1>
        </div>
        <div className="mt-[44px] md:mt-[14vh] flex flex-col md:flex-row justify-between relative">
          <div className="text-justify max-w-[211px] flex">
            <p className="uppercase text-sm leading-[1]">I help companies, brands and entrepreneurs develop any digital
            products and achieve their goals</p>
          </div>
          <div className="mt-[19.4vh] mb-11 text-right text-[10vh]">
            <h1 className='relative uppercase mix-blend-difference leading-[0.8] text-[var(--second-color)] z-[2]'>
              <span className='inline-block relative '>Digital</span><br/>
              <span className='inline-block relative font-[canopee]'>Creator</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}