import { Button } from '@/components/ui/button';
import SearchInput from '@/features/search-input';
import CreateUnity from '@/features/unity-modify/create-unity';
import { PlusIcon } from 'lucide-react';
import React from 'react';

const HomeHeader = () => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <div className='hidden w-full max-w-xl sm:block'>
        <SearchInput />
      </div>
      <CreateUnity>
        <Button className='flex h-9 gap-1 sm:w-[140px]'>
          Додати
          <PlusIcon size={16} />
        </Button>
      </CreateUnity>
    </div>
  );
};

export default HomeHeader;
