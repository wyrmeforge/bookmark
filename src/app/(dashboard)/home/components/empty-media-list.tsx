import { MediaItemStatus } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { CreateMedia } from '@/widgets/media/create/create-media';
import { PlusCircleIcon } from 'lucide-react';
import Image from 'next/image';

const EmptyMediaList = ({
  currentFilter,
}: {
  currentFilter: MediaItemStatus;
}) => (
  <div className='relative flex h-full w-full flex-col items-center justify-center'>
    <Image
      src='/empty_list.png'
      alt='Список порожній'
      className='absolute -left-[16px] bottom-0 w-auto brightness-50 md:left-0'
      width={500}
      height={400}
      priority
    />
    <div className='z-10 mb-6 flex flex-col items-center gap-2'>
      <h2 className='animate-fade-in text-2xl font-semibold text-muted-foreground'>
        Здається тут порожньо...
      </h2>
    </div>
    <div className='flex flex-row items-center gap-2'>
      <CreateMedia
        customTrigger={
          <Button aria-label='Додати нове аніме'>
            <PlusCircleIcon /> Додати
          </Button>
        }
        initialStatus={currentFilter}
      />
    </div>
  </div>
);

export { EmptyMediaList };
