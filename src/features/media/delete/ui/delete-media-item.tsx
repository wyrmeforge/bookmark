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
import { useDeleteMediaItem } from '../model/use-delete-media-item';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { TrashIcon } from 'lucide-react';
import { MediaItemId } from '@/shared/types/media';

const DeleteMediaItem = ({ id }: { id: MediaItemId }) => {
  const { deleteMedia } = useDeleteMediaItem();

  const handleDelete = () => deleteMedia(id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className='w-full'>
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
          <AlertDialogAction className='destructive' onClick={handleDelete}>
            Видалити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteMediaItem };
