'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import {
  CreateMediaProps,
  FormFields,
  FormVariant,
  ModifyFormValues,
} from '../model/types';
import { MediaModifyForm } from './media-modify-form';
import { useCreateMedia } from '../model/hooks/use-create-media';
import { Button } from '@/shared/ui/button';
import { SquarePlusIcon } from 'lucide-react';
import { MediaStatus } from '@/shared/enums/media';

const CreateMedia = ({ initialStatus, customTrigger }: CreateMediaProps) => {
  const { createNewMedia } = useCreateMedia();

  const onSubmit = (data: ModifyFormValues) => {
    createNewMedia(data);
  };

  const initialValues: Partial<ModifyFormValues> = {
    [FormFields.Status]: initialStatus ?? MediaStatus.Scheduled,
  };

  const trigger = customTrigger || (
    <Button
      aria-label='Додати нове аніме'
      size='icon'
      className='m-0 size-8 bg-transparent p-0 [&_svg]:size-8'
    >
      <SquarePlusIcon color='white' />
    </Button>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className='flex h-full w-1/3 !max-w-none flex-col'>
        <SheetTitle>Додати нове аніме</SheetTitle>
        <SheetDescription>
          Заповніть форму для додавання аніме до вашого списку
        </SheetDescription>
        <MediaModifyForm
          initialValues={initialValues}
          variant={FormVariant.Create}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};

export { CreateMedia };
