import { useMutation } from 'convex/react';
import { api } from '@convex/api';
import { toast } from 'sonner';
import { MediaStatus } from '@/shared/enums';
import { UseMediaActionsProps, UseMediaActionsReturn } from './types';

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
