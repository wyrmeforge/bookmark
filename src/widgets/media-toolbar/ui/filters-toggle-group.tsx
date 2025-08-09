'use client';

import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group';
import { cn } from '@/shared/lib/utils';
import { StorageKeys } from '@/shared/enums';
import { useFilters } from '../model';
import { ListMediaStatus } from '@/entities/media';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/ui/carousel';

import { useMobile } from '@/shared/lib';
import { useState } from 'react';

const FiltersToggleGroup = () => {
  const { menu, currentFilter, updateFilter } = useFilters();
  const { isMobile } = useMobile();

  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const onSelect = (idx: number) => {
    if (!carouselApi) return null;

    carouselApi?.scrollTo(idx);
  };

  const handleChange = (value: ListMediaStatus) => {
    if (!value) return;

    updateFilter(value);
    localStorage.setItem(StorageKeys.LastStatusFilter, value);
  };

  if (!isMobile) {
    return (
      <ToggleGroup
        value={currentFilter}
        onValueChange={handleChange}
        className='z-0 w-full justify-start gap-0 border-b border-b-gray-500'
        type='single'
      >
        {menu.map(({ title, value, key, icon }) => (
          <ToggleGroupItem
            key={key}
            value={key}
            aria-label={key}
            className={cn(
              'relative inline-flex w-full items-center justify-center whitespace-nowrap rounded-none px-4 py-2 text-muted-foreground data-[state=on]:bg-transparent',
              {
                'z-10 before:absolute before:-bottom-[1px] before:left-0 before:w-full before:border-b before:border-b-white':
                  currentFilter === key,
              }
            )}
          >
            {icon}
            <span className='ml-2'>{title}</span>
            <div
              className={cn('ml-2 text-muted-foreground', {
                'text-white': currentFilter === key,
              })}
            >
              {value}
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  }

  return (
    <Carousel
      opts={{
        align: 'center',
        loop: false,
      }}
      className='relative w-full px-1'
      setApi={setCarouselApi}
    >
      <ToggleGroup
        value={currentFilter}
        onValueChange={handleChange}
        className='z-0 w-full justify-start gap-0'
        type='single'
      >
        <CarouselContent className='flex-nowrap'>
          {menu.map(({ title, value, key }, idx) => (
            <CarouselItem
              onClick={() => onSelect(idx)}
              className='shrink-0 basis-1/2'
              key={key}
            >
              <ToggleGroupItem
                value={key}
                aria-label={key}
                className={cn(
                  'relative inline-flex w-full cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-none px-0 py-2 text-muted-foreground data-[state=on]:bg-transparent md:px-4',
                  {
                    'z-10 before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-b-white':
                      currentFilter === key,
                  }
                )}
              >
                <span className='ml-2'>{title}</span>
                <div
                  className={cn('ml-2 text-muted-foreground', {
                    'text-white': currentFilter === key,
                  })}
                >
                  {value}
                </div>
              </ToggleGroupItem>
            </CarouselItem>
          ))}
        </CarouselContent>
      </ToggleGroup>
    </Carousel>
  );
};

export { FiltersToggleGroup };
