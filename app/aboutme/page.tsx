//https://cdn.dribbble.com/userupload/11736946/file/original-2d1a1b890a968d1e37dca748a3465312.mp4
'use client'
// import Image from 'next/image';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';

// const certificates = [
//   { name: 'Harvard CS50', p: 'Introduction to Programming with Python', image: '/sertificates/CS50P.png', width: 2246, height: 1588 },
//   { name: 'Harvard CS50', p: 'Web Programming with Python and JavaScript', image: '/sertificates/CS50W.png', width: 2246, height: 1588 },
//   { name: 'Coursera', p: 'Google Data Analytics', image: '/sertificates/Google.png', width: 3000, height: 2550 },
// ]
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
          <h2 className='font-medium text-3xl md:text-5xl m-0 leading-3'>Presentations</h2>
        </div>
        <div className='flex flex-col pt-4 '>
          {/* {certificates.map((certificate, index) => (
            <div key={index} className='pb-4 md:flex '>
              <Image src={certificate.image} alt={certificate.name} width={certificate.width} height={certificate.height} className='w-full md:w-[60%] max-w-[1100px] object-cover' />
              <div className='w-full md:w-[40%] flex flex-col'>
                <h3 className='font-medium md:pl-4 text-xl md:text-4xl m-0 '>{certificate.name}</h3>
                <p className='text-sm md:text-2xl font-medium md:pl-4'>{certificate.p}</p>
              </div>
            </div>
          ))} */}
          <div className='flex items-center justify-between w-full'>
            <h1 className='font-medium text-2xl md:text-4xl m-0 leading-3'>My Music Taste</h1>
            <p className='text-sm md:text-2xl font-normal'>08/08/2025</p>
          </div>
          <div style={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingTop: '56.25%',
            paddingBottom: 0,
            boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
            marginTop: '1.6em',
            marginBottom: '0.9em',
            overflow: 'hidden',
            borderRadius: '8px',
            willChange: 'transform'
          }}>
            <iframe loading="lazy" style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              border: 'none',
              padding: 0,
              margin: 0
            }} src="https://www.canva.com/design/DAGvHFGq2Xs/EiWBw46mY0V_m0ss421seg/view?embed" allowFullScreen={true} allow="fullscreen">
            </iframe>
          </div>
        </div>
      </section>
    </>
  );
}
