import React, { useState } from 'react';

import { ArrowDown, ArrowUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Sort = ({ sort, setSort }) => {
  const sortItems = [
    {
      label: 'За датою додавання',
      value: 'date',
      direction: 'asc',
    },
    {
      label: 'За к-тю епізодів',
      value: 'episode',
      direction: 'asc',
    },
    {
      label: 'За к-тю переглядів',
      value: 'view_count',
      direction: 'asc',
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex h-9 w-[150px] items-center justify-center gap-2 rounded-lg border border-muted sm:w-[200px]'>
        {sort.direction == 'desc' ? (
          <ArrowUp size={16} />
        ) : (
          <ArrowDown size={16} />
        )}
        {sort.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortItems?.map((item) => (
          <DropdownMenuItem
            onClick={() =>
              setSort({
                label: item.label,
                value: item.value,
                direction:
                  item.value === sort.value
                    ? sort.direction == 'desc'
                      ? 'asc'
                      : 'desc'
                    : 'desc',
              })
            }
            key={item.value}
            className='flex gap-2'
          >
            {sort.value === item.value ? (
              sort.direction == 'desc' ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )
            ) : null}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sort;
