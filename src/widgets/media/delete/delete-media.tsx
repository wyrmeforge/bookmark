'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { TrashIcon } from 'lucide-react';
import { ListMediaId } from '@/entities/media';
import { useDeleteMedia } from './model/use-delete-media';

interface IDeleteMediaProps {
  id: ListMediaId;
}

const DeleteMedia = ({ id }: IDeleteMediaProps) => {
  const { deleteMedia } = useDeleteMedia();

  return (
    <AlertDialog>
      <AlertDialogTrigger className='w-full'>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className='cursor-pointer'
        >
          <TrashIcon className='mr-2 h-4 w-4 stroke-red-500' />
          <span className='text-red-500'>Видалити</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[90%] rounded-md md:w-full'>
        <AlertDialogHeader>
          <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
          <AlertDialogDescription>
            Цю дію неможливо скасувати. Це призведе до остаточного видалення.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Скасувати</AlertDialogCancel>
          <AlertDialogAction
            className='destructive'
            onClick={() => deleteMedia(id)}
          >
            Видалити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteMedia };
