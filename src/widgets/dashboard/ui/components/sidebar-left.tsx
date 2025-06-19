'use client';

import { Routes } from '@/shared/enums/routes';
import { Button } from '@/shared/ui/button';
import { useClerk } from '@clerk/nextjs';
import { Grid3X3Icon, ListIcon, LogOutIcon } from 'lucide-react';

const SidebarLeft = () => {
  const { signOut } = useClerk();

  return (
    <>
      <div className='fixed bottom-10 left-5 flex flex-col gap-4'>
        <LogOutIcon
          className='hover:cursor-pointer'
          aria-label='Logout'
          onClick={() => signOut({ redirectUrl: Routes.SignIn })}
        />
      </div>
      <div className='fixed bottom-1/2 left-5 flex translate-y-1/2 flex-col gap-4'>
        <Button
          size='icon'
          className='m-0 size-6 bg-transparent p-0 [&_svg]:size-6'
        >
          <Grid3X3Icon color='white' />
        </Button>
        <Button
          size='icon'
          className='m-0 size-6 bg-transparent p-0 [&_svg]:size-6'
        >
          <ListIcon color='grey' />
        </Button>
      </div>
    </>
  );
};

export { SidebarLeft };
