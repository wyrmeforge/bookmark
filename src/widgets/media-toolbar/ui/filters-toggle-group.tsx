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
import { StorageKeys } from '@/shared/enums';
import { useFilters } from '../model';
import { MediaItemStatus } from '@/entities/media';

// ToDo: move to shared hooks
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

  const handleChange = (value: MediaItemStatus) => {
    if (!value) return;

    updateFilter(value);
    localStorage.setItem(StorageKeys.LastStatusFilter, value);
  };

  if (isMobile) {
    return (
      <Select value={currentFilter} onValueChange={handleChange}>
        <SelectTrigger className='w-auto'>
          <SelectValue placeholder='Виберіть фільтр' />
        </SelectTrigger>
        <SelectContent>
          {menu.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              <div className='flex gap-2'>
                <span>{item.title}</span>
                <span className='text-orange-400'>{item.value}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <ToggleGroup
      value={currentFilter}
      onValueChange={handleChange}
      className='scrollbar-hide z-0 w-full justify-start gap-0 overflow-x-auto whitespace-nowrap border-b border-b-gray-500'
      type='single'
    >
      {menu.map(({ title, value, key, icon }) => (
        <ToggleGroupItem
          key={key}
          value={key}
          aria-label={key}
          className={cn(
            'relative w-full justify-around rounded-none text-muted-foreground data-[state=on]:bg-transparent',
            {
              'z-10 border-b-2 border-b-white': currentFilter === key,
            }
          )}
        >
          {icon}
          {title}
          <div
            className={cn('text-white', {
              'text-orange-400': currentFilter === key,
            })}
          >
            {value}
          </div>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export { FiltersToggleGroup };
