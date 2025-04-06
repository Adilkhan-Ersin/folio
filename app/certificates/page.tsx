//https://cdn.dribbble.com/userupload/11736946/file/original-2d1a1b890a968d1e37dca748a3465312.mp4
'use client'
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false
});

export default function Certifications() {
  const certificates = [
    {
      name: 'CS50P',
      image: '/sertificates/CS50P.png',
      width: 2246,
      height: 1588
    },
    {
      name: 'CS50W',
      image: '/sertificates/CS50W.png',
      width: 2246,
      height: 1588
    },
    {
      name: 'Google',
      image: '/sertificates/Google.png',
      width: 3000,
      height: 2550
    },
  ]
    
  return (
    <>
      <CustomCursor />
      <Navbar />
      <section className="w-screen h-screen flex flex-col items-center  gap-10" id='hero'>
        {certificates.map((certificate, index) => (
          <div key={index} className='w-[65%] flex items-center'>
            <Image src={certificate.image} alt={certificate.name} width={certificate.width} height={certificate.height} className='w-full h-full object-cover' />
          </div>
        ))}
      </section>
    </>
  );
}
