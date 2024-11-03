import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { toast } from '@/components/ui/use-toast';

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
