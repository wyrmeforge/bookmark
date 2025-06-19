'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { PenIcon } from 'lucide-react';
import { MediaItem } from '@/shared/types/media';
import { FormFields, FormVariant, ModifyFormValues } from '../model/types';
import { MediaModifyForm } from './media-modify-form';
import { useEditMedia } from '../model/hooks/use-edit-media';
import { useEffect, useMemo, useState } from 'react';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
}

const EditMedia = ({ mediaItem }: { mediaItem: MediaItem }) => {
  const {
    name,
    status,
    season,
    _id: id,
    imageUrl,
    rate,
    isFavorite,
    episode,
    viewedCount,
    comment,
  } = mediaItem || {};

  const isMobile = useIsMobile();
  const editUnity = useEditMedia();

  const initialValues: ModifyFormValues = useMemo(
    () => ({
      [FormFields.UnityInfo]: { id, name, image: imageUrl },
      [FormFields.Name]: name,
      [FormFields.ViewedCount]: viewedCount,
      [FormFields.Rate]: rate,
      [FormFields.Status]: status,
      [FormFields.IsFavorite]: isFavorite,
      [FormFields.Episode]: episode,
      [FormFields.Season]: season,
      [FormFields.Comment]: comment,
    }),
    [
      id,
      name,
      imageUrl,
      viewedCount,
      rate,
      isFavorite,
      episode,
      season,
      comment,
      status,
    ]
  );

  const onSubmit = (data: ModifyFormValues) => {
    editUnity(id, data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <DropdownMenuItem
          aria-label='Редагувати медіа'
          onSelect={(e) => e.preventDefault()}
          className='cursor-pointer'
        >
          <PenIcon className='mr-2 h-4 w-4' />
          Редагувати
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className='flex h-full w-full !max-w-none flex-col md:w-1/3'
      >
        <SheetTitle>Редагувати аніме</SheetTitle>
        <SheetDescription>
          Внесіть зміни до інформації про аніме у вашому списку.
        </SheetDescription>
        <MediaModifyForm
          initialValues={initialValues}
          variant={FormVariant.Edit}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};

export { EditMedia };
