'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { navLinks } from '../config/nav-links';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className='flex items-center gap-6'>
      {navLinks.map(({ labelIcon: Icon, ariaLabel, href }) => {
        const isActive = pathname.startsWith(href) || pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'p-1 transition-transform hover:scale-110',
              isActive && 'text-white',
              !isActive && 'text-gray-400'
            )}
          >
            <Icon aria-label={ariaLabel} size={20} />
          </Link>
        );
      })}
    </nav>
  );
};

export { Navigation };
