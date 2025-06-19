import { CreateMedia } from '@/features/media/modify';
import { MediaStatus } from '@/shared/enums/media';
import { Button } from '@/shared/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import Image from 'next/image';

const EmptyMediaList = ({ currentFilter }: { currentFilter: MediaStatus }) => (
  <div className='relative flex h-full w-full flex-col items-center justify-center'>
    <Image
      src='/empty_list.png'
      alt='Список порожній'
      className='absolute top-20 brightness-50'
      width={500}
      height={400}
      priority
    />
    <div className='z-10 mb-6 flex flex-col items-center gap-2'>
      <h2 className='animate-fade-in text-2xl font-semibold text-muted-foreground'>
        Здається тут порожньо...
      </h2>
      <p className='animate-fade-in text-muted-foreground delay-100'>
        Додайте перше аніме у вашу колекцію!
      </p>
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
