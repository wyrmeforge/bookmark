import { useMutation } from 'convex/react';
import { api } from '@convex/api';
import { UseMediaActionsProps, UseMediaActionsReturn } from './types';
import { MediaStatus } from '@/shared/enums/media';
import { toast } from 'sonner';

export const useMediaActions = ({
  mediaItemId,
  isFavorite,
}: UseMediaActionsProps): UseMediaActionsReturn => {
  const updateItem = useMutation(api.lists.updateListItem);

  const toggleFavorite = async () => {
    await updateItem({
      id: mediaItemId,
      newData: { isFavorite: !isFavorite },
    });
  };

  const changeStatus = async (status: MediaStatus) => {
    await updateItem({ id: mediaItemId, newData: { status } });
    toast.success('Статус успішно змінено!');
  };

  return { toggleFavorite, changeStatus };
};
