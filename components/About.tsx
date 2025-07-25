// components/about.tsx
"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image'
import { useEffect, useRef } from 'react';

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
  }, []);

  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.to(sectionRef.current, { // Target the section ref
      scale: 0.95,
      borderRadius: '0 0 2rem 2rem', // GSAP can animate border radius
      ease: 'power1.inOut',
      scrollTrigger: {
          trigger: sectionRef.current, // Use the section ref
          start: 'bottom bottom', // When bottom of section hits bottom of viewport
          end: '+=30%', // End after scrolling 30% past the start point
          scrub: 0.5,
          // markers: true, // Uncomment for debugging
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="clipAnima pb-[65px] lg:pb-[2.7vw] flex flex-col gap-5 rounded-b-3xl bg-[var(--black-color)]" id='about'>
      <div className='custom-grid pb-2 lg:pb-10'>
        <h2 className='section-heading col-start-1 lg:col-start-6 relative z-30 col-span-full flex w-full flex-col leading-none mix-blend-exclusion text-[var(--second-color)]'>
            <span>Designer,</span>
            <span>Developer,</span>
            <span>Creator</span>
        </h2>
      </div>
      <div className='custom-grid col-span-full gap-y-5'>
        <div className='pointer-events-none relative z-0 col-span-12 lg:col-span-4 flex aspect-[3/4] w-full items-center overflow-clip rounded-md'>
          <Image src="/img/adoknitted.png" alt="PFP" width={1024} height={1024} className='h-full w-full object-cover'/>
        </div>
        <div className='col-span-12 lg:col-span-7 lg:col-start-6 flex flex-col gap-y-5 '>
          <p className='relative pb-10 w-full max-w-[44ch] text-balance font-medium leading-snug text-[var(--second-color)] text-[1.2rem] lg:text-[1.5rem]'>I’m passionate about design and development, taking projects from idea to launch while making sure they’re smooth, functional, and leave a real impact. My goal is to create web experiences that not only look great but feel great to use.</p>
          <div className='flex flex-col lg:flex-row gap-x-20 gap-y-5'>
            <span className='flex h-fit lg:flex-col gap-6 overflow-clip font-mono tracking-[-0.035em]'>
              <span className='flex h-full font-medium uppercase text-nowrap text-[var(--second-color)]'>
                (About Me)
              </span>
            </span>
              {/* <p className='flex w-full max-w-[38ch] flex-col text-balance text-base font-medium leading-[132.5%] text-[var(--second-color)]'>
                I pay close attention to detail and always focus on user-friendly design. Every project I work on is built with a thoughtful approach to ensure the best experience possible.
                <br />
                <br />
                When I’m not coding or designing, I’m usually exploring new ideas, playing video games, listening to music, or working on creative projects.
              </p> */}
                <p className='realative w-full max-w-[38ch] text-balance text-base font-medium leading-[132.5%] text-[var(--second-color)]'>
                  I pay close attention to detail and always focus on user-friendly design. Every project I work on is built with a thoughtful approach to ensure the best experience possible.
                </p>
                <p className='relative mt-5 w-full max-w-[38ch] text-balance text-base font-medium leading-[132.5%] text-[var(--second-color)]'>
                  When I’m not coding or designing, I’m usually exploring new ideas, playing video games, listening to music, or working on creative projects.
                </p>
          </div>
        </div>
      </div>
    </section>
  )
}