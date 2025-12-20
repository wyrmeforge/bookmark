'use client';

import { useCreateMediaShortcut, useStoreUser } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader';
import { PropsWithChildren } from 'react';
import MinimalNav from './home/components/menu';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { isLoading, isAuthenticated } = useStoreUser();
  useCreateMediaShortcut();

  if (isLoading || !isAuthenticated) return <Loader />;

  return (
    <div className='relative flex h-dvh flex-col overflow-x-hidden'>
      {/* Decorative blurred white backgrounds */}
      <div className='pointer-events-none fixed -left-24 top-1/3 h-96 w-96 rounded-full bg-white/30 blur-3xl' />
      <div className='pointer-events-none fixed -right-24 h-96 w-96 rounded-full bg-white/30 blur-3xl' />

      <MinimalNav />
      <main className='w-full flex-1 px-2 md:px-20'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
