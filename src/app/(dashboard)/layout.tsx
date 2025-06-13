'use client';

import { Header } from '@/widgets/header';
import { Authenticated } from 'convex/react';
import { PropsWithChildren } from 'react';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='relative flex h-screen flex-col overflow-hidden'>
      {/* Glass blur overlay */}
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[#0d1b2a]/20 backdrop-blur-md' />
      {/* Glass circles */}
      <div className='pointer-events-none absolute -left-40 top-1/4 -z-10 h-96 w-96 rounded-full bg-white/30 blur-2xl filter backdrop-blur-lg' />
      <div className='pointer-events-none absolute -right-40 top-1/2 -z-10 h-96 w-96 rounded-full bg-white/20 blur-2xl filter backdrop-blur-xl' />

      {/* Content layer */}
      <Header />
      <Authenticated>
        <main className='flex-1 overflow-hidden px-20'>{children}</main>
      </Authenticated>
    </div>
  );
};

export default DashboardLayout;
