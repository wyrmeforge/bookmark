'use client';

import Header from '@/components/layout/header';
import Loader from '@/components/loader';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { useStoreUser } from '@/hooks/use-store-user';
import { Authenticated } from 'convex/react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useStoreUser();

  if (!isAuthenticated && isLoading) return <Loader />;

  return (
    <div className='flex h-screen flex-col overflow-hidden'>
      <Header />
      <Separator className='my-3' />
      <Authenticated>
        <main className='flex-1 overflow-hidden px-20'>{children}</main>
      </Authenticated>
    </div>
  );
};

export default DashboardLayout;
