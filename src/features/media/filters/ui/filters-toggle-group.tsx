'use client';

import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group';
import { cn } from '@/shared/lib/utils';
import { useFilters } from '../model/use-filters';

const FiltersToggleGroup = () => {
  const { menu, currentFilter, updateFilter } = useFilters();

  return (
    <ToggleGroup
      value={currentFilter}
      onValueChange={updateFilter}
      className='z-0 w-full justify-start border-b border-b-gray-500'
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
          <div className=' text-orange-400'>{item.value}</div>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export { FiltersToggleGroup };
