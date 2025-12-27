'use client';

import { Button } from '@/shared/ui/button';
import { SquarePlusIcon } from 'lucide-react';
import { MediaStatus } from '@/shared/enums';
import { useAppState } from '@/shared/lib';
import { Dialog, DialogTrigger } from '@/shared/ui/dialog';
import { ListMediaStatus } from '@/entities/media';
import { ReactNode } from 'react';
import { useCreateMedia } from './model/use-create-media';
import { MediaModifyForm } from '@/features/media-modify/ui/media-modify-form';
import { TMediaModifyFormValues } from '@/features/media-modify/model/helpers';

interface ICreateMediaProps {
  initialStatus?: ListMediaStatus;
  customTrigger?: ReactNode;
}

const CreateMedia = ({ customTrigger }: ICreateMediaProps) => {
  const { isCreateSheetOpen, toggleCreateSheet } = useAppState();
  const { createNewMedia } = useCreateMedia();

  const onSubmit = (data: TMediaModifyFormValues) => {
    createNewMedia(data);
  };

  const initialValues: Partial<TMediaModifyFormValues> = {
    status: 'scheduled',
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
    <Dialog open={isCreateSheetOpen} onOpenChange={toggleCreateSheet}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <MediaModifyForm
        initialValues={initialValues}
        variant='create'
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};

export { CreateMedia };
