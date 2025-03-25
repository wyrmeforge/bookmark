'use client';

import Header from '@/components/layout/header';
import Loader from '@/components/loader';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { useStoreUser } from '@/hooks/use-store-user';

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayoutProps) => {
  const { isAuthenticated, isLoading } = useStoreUser();

  if (!isAuthenticated && isLoading) return <Loader />;

  return (
    <div className='flex h-full min-h-screen grow flex-col'>
      <Header />
      <Separator className='my-3' />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
