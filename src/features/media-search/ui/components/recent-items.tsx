import { ListMedia } from '@/entities/media';
import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/shared/ui/command';
import Image from 'next/image';

type RecentItemsProps = {
  recent: ListMedia[];
  onRecentSelect: (mediaId: number) => void;
};

const RecentItems = ({ recent, onRecentSelect }: RecentItemsProps) => (
  <>
    <CommandGroup heading='Останні'>
      {recent.map((item) => (
        <CommandItem
          key={item._id}
          tabIndex={0}
          onSelect={() => onRecentSelect(item.mediaId)}
          className='flex items-center gap-2 rounded-md p-2 hover:bg-muted/50'
        >
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              width={32}
              height={32}
              alt={item.name}
              className='h-8 w-8 rounded object-cover'
              unoptimized
            />
          )}
          <span className='truncate'>{item.name}</span>
        </CommandItem>
      ))}
    </CommandGroup>
    <CommandSeparator />
  </>
);

export { RecentItems };
