'use client';

import Header from '@/components/layout/header';
import Loader from '@/components/loader';
import { Separator } from '@/components/ui/separator';
import { useStoreUserEffect } from '@/hooks/useStoreUserEffect';
import React from 'react';

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayoutProps) => {
  const { isAuthenticated, isLoading } = useStoreUserEffect();

  return (
    <div className='flex h-full min-h-screen grow flex-col'>
      <Header />
      <Separator className='my-3' />
      {isAuthenticated && !isLoading ? children : <Loader />}
    </div>
  );
};

export default DashboardLayout;
