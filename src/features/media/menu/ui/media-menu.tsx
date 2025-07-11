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
import { MediaItem } from '@/shared/types/media';
import { useMediaActions } from '../model/use-media-actions';
import { StatusSubMenu } from './components/status-sub-menu';
import { DeleteMediaItem } from '../../delete';
import { EditMedia } from '../../modify';

const MediaMenu = ({ mediaItem }: { mediaItem: MediaItem }) => {
  const { name, _id: id, isFavorite, status } = mediaItem;

  const { toggleFavorite } = useMediaActions({ mediaItemId: id, isFavorite });

  const handleToggleFavorite = (e: Event) => {
    e.preventDefault();
    toggleFavorite();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label='Toggle media menu' className='h-[26px]'>
        <Badge variant='default' className=' border border-muted-foreground'>
          <MenuIcon color='black' className='h-4 w-4 md:h-5 md:w-5' />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-2 w-64 rounded-lg'>
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
        <DeleteMediaItem id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { MediaMenu };
