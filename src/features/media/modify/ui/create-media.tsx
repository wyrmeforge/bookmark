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
import { useEffect, useState } from 'react';

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

const CreateMedia = ({ initialStatus, customTrigger }: CreateMediaProps) => {
  const { createNewMedia } = useCreateMedia();
  const isMobile = useIsMobile();

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
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className='flex h-full w-full !max-w-none flex-col overflow-auto md:w-1/3'
      >
        <SheetTitle className='hidden md:block'>Додати нове аніме</SheetTitle>
        <SheetDescription className='hidden md:block'>
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
