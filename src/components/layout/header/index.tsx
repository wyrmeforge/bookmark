'use client';
import { useContext } from 'react';

import { MenuIcon, Search } from 'lucide-react';

import UserMenu from './user-menu';
import { LayoutViewButton } from './layout-view-button';
import { Button } from '@/components/ui/button';
import { AppStateContext } from '@/components/providers/app-state-provider';

const Header = () => {
  const { toggleFilterPanel } = useContext(AppStateContext);

  return (
    <header className='flex items-center justify-end px-4 pt-3 sm:justify-between sm:px-20'>
      <div className='hidden sm:flex'>
        <Button className='-ml-20' onClick={toggleFilterPanel} variant='ghost'>
          <MenuIcon />
        </Button>
      </div>
      <div className='flex items-center gap-4'>
        <LayoutViewButton />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
