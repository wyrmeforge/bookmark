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

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/shared/lib/utils';
import { SettingsIcon, SlidersHorizontalIcon, SlidersIcon } from 'lucide-react';

const DashboardHeader = () => {
  const { menu, updateFilter, currentFilter } = useMenu();

  console.log(currentFilter);

  return (
    <div className='mb-2 flex items-center justify-between py-4'>
      <div className='w-1/2'>
        {/* <ToggleGroup
          value={currentFilter}
          onValueChange={(value) => {
            console.log(value);
            updateFilter(value);
          }}
          className='z-0 w-full justify-start border-b border-b-gray-500'
          type='single'
        >
          {menu?.map((item) => (
            <ToggleGroupItem
              className={cn(
                'w-full rounded-none text-muted-foreground data-[state=on]:bg-transparent',
                {
                  'z-10 border-b-2 border-b-white': currentFilter === item.key,
                }
              )}
              value={item.key}
              key={item.key}
              aria-label={item.key}
            >
              {item.title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup> */}
      </div>
      <div className='flex flex-row gap-4'>
        <SettingsIcon />
      </div>
    </div>
  );
};

export default DashboardHeader;
