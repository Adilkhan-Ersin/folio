'use client'
import React, { useRef } from 'react';
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

gsap.registerPlugin( ScrollTrigger);
export default function Custom404() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the main container (.booby)
  const wrapperRef = useRef<HTMLElement>(null); // Ref for the scrolling element (.wrapped-404)
  const outroRef = useRef<HTMLDivElement>(null); 
  const handleGoHome = () => {
    router.push('/');
  }

  useGSAP(() => {
    if (!wrapperRef.current || !outroRef.current) {
      console.warn('Refs are not set correctly.');
      return;
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${wrapperRef.current!.offsetWidth * 2}`,
        scrub: 1.5,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to(wrapperRef.current, {
      x: () => {
        const scrollDistance = wrapperRef.current!.scrollWidth - window.innerWidth;
        return `-${scrollDistance * 3}px`;
      },
      ease: 'none',
    });

    gsap.to(outroRef.current, { // Use the ref
      scrollTrigger: {
        trigger: containerRef.current, // Trigger based on the main container scroll
        start: '90% top', // Start fading in when 90% of the scroll animation is done
        end: 'bottom bottom', // Fully visible at the end
        scrub: 1,
      },
      opacity: 1,
    });
  }, { scope: containerRef, dependencies: [] });

  return (
    <>
      <CustomCursor />
      <div ref={containerRef} className="booby w-full min-h-screen bg-[var(--black-color)] overflow-hidden">
        <Navbar />
        <section ref={wrapperRef} className="wrapped-404 p-0 absolute top-0 w-[400vw] h-screen will-change-transform bg-[var(--black-color)] flex items-center">
          <h1 className="w-full text-[var(--second-color)] ps-6 text-[clamp(400px,48vw,1100px)] font-[Canopee] leading-none font-normal m-0 whitespace-nowrap">
            Page Not Found
          </h1>
        </section>
        <div ref={outroRef} className="outro absolute inset-0 w-full h-screen opacity-0 pointer-events-none z-30">
          <div className="absolute w-max font-light top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2 text-[var(--second-color)] pointer-events-auto">
            <h3 className='text-[48px] font-bold'>You look lost,</h3>
            <span className='text-[32px] font-bold'>I can fix that.</span>
            <div className='mt-4 flex justify-center'>
              <button onClick={handleGoHome} className='tag-black'>Go Home</button>
            </div>
          </div>
          <Image src='/img/404.jpg' alt='Abstract background image indicating an error or being lost' width={1920} height={960} className='w-full h-full object-cover -z-10' />
        </div>
      </div>
    </>
  );
}