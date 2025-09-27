'use client';

import { Sheet, SheetTrigger } from '@/shared/ui/sheet';
import {
  CreateMediaProps,
  FormFields,
  FormVariant,
  ModifyFormValues,
} from '../model/dto/types';
import { MediaModifyForm } from './media-modify-form';
import { Button } from '@/shared/ui/button';
import { SquarePlusIcon } from 'lucide-react';
import { MediaStatus } from '@/shared/enums';
import { useCreateMedia } from '../model';
import { useAppState } from '@/shared/lib';

const CreateMedia = ({ initialStatus, customTrigger }: CreateMediaProps) => {
  const { isCreateSheetOpen, toggleCreateSheet } = useAppState();
  const { createNewMedia } = useCreateMedia();

  const onSubmit = (data: ModifyFormValues) => {
    createNewMedia(data);
  };

  const initialValues: Partial<ModifyFormValues> = {
    [FormFields.Status]: initialStatus || MediaStatus.Scheduled,
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
    <Sheet open={isCreateSheetOpen} onOpenChange={toggleCreateSheet}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <MediaModifyForm
        initialValues={initialValues}
        variant={FormVariant.Create}
        onSubmit={onSubmit}
      />
    </Sheet>
  );
};

export { CreateMedia };
