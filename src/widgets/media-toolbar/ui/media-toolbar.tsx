import Search from '@/features/search';
import { FiltersToggleGroup } from './filters-toggle-group';
// import { SettingsIcon } from 'lucide-react';

export const MediaToolbar = () => (
  <div className='flex items-center justify-between py-2 md:py-4'>
    <div className='w-[80%] md:overflow-hidden'>
      <FiltersToggleGroup />
    </div>
    <div className='flex flex-row items-center gap-4'>
      <Search />
      {/* <SettingsIcon
        aria-label='Toggle media settings'
        color='grey'
        className='hover:cursor-pointer hover:stroke-white'
      /> */}
    </div>
  </div>
);
