import React from 'react';

const Loader = () => {
  return (
    <div className='fixed left-0 top-0 z-50 h-screen w-screen bg-black/70'>
      <div
        className='!fixed left-1/2 top-1/2 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      ></div>
    </div>
  );
};

export default Loader;
