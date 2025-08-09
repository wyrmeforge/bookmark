'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Home, Users, Settings, Plus } from 'lucide-react';

export const FloatingMobileMenu = () => {
  const router = useRouter();

  const leftItems = [{ label: 'Home', icon: Home, href: '/home' }];
  const rightItems = [
    { label: 'Friends', icon: Users, href: '/friends' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <nav
      className='
        fixed bottom-6 left-1/2 z-50 flex h-10 w-[90vw] max-w-md 
        -translate-x-1/2 items-center justify-between
        rounded-2xl border 
        border-white/20 
        bg-black/70 shadow-[0_4px_30px_rgba(0,0,0,0.7)]
        backdrop-blur-md
        md:hidden
      '
      aria-label='Mobile navigation'
    >
      {/* Left nav */}
      <div className='flex space-x-8 px-6 py-3'>
        {leftItems.map(({ label, icon: Icon, href }) => (
          <Button
            key={label}
            variant='ghost'
            className='
              rounded-full p-3 
              text-white 
              transition 
              duration-200 
              ease-in-out 
              hover:bg-white/20
              active:scale-95
            '
            onClick={() => router.push(href)}
            aria-label={label}
          >
            <Icon className='h-6 w-6' />
          </Button>
        ))}
      </div>

      {/* Right nav */}
      <div className='flex space-x-8 px-6 py-3'>
        {rightItems.map(({ label, icon: Icon, href }) => (
          <Button
            key={label}
            variant='ghost'
            className='
              rounded-full p-3 
              text-white 
              transition 
              duration-200 
              ease-in-out
              hover:bg-white/20
              active:scale-95
            '
            onClick={() => router.push(href)}
            aria-label={label}
          >
            <Icon className='h-6 w-6' />
          </Button>
        ))}
      </div>

      {/* Big Plus Button centered and lifted */}
      <Button
        variant='default'
        onClick={() => router.push('/add')}
        aria-label='Add'
        className='
          absolute
          left-1/2 
          top-1/2
          h-12
          -translate-x-1/2 
          -translate-y-1/2 
          rounded-full 
          bg-gradient-to-tr
          from-pink-600
          via-red-500 to-yellow-400 p-6 shadow-xl
          transition
          duration-300
          ease-in-out
          hover:brightness-110
          active:scale-95
        '
        style={{ boxShadow: '0 0 15px 4px rgba(255, 100, 120, 0.7)' }}
      >
        <Plus className='h-12 w-12 text-white' />
      </Button>
    </nav>
  );
};
