'use client';

import { Home, PlusIcon, Users2Icon } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { CreateMedia } from '@/features/media-modify';
import { Button } from '@/shared/ui/button';
import { UserButton } from '@clerk/nextjs';

const navItems = [
  { id: 'home', icon: Home, label: 'Головна' },
  { id: 'profile', icon: Users2Icon, label: 'Друзі' },
];

export default function MinimalNav() {
  const [active, setActive] = useState('home');

  return (
    <div className='fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4'>
      <div className='flex items-center gap-4 rounded-full border border-white/10 bg-black/70 p-2 shadow-xl backdrop-blur-md'>
        {navItems.map(({ id, icon: Icon }) => (
          <Button
            key={id}
            variant='ghost'
            onClick={() => setActive(id)}
            className={clsx(
              'relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200',
              active === id
                ? 'scale-105 bg-white text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <Icon size={18} />
          </Button>
        ))}

        <div className='ml-2 flex items-center'>
          <UserButton />
        </div>
      </div>
      <CreateMedia
        customTrigger={
          <div className='flex items-center gap-4 rounded-full border border-white/10 bg-black/70 p-2 shadow-xl backdrop-blur-md'>
            <Button
              variant='outline'
              className='relative flex items-center gap-2 rounded-full bg-white px-4 py-2 text-black shadow-md transition-all duration-200'
            >
              <PlusIcon size={20} />
            </Button>
          </div>
        }
      />
    </div>
  );
}
