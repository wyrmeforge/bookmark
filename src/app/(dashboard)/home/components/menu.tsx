'use client';

import {
  Home,
  // LibraryIcon,
  PlusIcon,
  // Users2Icon,
  WebhookIcon,
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/shared/ui/button';
import { UserButton } from '@clerk/nextjs';
import { MediaSearch } from '@/features/media-search';
import { usePathname, useRouter } from 'next/navigation';
import { Routes } from '@/shared/enums';
import { CreateMedia } from '@/widgets/media/create/create-media';

const navItems = [
  { id: '/home', icon: Home, label: 'Головна', href: Routes.Home },
  // { id: 'friends', icon: Users2Icon, label: 'Друзі' },
  // { id: 'stats', icon: LibraryIcon, label: 'Статистика' },
];

export default function MinimalNav() {
  const router = useRouter();
  const [active, setActive] = useState('home');
  const pathname = usePathname();

  const handleItemClick = ({ href, id }: { href: Routes; id: string }) => {
    if (active === id) return;

    setActive(id);
    router.push(href);
  };

  return (
    <div className='fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 md:relative md:bottom-[unset] md:top-4 md:w-full md:justify-between md:gap-4 md:px-20 md:pb-4'>
      <div className='w-[310px]'>
        <div className='flex h-14 w-fit items-center gap-4 rounded-full border border-white/10 bg-black/70 p-2 px-4 shadow-xl backdrop-blur-md md:flex'>
          <div className='flex flex-row items-center gap-2'>
            <WebhookIcon className='h-6 w-6' />
            <p className='hidden text-sm font-bold md:block'>YOOKOSO</p>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='flex items-center gap-1 rounded-full border border-white/10 bg-black/70 p-2 shadow-xl backdrop-blur-md md:gap-4'>
          {navItems.map(({ id, href, icon: Icon, label }) => (
            <Button
              key={id}
              variant='ghost'
              onClick={() => handleItemClick({ href, id })}
              className={clsx(
                'relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200',
                pathname === id
                  ? 'scale-105 bg-white text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              <Icon size={18} />
              {pathname === id && (
                <span className='hidden text-sm md:block'>{label}</span>
              )}
            </Button>
          ))}

          <div
            onClick={() => setActive('profile')}
            className={clsx(
              'relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200',
              active === 'profile'
                ? 'scale-105 bg-white text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <UserButton />
            {active === 'profile' && (
              <span className='hidden text-sm md:block'>Профіль</span>
            )}
          </div>
        </div>
      </div>

      <div className='flex flex-row items-center gap-2 rounded-full border border-white/10 bg-black/70 p-2  shadow-xl backdrop-blur-md'>
        <MediaSearch />
        <CreateMedia
          customTrigger={
            <Button className='relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200'>
              <PlusIcon size={20} />

              <span className='hidden text-sm  md:block'>Додати</span>
              <kbd className='ml-auto hidden rounded border px-1 text-xs sm:inline-block'>
                Ctrl+D
              </kbd>
            </Button>
          }
        />
      </div>
    </div>
  );
}
