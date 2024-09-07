import React, { useContext } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { UnityStateContext } from '@/components/providers/unity-state-provider';
import { SortDirection, SortName } from '@/enums/sort';
import { ISortModel } from '@/types/sort';
import { cn } from '@/lib/utils';

export const ListSort = () => {
  const { sortModel, setSortModel } = useContext(UnityStateContext);

  const sortOptions = [
    { label: 'За датою додавання', value: SortName.CreationTime },
    { label: 'За оцінкою', value: SortName.Rate },
    { label: 'За к-тю переглядів', value: SortName.ViewedCount },
  ];

  const isAscDirection = sortModel.direction === SortDirection.Asc;

  const handleSelect = ({ label, value }: Omit<ISortModel, 'direction'>) => {
    const newDirection = isAscDirection
      ? SortDirection.Desc
      : SortDirection.Asc;

    setSortModel({ label, value, direction: newDirection });
  };

  const Arrow = () =>
    isAscDirection ? <ArrowUp size={16} /> : <ArrowDown size={16} />;

  const menuTriggerClasses = cn(`
    flex w-56 items-center justify-start gap-2 rounded-md border
    border-input bg-background py-2 pl-4 text-sm ring-offset-background
  `);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={menuTriggerClasses}>
        <Arrow />
        {sortModel.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => handleSelect(option)}
            className='flex w-full gap-2 hover:cursor-pointer'
          >
            <div>{sortModel.value === option.value && <Arrow />}</div>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
