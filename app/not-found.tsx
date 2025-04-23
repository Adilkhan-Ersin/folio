'use client'
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Custom404() {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const router = useRouter();
  const handleGoHome = () => {
    router.push('/');
  }

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.booby',
        start: 'top top',
        end: '+=1200vh',
        scrub: 1.5,
        pin: true,
      },
    });

    tl.to('.wrapped-404', {
      x: () => {
        const wrapped404 = document.querySelector('.wrapped-404');
        return wrapped404 ? `-${wrapped404.scrollWidth - window.innerWidth}px` : '0px';
      },
      ease: 'none',
    });

    gsap.to('.outro', {
      scrollTrigger: {
        trigger: '.wrapped-404',
        start: '+=1200vh',
        end: 'bottom bottom',
        scrub: 1,
      },
      opacity: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="booby w-full h-[100vh] bg-[var(--black-color)]">
        <Navbar />
        <section className="wrapped-404 p-0 absolute top-0 w-[400vw] h-screen will-change-transform bg-[var(--black-color)]">
          <h1 className="w-full text-[var(--second-color)] ps-6 text-[48vw] font-[Canopee] leading-tight font-normal m-0">Page Not Found</h1>
        </section>
        <div className="outro absolute top-0 w-full h-[100vh] opacity-0">
          <div className="absolute w-max font-light top-2/4 left-2/4 text-center transform -translate-x-1/2 -translate-y-1/2 text-[var(--second-color)]">
            <h3 className='text-[48px] font-bold'>You look lost,</h3>
            <span className='text-[32px] font-bold'>I can fix that.</span>
            <div className='mt-4 flex justify-center'>
              <button onClick={handleGoHome} className='tag-black'>Go Home</button>
            </div>
          </div>
        <Image src='/img/404.jpg' alt='404' width={1920} height={960} className='w-full h-full object-cover' />
        </div>
      </div>
    </>
  );
}