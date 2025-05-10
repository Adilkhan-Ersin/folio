//https://cdn.dribbble.com/userupload/11736946/file/original-2d1a1b890a968d1e37dca748a3465312.mp4
'use client'
import Image from 'next/image';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';

const certificates = [
  { name: 'Harvard CS50', p: 'Introduction to Programming with Python', image: '/sertificates/CS50P.png', width: 2246, height: 1588 },
  { name: 'Harvard CS50', p: 'Web Programming with Python and JavaScript', image: '/sertificates/CS50W.png', width: 2246, height: 1588 },
  { name: 'Coursera', p: 'Google Data Analytics', image: '/sertificates/Google.png', width: 3000, height: 2550 },
]
export default function Certifications() {
  useEffect(() => {
      ( async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default;
          new LocomotiveScroll();
        }
      )()
    }, []);
  return (
    <>
      <CustomCursor />
      <Navbar />
      <span className='noise z-[1000]'></span>
      <section className="h-screen ">
        <div className="flex flex-wrap gap-4 mt-20 md:mt-15 lg:mt-10 mb-1 md:mb-4">
          <h2 className='font-medium text-3xl md:text-5xl m-0 leading-3'>Certificates</h2>
        </div>
        <div className='flex flex-col pt-4 '>
          {certificates.map((certificate, index) => (
            <div key={index} className='pb-4 md:flex '>
              <Image src={certificate.image} alt={certificate.name} width={certificate.width} height={certificate.height} className='w-full md:w-[60%] max-w-[1100px] object-cover' />
              <div className='w-full md:w-[40%] flex flex-col'>
                <h3 className='font-medium md:pl-4 text-xl md:text-4xl m-0 '>{certificate.name}</h3>
                <p className='text-sm md:text-2xl font-medium md:pl-4'>{certificate.p}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
