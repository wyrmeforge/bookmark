'use client';

import React from 'react';
import HomeHeader from './_components/header';
import SidebarMenu from '@/features/sidebar-menu';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full gap-6'>
      <SidebarMenu />
      <div className='flex h-full grow flex-col gap-4 px-4 pb-20 transition-all sm:pb-10 sm:pl-6 sm:pr-20'>
        <HomeHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
