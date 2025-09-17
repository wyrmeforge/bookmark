import { ListMedia } from '@/entities/media';
import { getTranslatedMediaUserStatus } from '@/shared/lib';
import { CommandItem } from '@/shared/ui/command';
import dayjs from 'dayjs';
import Image from 'next/image';

type SearchCommandItemProps = {
  item: ListMedia;
  handleClick: () => void;
};

const SearchCommandItem = ({ item, handleClick }: SearchCommandItemProps) => {
  const { imageUrl, name, status, _creationTime } = item;

  return (
    <CommandItem
      tabIndex={0}
      onSelect={handleClick}
      className='group flex items-start gap-3 rounded-md p-2 transition-colors hover:cursor-pointer hover:bg-muted/80 focus:bg-muted/10'
    >
      {imageUrl && (
        <div className='relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md border'>
          <Image
            src={imageUrl}
            alt={name}
            fill
            className='object-cover'
            unoptimized
          />
        </div>
      )}
      <div className='flex h-24 flex-1 flex-col justify-between'>
        <div className='flex items-center justify-between gap-2'>
          <div className='truncate text-base font-semibold leading-snug'>
            {name}
          </div>
          <div className='whitespace-nowrap rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors group-hover:bg-black group-hover:text-white'>
            {getTranslatedMediaUserStatus(status)}
          </div>
        </div>
        <div className='text-md mt-1 text-muted-foreground'>
          {dayjs(_creationTime).format('DD.MM.YYYY')}
        </div>
      </div>
    </CommandItem>
  );
};

export { SearchCommandItem };
