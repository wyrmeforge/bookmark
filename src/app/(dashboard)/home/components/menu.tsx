'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Home, Users, Settings, Plus } from 'lucide-react';

export const FloatingMobileMenu = () => {
  const router = useRouter();

  // Nav items split left and right
  const leftItems = [{ label: 'Home', icon: Home, href: '/home' }];
  const rightItems = [
    { label: 'Friends', icon: Users, href: '/friends' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <nav className='fixed bottom-4 left-1/2 z-50 flex w-[90vw] max-w-md -translate-x-1/2 items-center justify-between rounded-xl bg-background/90 px-6 py-2 shadow-lg backdrop-blur-md md:hidden'>
      {/* Left side nav */}
      <div className='flex space-x-6'>
        {leftItems.map(({ label, icon: Icon, href }) => (
          <Button
            key={label}
            variant='ghost'
            className='rounded-full p-3 hover:bg-muted'
            onClick={() => router.push(href)}
            aria-label={label}
          >
            <Icon className='h-6 w-6' />
          </Button>
        ))}
      </div>

      {/* Right side nav */}
      <div className='flex space-x-6'>
        {rightItems.map(({ label, icon: Icon, href }) => (
          <Button
            key={label}
            variant='ghost'
            className='rounded-full p-3 hover:bg-muted'
            onClick={() => router.push(href)}
            aria-label={label}
          >
            <Icon className='h-6 w-6' />
          </Button>
        ))}
      </div>

      {/* Big Plus Button centered overlay */}
      <Button
        variant='default'
        onClick={() => router.push('/add')}
        aria-label='Add'
        className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full p-5 shadow-lg'
      >
        <Plus className='h-10 w-10' />
      </Button>
    </nav>
  );
};
