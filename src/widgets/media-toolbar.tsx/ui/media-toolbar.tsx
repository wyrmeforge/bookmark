import SearchInput from '@/features/search-input';
import { FiltersToggleGroup } from '@/features/media/filters';
import { SettingsIcon } from 'lucide-react';

export const MediaToolbar = () => (
  <div className='mb-2 flex items-center justify-between py-4'>
    <div className='w-1/2'>
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
