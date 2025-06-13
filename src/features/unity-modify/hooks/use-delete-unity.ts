import { useMutation } from 'convex/react';
import { toast } from '@/shared/ui/use-toast';
import { api } from '@convex/api';
import { Id } from '@convex/dataModel';

export const useDeleteUnity = () => {
  const deleteListItem = useMutation(api.lists.deleteListItem);

  const deleteUnity = async (id: Id<'lists'>) => {
    try {
      await deleteListItem({ id });
      toast({
        title: 'Видалено успішно!',
        variant: 'success',
      });
    } catch (e) {
      toast({
        title: 'Не вдалось видалити!',
        description: 'Невідома помилка',
        variant: 'destructive',
      });
    }
  };

  return deleteUnity;
};
