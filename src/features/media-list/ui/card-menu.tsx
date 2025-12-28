import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

import { Heart, HeartCrack, MenuIcon } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { useMediaActions } from '../model';
import { StatusSubMenu } from './components/status-sub-menu';
import { ListMedia } from '@/entities/media';
import { cn } from '@/shared/lib/utils';
import { DeleteMedia } from '@/widgets/media/delete/delete-media';
import { EditMedia } from '@/widgets/media/edit';

const CardMenu = ({
  mediaItem,
  isHovered,
  handleOpen,
}: {
  mediaItem: ListMedia;
  handleOpen: (isOpen: boolean) => void;
  isHovered: boolean;
}) => {
  const { name, _id: id, isFavorite, status } = mediaItem;

  const { toggleFavorite } = useMediaActions({ mediaItemId: id, isFavorite });

  const handleToggleFavorite = (e: Event) => {
    e.preventDefault();
    toggleFavorite();
  };

  return (
    <DropdownMenu onOpenChange={handleOpen} modal={false}>
      <DropdownMenuTrigger
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
        }}
        aria-label='Toggle media card menu'
        className='ml-auto h-[36px]'
      >
        <Badge
          variant='default'
          className={cn(
            'rounded-none rounded-bl-lg bg-white/20  group-hover:bg-white',
            {
              'bg-white': isHovered,
            }
          )}
        >
          <MenuIcon color='black' className='h-4 w-4 md:h-6 md:w-6' />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        onClick={(e) => e.stopPropagation()}
        className='mt-2 w-64 rounded-lg'
      >
        <DropdownMenuLabel className='truncate'>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditMedia mediaItem={mediaItem} />
        <DropdownMenuItem
          onSelect={handleToggleFavorite}
          className='cursor-pointer'
        >
          {isFavorite ? (
            <HeartCrack className='hover:animate-jump-out mr-2 h-4 w-4' />
          ) : (
            <Heart className='animate-jump-out mr-2 h-4 w-4' />
          )}
          <span>{isFavorite ? 'Видалити з' : 'Додати до'} улюблених</span>
        </DropdownMenuItem>
        <StatusSubMenu currentStatus={status} mediaItemId={id} />
        <DeleteMedia id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { CardMenu };
