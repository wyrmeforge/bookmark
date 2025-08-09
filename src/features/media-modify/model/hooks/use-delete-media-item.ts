import { useMutation } from 'convex/react';
import { api } from '@convex/api';
import { toast } from 'sonner';
import { UseDeleteMediaItemReturn } from '../dto/types';
import { ListMediaId } from '@/entities/media';

export const useDeleteMediaItem = (): UseDeleteMediaItemReturn => {
  const deleteListItem = useMutation(api.lists.deleteListItem);

  const deleteMedia = async (id: ListMediaId) => {
    try {
      await deleteListItem({ id });
      toast.success('Видалено успішно');
    } catch (err) {
      toast.error('Не вдалось видалити!', {
        description: `Помилка ${err}`,
      });
    }
  };

  return { deleteMedia };
};
