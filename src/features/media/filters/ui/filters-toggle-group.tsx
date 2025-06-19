'use client';

import { useState, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { cn } from '@/shared/lib/utils';
import { useFilters } from '../model/use-filters';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
}

const FiltersToggleGroup = () => {
  const { menu, currentFilter, updateFilter } = useFilters();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Select value={currentFilter} onValueChange={updateFilter}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Виберіть фільтр' />
        </SelectTrigger>
        <SelectContent>
          {menu.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <ToggleGroup
      value={currentFilter}
      onValueChange={updateFilter}
      className='scrollbar-hide z-0 w-full justify-start overflow-x-auto whitespace-nowrap border-b border-b-gray-500'
      type='single'
    >
      {menu.map((item) => (
        <ToggleGroupItem
          key={item.key}
          value={item.key}
          aria-label={item.key}
          className={cn(
            'relative w-full justify-around rounded-none text-muted-foreground data-[state=on]:bg-transparent',
            { 'z-10 border-b-2 border-b-white': currentFilter === item.key }
          )}
        >
          {item.title}
          <div className='text-orange-400'>{item.value}</div>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export { FiltersToggleGroup };
