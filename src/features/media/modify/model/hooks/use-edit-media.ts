import { useMutation } from 'convex/react';
import { api } from '@convex/api';
import { ModifyFormValues } from '../types';
import { MediaItemId } from '@/shared/types/media';
import { toast } from 'sonner';

export const useEditMedia = () => {
  const updateListItem = useMutation(api.lists.updateListItem);

  const preparePayload = (mediaData: ModifyFormValues) => ({
    media3PartyId: mediaData?.unity_info.id,
    isFavorite: mediaData.isFavorite ?? false,
    name: mediaData.name,
    rate: mediaData.rate,
    imageUrl: mediaData?.unity_info.image,
    status: mediaData.status,
    episode: mediaData.episode,
    season: mediaData.season,
    viewedCount: mediaData.viewedCount,
    comment: mediaData.comment,
  });

  const editUnity = async (unityId: MediaItemId, data: ModifyFormValues) => {
    const payload = preparePayload(data);
    const response = await updateListItem({ id: unityId, newData: payload });

    if (response.success) {
      toast.success('Успішно змінено!');
    } else {
      toast.error('Не вдалось змінити!', {
        description: 'Щось пішло не так.',
      });
    }
  };

  return editUnity;
};
