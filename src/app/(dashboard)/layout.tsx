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
      <MinimalNav />
      <main className='w-full flex-1 px-2 md:px-20'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
