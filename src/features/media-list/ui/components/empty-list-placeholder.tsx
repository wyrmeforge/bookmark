import { ListMediaStatus } from '@/entities/media';
import { CreateMedia } from '@/features/media-modify';
import { MEDIA_STATUS_FILTERS } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import Image from 'next/image';

type EmptyListPlaceholderProps = {
  currentFilter: ListMediaStatus;
};

const EmptyListPlaceholder = ({ currentFilter }: EmptyListPlaceholderProps) => {
  const label = MEDIA_STATUS_FILTERS.find(
    (item) => item.key === currentFilter
  )?.label;

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6'>
      {/* Text block */}
      <div className='z-10 mb-8 flex flex-col items-center gap-3 text-center'>
        <h2 className='animate-fade-in text-4xl font-extrabold text-gray-200 drop-shadow-lg'>
          Тут поки що порожньо...
        </h2>
        <p className='text-lg leading-relaxed text-gray-400'>
          Додайте аніме до свого списку, щоб почати відстежувати!
        </p>
      </div>

      {/* Action button */}
      <CreateMedia
        initialStatus={currentFilter}
        customTrigger={
          <Button
            aria-label='Додати нове аніме'
            className='flex animate-pulse items-center gap-2 rounded-full px-7 py-3 text-lg font-semibold shadow-md transition-transform hover:shadow-lg'
          >
            <PlusCircleIcon className='h-6 w-6 animate-pulse ' />
            Додати до списку «{label}»
          </Button>
        }
      />
    </div>
  );
};

export { EmptyListPlaceholder };
