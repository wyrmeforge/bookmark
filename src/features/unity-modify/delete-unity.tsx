import React from 'react';

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
} from '@/components/ui/alert-dialog';
import { Id } from '../../../convex/_generated/dataModel';
import { useDeleteUnity } from './hooks/use-delete-unity';

const DeleteUnity = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: Id<'lists'>;
}) => {
  const deleteUnity = useDeleteUnity();

  const handleDelete = () => {
    deleteUnity(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
          <AlertDialogDescription>
            Цю дію неможливо скасувати. Це призведе до остаточного видалення.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Відмінити</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Видалити</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUnity;
