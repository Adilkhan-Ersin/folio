// components/Navbar.tsx
'use client'
import Link from 'next/link'
import { useState, useRef} from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP);
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

//navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const overlay = useRef(null);
  const sosal = useRef(null);
  const timeline = useRef(gsap.timeline({ paused: true }));
  const hoverText = document.querySelector(".hover-text");

  const navigation = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];
  
  const navsocial = [
    { name: 'LinkedIn |', href: '#' },
    { name: 'Instagram |', href: '#' },
    { name: 'Github |', href: '#' },
    { name: 'Telegram', href: '#' },
  ];

  useGSAP(() => {
    gsap.set(".menu-item p", { y: 225 });
    //hover menu items
    hoverText?.addEventListener('mouseenter', () => timeline.current.to("p", {
      duration: 0.5,
      letterSpacing: 21,
      ease: "power4.out",
      stagger: {
        amount: 0.2,
        from: "center",
      }
    }));
    
    //menu overlay
    timeline.current.to(overlay.current, {
      duration: 1.5,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut",
    });
    //menu items
    timeline.current.to(".menu-item p", {
      duration: 1.5,
      y: 0,
      stagger: 0.2,
      ease: "power4.out",
    }, "-=1");
    //social
    timeline.current.to(sosal.current, {
      bottom: "10%",
      opacity: 1,
      duration: 0.5,
      delay: 0.8,
    }, "<");

    });

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) {
        timeline.current.play();
      } else {
        timeline.current.reverse();
      }
      return newState;
    });
  };

  return (
    <header>
      <nav className='fixed w-full flex justify-between items-center text-[color:var(--second-color)] mix-blend-difference z-50 px-8 py-6'>
        <div className='text-center text-2xl font-[Canopee]'>
          <p>Adok</p>
        </div>
        <div className='text-center text-4xl font-[Canopee]'>
          <p><Link href='/'>The Portfolio</Link></p>
        </div>
        <div className='flex justify-end'>
          <button ref={menuRef} onClick={toggleMenu} 
            className='flex justify-center items-center w-7 h-5 pt-7 pb-6 px-8 border-none outline-none'
            >
              <div className={`
              relative w-full h-full
              before:content-[''] before:absolute before:w-10 before:h-0.5 before:bg-[#fff5ed]
              before:transition-all before:duration-300 before:ease-in-out
              before:transform ${isOpen ? 'before:rotate-45 before:translate-y-0' : 'before:-translate-y-1'}
              after:content-[''] after:absolute after:w-10 after:h-0.5 after:bg-[#fff5ed]
              after:transition-all after:duration-300 after:ease-in-out
              after:transform ${isOpen ? 'after:-rotate-45 after:translate-y-0' : 'after:translate-y-1'}
              `} />
          </button>
        </div>
      </nav>

      <div ref={overlay} className={'fixed top-0 left-0 w-full h-full flex bg-[var(--matte-color)] z-10 [clip-path:polygon(0_0,100%_0,100%_0,0_0)]'}>
        <div className='fixed top-0 left-0 w-full h-full flex gap-4 flex-col justify-center items-center'>
            {navigation.map((item) => (
              <Link 
              key={item.name}
              href={item.href}
              onClick={toggleMenu}
              className='menu-item [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] relative text-center font-[Canopee] text-[260px] leading-[80%] text-[var(--second-color)] transition-[letter-spacing] duration-300 will-change-transform hover:tracking-[21px] transform-gpu'><p className='hover-text'>{item.name}</p>
              </Link>
            ))}
        </div>

        <div ref={sosal} className='absolute bottom-[5%] left-[50%] translate-x-[-50%] flex gap-2 opacity-0'>
          {navsocial.map((sosal) => (
            <Link 
              key={sosal.name}
              href={sosal.href}
              onClick={toggleMenu}
              className='font-[Canopee] text-3xl text-[var(--second-color)]'>{sosal.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
export default Navbar;