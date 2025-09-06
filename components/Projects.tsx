// components/Hero.tsx
'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
  const setCurrentIndex = useRef(0);
  const numbersRef = useRef(null);
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const works = [
    { title: "LiftUp", secondTitle: "Website", image: "/img/hopecore.jpg", link: "https://liftup-hopecore.vercel.app/", tag: "Development", tag2: "Landing Page", tag3: "2025", openInNewTab: true },
    { title: "The Weeknd", secondTitle: "Poster Design", image: "/img/posterlass.jpg", link: "/projects", tag: "Design", tag2: "Music", tag3: "2024", openInNewTab: false },
    { title: "Tennis Club", secondTitle: "Website", image: "/img/tennis1.jpg", link: "https://tennisdemo.webflow.io/", tag: "Development", tag2: "Landing Page", tag3: "2024", openInNewTab: true },
    { title: "Damn", secondTitle: "Poster Design", image: "/img/posterdamn.jpg", link: "/projects", tag: "Design", tag2: "Music", tag3: "2024", openInNewTab: false },
    { title: "Happy Birthday", secondTitle: "Website", image: "/img/happy.jpg", link: "https://kamilya-happy.vercel.app/", tag: "Development", tag2: "Landing Page", tag3: "2024", openInNewTab: true },
  ];

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 800);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useGSAP(() => {
    if (isMobile || !numbersRef.current || containerRef.current.length <= 1) return;
    
    containerRef.current.forEach((container, index) => {
      if (!container || index === 0) return; // Skip for the first container as we start with 1 visible
      
      ScrollTrigger.create({
        trigger: container,
        start: "top 80%", // When the top of container reaches 80% of viewport height
        onEnter: () => {
          gsap.to(numbersRef.current, {
            y: `-${index * 100}%`,
            duration: 0.5,
            ease: "power2.inOut"
          });
          setCurrentIndex.current = index;
        },
        onLeaveBack: () => {
          // When scrolling back up
          gsap.to(numbersRef.current, {
            y: `-${(index-1) * 100}%`,
            duration: 0.5,
            ease: "power2.inOut"
          });
          setCurrentIndex.current = index - 1;
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section className="project-section" id='projects'>
      <div className="flex flex-col">
        <h2 className="text-[var(--pr-color)] text-5xl lg:text-[4.375vw]">Selected Works</h2>
      </div>
      <div className="grid grid-cols-12 h-full pt-5 gap-[2.5vw]">
        <div  className="numbers sticky top-12 col-span-5 h-fit w-full overflow-hidden text-[20vw] leading-[0.9] flex">
          <span className="relative font-[canopee]">0</span>
          <div className="relative">
            <div ref={numbersRef} className="absolute font-[canopee] flex h-full w-fit flex-col transition-all duration-1000 ease-in-out-cubic" style={{ transform: 'translateY(0%)' }}>
              <span className="inline-block">1.</span>
              <span className="inline-block">2.</span>
              <span className="inline-block">3.</span>
              <span className="inline-block">4.</span>
              <span className="inline-block">5.</span>
            </div>
          </div>
        </div>
        <aside className="relative col-span-12 lg:col-span-7 flex flex-col gap-y-2">
          {works.map((work, index) => (
            <div key={index} ref={(el) => { containerRef.current[index] = el; }} className="@container containers lg:min-h-[80vh] pb-4 lg:pb-5">
              <Link href={work.link} target={work.openInNewTab ? "_blank" : "_self"} rel={work.openInNewTab ? "noopener noreferrer" : ""}>
                <BentoTilt className="relative transition-transform duration-300 ease-out flex aspect-[5/4] items-center justify-center overflow-clip rounded-md p-3">
                  <Image className='absolute h-full w-full object-cover' src={work.image} alt={work.title} width={4000} height={3000} />
                </BentoTilt>
                <div className="flex flex-col pt-2">
                  <div className="flex items-center justify-between lg:items-end gap-2 tracking-[0]">
                    <span className="font-mono text-sm lg:text-lg font-medium">{work.secondTitle}</span>
                    <div className='flex items-center gap-2'>
                      <span className="tag">{work.tag}</span>
                      <span className="tag">{work.tag2}</span>
                      <span className="tag">{work.tag3}</span>
                    </div>
                  </div>
                  <div className="flex w-full">
                      <h3 className="flex text-4xl gap-2 font-semibold">{work.title}</h3>
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