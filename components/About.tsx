// components/about.tsx
"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image'
import { MdArrowOutward } from 'react-icons/md';
import Link from 'next/link';
import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
  }, []);

  useGSAP(() => {
    const shrinkingAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '.clipAnima',
        start: 'bottom bottom',
        end: '+=30%',
        scrub: 0.5,
      },
    });

    shrinkingAnimation.to('.clipAnima', {
      scale: 0.95,
      borderRadius: '0 0 2rem 2rem',
      ease: 'power1.inOut',
    });
  });

  return (
    <section className="clipAnima pb-[2.7vw] flex flex-col gap-5 rounded-b-3xl bg-[var(--black-color)]" id='about'>
      <div className='custom-grid'>
        <MdArrowOutward size={90} className="p-0 m-0" rotate={180} color='var(--second-color)'/>
        <h2 className='section-heading col-start-6 relative z-30 col-span-full flex w-full flex-col leading-none mix-blend-exclusion text-[var(--second-color)]'>
          <span>Designer,</span>
          <span>Developer,</span>
          <span>Creator</span>
        </h2>
      </div>
      <div className='custom-grid col-span-full gap-y-5'>
        <div className='pointer-events-none relative z-0 col-span-4 flex aspect-square w-full items-center overflow-clip rounded-md'>
          <Image src="/img/vangoh.jpg" alt="PFP" width={1024} height={1024} />
        </div>
        <div className='col-span-7 col-start-6 flex flex-col gap-y-5 '>
          <p className='relative w-full max-w-[39ch] text-balance font-medium leading-snug text-[var(--second-color)] text-[1.5rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, pariatur deserunt! Repudiandae quidem consectetur dolore totam quasi hic nobis amet odit corrupti earum deleniti porro corporis, iste cumque vitae fugit.</p>
          <div className='flex gap-x-20 gap-y-3'>
            <span className='flex h-fit flex-col gap-2 overflow-clip font-mono tracking-[-0.035em]'>
              <span className='flex h-full font-medium uppercase text-nowrap text-[var(--second-color)]'>
                (About Me)
              </span>
              <Link href='/certificates' className='tag !border-[var(--second-color)] text-[var(--second-color)]'>Certificates</Link>
            </span>
            <p className='flex w-full max-w-[38ch] flex-col text-balance text-base font-medium leading-[132.5%] text-[var(--second-color)]'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat pariatur a deserunt nam debitis, ipsum consequuntur corporis ratione. 
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat pariatur a deserunt nam debitis, ipsum consequuntur corporis ratione.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}