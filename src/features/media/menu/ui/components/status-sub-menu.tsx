import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/shared/ui/dropdown-menu';
import { FilterIcon } from 'lucide-react';
import { MENU_MEDIA_FILTERS } from '../../config/menu-media-filters';
import { cn } from '@/shared/lib/utils';
import { useMediaActions } from '../../model/use-media-actions';
import { MediaItem } from '@/shared/types/media';
import { MediaStatus } from '@/shared/enums/media';

interface IStatusSubMenuProps {
  mediaItemId: MediaItem['_id'];
  currentStatus: MediaStatus;
}

const StatusSubMenu = ({ mediaItemId, currentStatus }: IStatusSubMenuProps) => {
  const { changeStatus } = useMediaActions({ mediaItemId });

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <FilterIcon className='mr-2 h-4 w-4' />
        Змінити статус на
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className='px-2'>
          {MENU_MEDIA_FILTERS.map(({ label, key, icon: Icon }) => (
            <DropdownMenuItem
              key={key}
              className={cn('flex gap-3 hover:cursor-pointer', {
                'bg-gray-700': key === currentStatus,
              })}
              onClick={() => changeStatus(key)}
            >
              <Icon size={16} />
              <span>{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

export { StatusSubMenu };
