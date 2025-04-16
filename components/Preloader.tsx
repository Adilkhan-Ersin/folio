'use client';
import { useEffect, useState } from 'react'
// import { gsap } from 'gsap'
import React from 'react'

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"]

const Preloader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if(index === words.length - 1) return;
    setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);
  }, [index]);

  
  return (
    <div className="h-screen w-screen flex items-center justify-center fixed z-[99] bg-[var(--black-color)]">
      <p className="flex text-[var(--second-color)] text-5xl items-center absolute z-[1]">{words[index]}</p>
    </div>
  )
}

export default Preloader