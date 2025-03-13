'use client'
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';

export default function Custom404() {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const router = useRouter();
  const handleGoHome = () => {
    router.push('/');
  }

  const cardImg = [
    { src: "/img/utopia.png", alt: "Utopia" },
    { src: "/img/theweeknd.png", alt: "The Weeknd" },
    { src: "/img/vangoh.jpg", alt: "Van Gogh" },
    { src: "/img/lastofus.png", alt: "Last of Us" }
  ];

  useEffect(() => {
    // const cards = [
    //   { id: '#card-1', endTranslateX: -1000, rotate: 20 },
    //   { id: '#card-2', endTranslateX: -800, rotate: -15 },
    //   { id: '#card-3', endTranslateX: -1200, rotate: 30 },
    //   { id: '#card-4', endTranslateX: -1500, rotate: -45 },
    // ];

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

    // cards.forEach((card) => {
    //   ScrollTrigger.create({
    //     trigger: card.id,
    //     start: 'top top',
    //     end: '+=1200vh',
    //     scrub: 1,
    //     onUpdate: (self) => {
    //       gsap.to(card.id, {
    //         x: `${card.endTranslateX * self.progress}px`,
    //         rotate: `${card.rotate * self.progress * 2}`,
    //         duration: 0.5,
    //         ease: 'power3.out',
    //       });
    //     },
    //   });
    // });

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
          {cardImg.map((img, index) => (
            <div className="card" id={`card-${index + 1}`} key={index}>
              <Image
                className="w-full h-full object-cover"
                src={img.src}
                alt={img.alt}
                width={1600}
                height={2380}
              />
            </div>
          ))}
        </section>
        <div className="outro absolute top-0 w-full h-[100vh] opacity-0">
          <div className="absolute w-max font-light top-2/4 left-2/4 text-center transform -translate-x-1/2 -translate-y-1/2 text-[var(--second-color)]">
            <h3 className='text-[48px]'>You look lost,</h3>
            <span className='text-[32px]'>I can fix that.</span>
            <div className='mt-4 flex justify-center'>
              <button onClick={handleGoHome} className='tag-black'>Go Home</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}