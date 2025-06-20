import SearchInput from '@/features/search-input';
import { FiltersToggleGroup } from '@/features/media/filters';
import { SettingsIcon } from 'lucide-react';

export const MediaToolbar = () => (
  <div className='flex items-center justify-between py-2 md:py-4'>
    <div className='w-[80%] overflow-hidden'>
      <FiltersToggleGroup />
    </div>
    <div className='flex flex-row items-center gap-4'>
      <SearchInput />
      <SettingsIcon
        aria-label='Toggle media settings'
        color='grey'
        className='hover:cursor-pointer hover:stroke-white'
      />
    </div>
  </div>
);
