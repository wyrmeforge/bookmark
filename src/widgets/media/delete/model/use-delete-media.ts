import { useMutation } from 'convex/react';
import { api } from '@convex/api';
import { toast } from 'sonner';
import { ListMediaId } from '@/entities/media';
import { useCallback } from 'react';

interface IUseDeleteMediaItemReturn {
  deleteMedia: (id: ListMediaId) => Promise<void>;
}

export const useDeleteMedia = (): IUseDeleteMediaItemReturn => {
  const deleteListItem = useMutation(api.lists.deleteListItem);

  const deleteMedia = useCallback(
    async (id: ListMediaId) => {
      try {
        await deleteListItem({ id });
        toast.success('Видалено успішно');
      } catch (err) {
        toast.error('Не вдалось видалити!', {
          description: `Помилка ${err}`,
        });
      }
    },
    [deleteListItem]
  );

  return { deleteMedia };
};
