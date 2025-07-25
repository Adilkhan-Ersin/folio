'use client'
import React from 'react';
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { useRouter } from 'next/navigation';
export default function Custom404() {
  const router = useRouter(); 
  const handleGoHome = () => {
    router.push('/');
  }

  return (
    <>
      <CustomCursor />
      <div className="w-full min-h-screen bg-[var(--black-color)] overflow-hidden">
        <Navbar />
        <section className="p-0 h-screen w-screen flex flex-col justify-center items-center gap-5">
          <h1 className="w-full text-[var(--second-color)] text-5xl md:text-8xl font-[Canopee] leading-none text-center font-normal m-0">
            Page Not Found
          </h1>
          <div className='flex justify-center'>
            <button onClick={handleGoHome} className='tag-black text-[var(--second-color)] text-sm md:text-lg'>Go Home</button>
          </div>
        </section>
      </div>
    </>
  );
}