'use client';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';

const works = [
  { title: "DAMN.", image: "/img/posterdamn.jpg" },
  { title: "Live at SOFI Stadium", image: "/img/posterlass.jpg"},
]

export default function Works() {
  return (
    <>
      <CustomCursor/>
      <Navbar />
      <span className='noise z-[1000]'></span>
      <section className="">
        <div className="flex flex-wrap items-end justify-between gap-4 mt-20 md:mt-15 lg:mt-10 mb-1 md:mb-4">
          <h2 className='font-[Canopee] uppercase text-3xl md:text-5xl m-0 leading-3'>Black</h2>
          <span className='text-sm md:text-2xl leading-[0.2] font-medium ml-2 inline-flex'>R&B, Pop, Hip-Hop</span>
        </div>
        <div className='pt-2 md:pt-4 pb-2 md:pb-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-5 md:gap-y-10 '>
          {works.map((work, index) => (
            <figure key={index} className="m-0 p-0 flex flex-col gap-1 overflow-hidden will-change-transform hover:scale-[0.97] transition-transform duration-500 ease-in-out">
              <div className="w-full ">
                <Image src={work.image} alt={work.title} width={4000} height={3000} className='w-full h-full object-cover' />
              </div>
              <figcaption className="flex justify-between text-base font-medium m-0 text-left" >
                <h3>{work.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}