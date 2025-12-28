import { ListMediaStatus } from '@/entities/media';
import { MEDIA_STATUS_FILTERS } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import Image from 'next/image';

type EmptyListPlaceholderProps = {
  currentFilter: ListMediaStatus;
};

import placeholder from '../../../../../public/empty-placcecholder.png';
import { CreateMedia } from '@/widgets/media/create/create-media';

const EmptyListPlaceholder = ({ currentFilter }: EmptyListPlaceholderProps) => {
  const label = MEDIA_STATUS_FILTERS.find(
    (item) => item.key === currentFilter
  )?.label;

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6'>
      {/* Decorative blurred background */}
      {/* <div className='pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl' /> */}
      {/* <div className='pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl' /> */}

      {/* Placeholder image as background */}
      <Image
        src={placeholder}
        alt='Empty Placeholder'
        fill
        className='object-contain opacity-60 drop-shadow-[0_10px_25px_rgba(255,255,255,0.5)]'
        style={{ maxHeight: 'calc(100dvh - 94px)' }} // adjust 64px to your header height
      />

      {/* Content block inside a styled container */}
      <div className='relative z-10 flex flex-col items-center gap-4 rounded-2xl border border-white/20 bg-black/40 px-8 py-6 text-center shadow-lg backdrop-blur-sm'>
        <h2 className='bg-gradient-to-r from-white to-orange-400 bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-md'>
          Тут поки що порожньо...
        </h2>
        {/* <p className='max-w-md text-sm leading-relaxed text-gray-200'>
          Додайте аніме до свого списку, щоб почати відстежувати!
        </p> */}

        {/* Action button */}
        <CreateMedia
          initialStatus={currentFilter}
          customTrigger={
            <Button variant='outline' aria-label='Додати нове аніме'>
              <PlusCircleIcon className='h-6 w-6 animate-pulse' />
              Додати до списку «{label}»
            </Button>
          }
        />
      </div>
    </div>
  );
};

export { EmptyListPlaceholder };
