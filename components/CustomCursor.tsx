'use client'
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Track current position for the follow cursor
  const posX = useRef(0);
  const posY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
    };

    // Add mousemove event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Set up GSAP ticker
    const ticker = gsap.ticker.add(() => {
      // Smoothly follow the cursor with delay
      posX.current += (position.x - posX.current) / 7;
      posY.current += (position.y - posY.current) / 7;

      // Update cursor positions
      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          left: position.x - 5,
          top: position.y - 5
        });
      }

      if (followRef.current) {
        gsap.set(followRef.current, {
          left: posX.current - 15,
          top: posY.current - 15
        });
      }
    });

    // Disable cursor on mobile devices
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Clean up event listeners and GSAP ticker
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, [position]);

  useEffect(() => {
    // Add hover effects to interactive elements
    if (typeof document === 'undefined') return;
    const interactiveElements = document.querySelectorAll(
      'Button, button, a'
    );

    const handleMouseEnter = () => {
      cursorRef.current?.classList.add('active');
      followRef.current?.classList.add('active');
    };

    const handleMouseLeave = () => {
      cursorRef.current?.classList.remove('active');
      followRef.current?.classList.remove('active');
    };

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Clean up event listeners
    return () => {
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={followRef} className="follow"></div>
    </>
  );
};

export default CustomCursor;