'use client';

import { Routes } from '@/shared/enums/routes';
import { useClerk } from '@clerk/nextjs';
import { LogOutIcon } from 'lucide-react';

const SidebarLeft = () => {
  const { signOut } = useClerk();

  return (
    <>
      <div className='fixed bottom-10 left-5 hidden flex-col gap-4 md:flex'>
        <LogOutIcon
          className='hover:cursor-pointer'
          aria-label='Logout'
          onClick={() => signOut({ redirectUrl: Routes.SignIn })}
        />
      </div>
    </>
  );
};

export { SidebarLeft };
