import { useMutation } from 'convex/react';
import { api } from '@convex/api';
import { UseDeleteMediaItemReturn } from './types';
import { MediaItemId } from '@/shared/types/media';
import { toast } from 'sonner';

export const useDeleteMediaItem = (): UseDeleteMediaItemReturn => {
  const deleteListItem = useMutation(api.lists.deleteListItem);

  const deleteMedia = async (id: MediaItemId) => {
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
