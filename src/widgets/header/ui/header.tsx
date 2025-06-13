import {
  HeartIcon,
  HomeIcon,
  PieChartIcon,
  SearchIcon,
  UsersRound,
  WebhookIcon,
} from 'lucide-react';
import UserMenu from './user-menu';
import SearchInput from '@/features/search-input';
import { useState } from 'react';

const Header = () => {
  return (
    <header className='z-20 flex items-center justify-between px-20 py-4'>
      <div className='flex flex-row items-center gap-2'>
        <WebhookIcon size={36} /> <p>YOKOSO</p>
      </div>
      <div className='-ml-9 flex items-center gap-8'>
        <HomeIcon size={20} />
        <PieChartIcon size={20} color='grey' />
        <SearchInput />
        <HeartIcon color='grey' size={20} />
        <UsersRound size={20} color='grey' />
      </div>
      {/* <UserMenu /> */}
    </header>
  );
};

export { Header };
