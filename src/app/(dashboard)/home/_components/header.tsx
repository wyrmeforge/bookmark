import React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import SearchInput from '@/features/search-input';
import CreateUnity from '@/features/unity-modify/create-unity';
import { useMenu } from '../hooks/use-menu';

const DashboardHeader = () => {
  const { menu, updateFilter, currentFilter } = useMenu();

  return (
    <div className='flex items-center justify-between p-2'>
      <div className='flex items-center justify-between gap-4'>
        <Select onValueChange={updateFilter} value={currentFilter}>
          <SelectTrigger className='w-[420px] [&>span]:flex [&>span]:w-full [&>span]:justify-between'>
            <SelectValue className='w-full' placeholder={currentFilter} />
          </SelectTrigger>
          <SelectContent className='flex w-full justify-between'>
            {menu?.map((filter) => (
              <SelectItem
                className='flex w-full justify-between [&>span:nth-child(2)]:flex [&>span:nth-child(2)]:w-full [&>span:nth-child(2)]:justify-between'
                key={filter.key}
                value={filter.key}
              >
                {filter.title} <Badge className='mr-2'>{filter.value}</Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <SearchInput />
      </div>
      <CreateUnity>
        <Button className='flex h-9 gap-1 sm:w-[140px]'>Додати</Button>
      </CreateUnity>
    </div>
  );
};

export default DashboardHeader;
