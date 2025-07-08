'use client';

import { useStoreUser } from '@/shared/lib/auth/use-store-user';
import { Loader } from '@/shared/ui/loader';
import { Header } from '@/widgets/header';
import { PropsWithChildren } from 'react';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { isLoading, isAuthenticated } = useStoreUser();

  if (isLoading || !isAuthenticated) return <Loader />;

  return (
    <div className='relative flex h-screen flex-col'>
      <Header />
      <main className='flex-1 px-2 md:px-20'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
