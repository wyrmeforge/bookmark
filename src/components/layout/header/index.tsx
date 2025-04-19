'use client';

import UserMenu from './user-menu';

const Header = () => {
  return (
    <header className='flex items-center justify-end px-20'>
      <UserMenu />
    </header>
  );
};

export default Header;
