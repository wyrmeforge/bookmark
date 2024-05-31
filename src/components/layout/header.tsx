'use client';
import React from 'react';
import { ModeToggle } from '../theme-mode-toggle';

import UserMenu from './header/user-menu';

const Header = () => {
  return (
    <div className='flex items-center justify-between px-10 pt-3'>
      <ModeToggle />
      <div className='flex items-center gap-4'>
        <UserMenu />
      </div>
    </div>
  );
};

export default Header;
