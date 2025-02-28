// components/Hero.tsx
'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

interface BentoTiltProps {
  children: React.ReactNode;
  className?: string;
}
export const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div ref={itemRef} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transform: transformStyle }}>
      {children}
    </div>
  );
};

export default function Projects() {
  // const setCurrentIndex = useRef(0);
  const numbersRef = useRef(null);

  const works = [
    { title: "Utopia", secondTitle: "Poster Design", image: "/img/utopia.png", link: "/projects", tag: "Design", },
    { title: "The Weeknd", secondTitle: "Poster Design", image: "/img/theweeknd.png", link: "/projects", tag: "Design", },
    { title: "Greg", secondTitle: "Poster Design", image: "/img/grok.png", link: "/projects", tag: "Design", },
    { title: "Paper Ice", secondTitle: "PFP", image: "/img/paperIce.png", link: "/projects", tag: "Design", },
    { title: "Ice OG", secondTitle: "Digital Art", image: "/img/ice.png", link: "/projects", tag: "Design", },
  ]

  // useGSAP(() => {
  //   const containers = document.querySelectorAll('.containers');

  //   if (!numbersRef.current || containers.length <= 1) return;
    
  //   containers.forEach((container, index) => {
  //     if (index === 0) return; // Skip for the first container as we start with 1 visible
      
  //     ScrollTrigger.create({
  //       trigger: container,
  //       start: "top 80%", // When the top of container reaches 80% of viewport height
  //       onEnter: () => {
  //         gsap.to(numbersRef.current, {
  //           y: `-${index * 100}%`,
  //           duration: 0.5,
  //           ease: "power2.inOut"
  //         });
  //         setCurrentIndex.current = index;
  //       },
  //       onLeaveBack: () => {
  //         // When scrolling back up
  //         gsap.to(numbersRef.current, {
  //           y: `-${(index-1) * 100}%`,
  //           duration: 0.5,
  //           ease: "power2.inOut"
  //         });
  //         setCurrentIndex.current = index - 1;
  //       }
  //     });
  //   });

  //   return () => {
  //     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  //   };
  // }, []);

  return (
    <section className="project-section" id='projects'>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-[var(--pr-color)] text-[4.375vw]">Selected Works</h2>
      </div>
      <div className="grid grid-cols-12 h-full pt-5 gap-[2.5vw]">
        <div  className="sticky top-12 col-span-5 h-fit w-full overflow-hidden text-[20vw]  leading-[0.9] flex">
          <span className="relative">0</span>
          <div className="relative">
            <div ref={numbersRef} className="absolute flex h-full w-fit flex-col transition-all duration-1000 ease-in-out-cubic" style={{ transform: 'translateY(0%)' }}>
              <span className="inline-block">1.</span>
              <span className="inline-block">2.</span>
              <span className="inline-block">3.</span>
              <span className="inline-block">4.</span>
              <span className="inline-block">5.</span>
            </div>
          </div>
        </div>
        <aside className="relative col-span-7 flex flex-col gap-y-2">
          {works.map((work, index) => (
            <div key={index} className="@container containers min-h-[80vh] pb-5">
              <Link href={work.link}>
                <BentoTilt className="relative transition-transform duration-300 ease-out flex aspect-square items-center justify-center overflow-clip rounded-md p-3">
                  <Image className='absolute h-full w-full object-cover' src={work.image} alt="poster" width={1309} height={1000} />
                </BentoTilt>
                <div className="flex justify-between gap-2 pt-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-sm font-medium">{work.secondTitle}</span>
                    <h3 className="w-fit text-4xl font-semibold">{work.title}</h3>
                  </div>
                  <div className="flex items-end gap-2 tracking-[0]">
                    <span className="tag">{work.tag}</span>
                    <span className="tag">Development</span>
                    <span className="tag">2024</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </aside>
      </div>
    </section>
  )
  
}