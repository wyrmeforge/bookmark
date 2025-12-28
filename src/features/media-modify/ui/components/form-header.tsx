import Image from 'next/image';
import { Skeleton } from '@/shared/ui/skeleton';
import { DialogDescription, DialogTitle } from '@/shared/ui/dialog';

interface IMediaModifyFormHeaderProps {
  isCreate: boolean;
  bannerImage?: string;
  bannerAlt?: string;
}

export const MediaModifyFormHeader = ({
  isCreate,
  bannerAlt,
  bannerImage,
}: IMediaModifyFormHeaderProps) => (
  <div className='relative h-60 shrink-0 border-b'>
    {bannerImage ? (
      <Image
        src={bannerImage}
        alt={bannerAlt ?? 'Аніме Банер'}
        fill
        className='object-cover'
      />
    ) : (
      <Skeleton className='absolute inset-0 h-full w-full' />
    )}

    <div className='absolute inset-0 bg-gradient-to-t from-background/100 via-background/40 to-background/20' />

    <div className='absolute bottom-4 left-4'>
      <DialogTitle className='text-lg font-semibold'>
        {isCreate ? 'Додавання нового аніме' : 'Редагування аніме'}
      </DialogTitle>
      <DialogDescription className='mt-1 text-sm text-muted-foreground'>
        {isCreate
          ? 'Заповніть форму, щоб додати аніме до вашого списку.'
          : 'Оновіть інформацію про обране аніме.'}
      </DialogDescription>
    </div>
  </div>
);
