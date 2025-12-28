import { Button } from '@/shared/ui/button';
import { CreateMedia } from '@/widgets/media/create/create-media';
import { PlusCircleIcon } from 'lucide-react';
import Image from 'next/image';

import empty_list_image from '../../../../../public/empty_list.png';
import { TMediaStatusValues } from '@/entities/media/model/convex/constants';

interface IEmptyMediaListProps {
  currentFilter: TMediaStatusValues;
}

const EmptyMediaList = ({ currentFilter }: IEmptyMediaListProps) => (
  <div className='relative flex h-full w-full flex-col items-center justify-center'>
    <Image
      src={empty_list_image}
      alt='Список порожній'
      className='absolute -left-[16px] bottom-0 w-auto brightness-50 md:left-0'
      loading='lazy'
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
