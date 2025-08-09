'use client';

import { Sheet, SheetTrigger } from '@/shared/ui/sheet';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { PenIcon } from 'lucide-react';
import { FormFields, FormVariant, ModifyFormValues } from '../model/dto/types';
import { MediaModifyForm } from './media-modify-form';
import { useEditMedia } from '../model/hooks/use-edit-media';
import { useMemo } from 'react';
import { ListMedia } from '@/entities/media';

const EditMedia = ({ mediaItem }: { mediaItem: ListMedia }) => {
  const {
    name,
    status,
    _id: id,
    mediaId,
    imageUrl,
    rate,
    isFavorite,
    episode,
    viewedCount,
    bannerImage,
    totalEpisodes,
    comment,
  } = mediaItem || {};

  const editUnity = useEditMedia();

  const initialValues: ModifyFormValues = useMemo(
    () => ({
      [FormFields.UnityInfo]: {
        id: mediaId,
        name,
        image: imageUrl,
        bannerImage,
        episodes: totalEpisodes,
      },
      [FormFields.Name]: name,
      [FormFields.ViewedCount]: viewedCount,
      [FormFields.Rate]: rate,
      [FormFields.Status]: status,
      [FormFields.IsFavorite]: isFavorite,
      [FormFields.Episode]: episode,
      [FormFields.Comment]: comment,
    }),
    [
      bannerImage,
      mediaId,
      name,
      imageUrl,
      totalEpisodes,
      viewedCount,
      rate,
      isFavorite,
      episode,
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
      <MediaModifyForm
        initialValues={initialValues}
        variant={FormVariant.Edit}
        onSubmit={onSubmit}
      />
    </Sheet>
  );
};

export { EditMedia };
