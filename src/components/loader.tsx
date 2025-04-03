import Image from 'next/image';
import React from 'react';

const Loader = () => (
  <div className='fixed left-0 top-0 z-50 h-screen w-screen bg-stone-950/80'>
    <Image
      priority
      role='status'
      className='!fixed left-1/2 top-1/2 inline-block h-40 w-40 -translate-x-1/2 -translate-y-1/2'
      width={150}
      height={70}
      alt='anime'
      src='/cat-loader.gif'
    />
  </div>
);

export default Loader;
