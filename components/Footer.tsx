// components/Hero.tsx
'use client'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowUp } from 'react-icons/fa';
import Button from './Button';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  useEffect(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
  }, []);

  const menu = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const social = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ersinadilkhan/' },
    { name: 'Instagram', href: 'https://www.instagram.com/adilikecious/' },
    { name: 'Github', href: 'https://github.com/Adilkhan-Ersin' },
    { name: 'Telegram', href: 'https://t.me/Adilkhan51' },
  ]

  const resources = [
    { name: 'Certificates', href: '/certificates' },
    { name: 'My Music', href: '/aboutme' },
    { name: 'Coming Soon', href: 'https://youtu.be/dQw4w9WgXcQ?si=fU7dmJga1UR4CmjU' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useGSAP(() => {
  });

  return (
    <footer style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}} className="h-[440px] md:h-[310px] lg:h-[350px] footer-padding relative flex flex-col items-center justify-center gap-y-5" id='contact'>
      <div className='fixed bottom-0 h-[440px] md:h-[310px] lg:h-[350px] w-[100%] footer-padding'>
        <div className='grid gap-5 w-full grid-cols-2 gap-y-5 text-base md:grid-cols-12'>
          <div className='flex flex-col md:col-span-6'>
            <h3 className='mb-3 flex border-b-[1.5px] border-[var(--black-color)] pb-2 font-bold tracking-[0] '>Menu</h3>
            {menu.map((item, index) => (
              <a key={index} href={item.href} className="group pb-1 relative flex h-fit w-fit overflow-hidden font-medium ">
                <span className='relative inline-flex overflow-hidden'>
                  <div className='translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12'>{item.name}</div>
                  <div className='absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0'>{item.name}</div>
                </span>
              </a>
            ))}
          </div>
          <div className='flex flex-col md:col-span-3'>
            <h3 className='mb-3 flex border-b-[1.5px] border-[var(--black-color)] pb-2 font-bold tracking-[0] '>Social</h3>
            {social.map((item, index) => (
              <a key={index} href={item.href} target='_blank' rel='noopener noreferrer' className="group pb-1 relative flex h-fit w-fit overflow-hidden font-medium ">
                <span className='relative inline-flex overflow-hidden'>
                  <div className='translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12'>{item.name}</div>
                  <div className='absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0'>{item.name}</div>
                </span>
              </a>
            ))}
          </div>
          <div className='col-span-2 flex flex-col md:col-span-3'>
            <h3 className='mb-3 flex border-b-[1.5px] border-[var(--black-color)] pb-2 font-bold tracking-[0] '>Other</h3>
            {resources.map((item, index) => (
              <a key={index} href={item.href} className="group pb-1 relative flex h-fit w-fit overflow-hidden font-medium ">
                <span className='relative inline-flex overflow-hidden'>
                  <div className='translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12'>{item.name}</div>
                  <div className='absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0'>{item.name}</div>
                </span>
              </a>
            ))}
            <Link href='/mylove' className="group pb-1 relative flex h-fit w-fit overflow-hidden font-medium ">
              <span className='relative inline-flex overflow-hidden'>
                <div className='translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12'>Egg</div>
                <div className='absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0'>Egg</div>
              </span>
            </Link>
          </div>
        </div>
        <div className='flex gap-5 w-full  items-end justify-between lg:grid lg:grid-cols-12'>
          <span className='flex footer-text text-[16px] md:text-[24px] font-normal leading-tight text-[var(--black-color)] md:col-span-6'>
            <span>&copy; {new Date().getFullYear()} Ersin Adilkhan. All rights reserved</span>
          </span>
          <div className='lg:h-fit lg:w-full justify-end md:col-span-6 md:flex'>
            <div className='w-fit'>
              <Button aria-label='Scroll to top' onClickThug={scrollToTop} icon={<FaArrowUp className='text-[var(--second-color)] footer-circle w-[2rem] h-[2rem]' />} containerClass='group relative flex w-fit flex-col items-center justify-center rounded-full overflow-hidden bg-[var(--black-color)] footer-black p-[2rem] duration-1000 ease-expo hover:scale-90 md:flex'></Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}