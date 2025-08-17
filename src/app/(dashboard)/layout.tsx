'use client';

import { useStoreUser } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader';
import { PropsWithChildren } from 'react';
import MinimalNav from './home/components/menu';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { isLoading, isAuthenticated } = useStoreUser();

  if (isLoading || !isAuthenticated) return <Loader />;

  return (
    <div className='relative flex h-dvh flex-col '>
      <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
        <div
          className='absolute rounded-full bg-red-900 opacity-30 blur-[120px]'
          style={{ width: 320, height: 320, top: -80, left: -100 }}
        />
        <div
          className='absolute rounded-full bg-red-800 opacity-25 blur-[140px]'
          style={{ width: 400, height: 400, bottom: -140, right: -130 }}
        />
        <div
          className='absolute rounded-full bg-red-700 opacity-20 blur-[160px]'
          style={{ width: 300, height: 300, top: 120, right: 50 }}
        />
      </div>

      <MinimalNav />
      <main className='w-full flex-1 px-2 md:px-20'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
