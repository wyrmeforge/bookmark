import { useMutation } from 'convex/react';
import { api } from '@convex/api';
import { ErrorCodes, ModifyFormValues, UseCreateMediaReturn } from '../types';
import { toast } from 'sonner';

export const useCreateMedia = (): UseCreateMediaReturn => {
  const createListItem = useMutation(api.lists.createListItem);

  const preparePayload = (formData: ModifyFormValues) => {
    const unityInfo = formData.unity_info;

    if (!unityInfo) {
      throw new Error('Missing unity_info in form data');
    }

    return {
      media3PartyId: unityInfo.id,
      isFavorite: formData.isFavorite ?? false,
      name: formData.name || unityInfo.name,
      rate: formData.rate,
      imageUrl: unityInfo.image,
      status: formData.status,
      episode: formData.episode,
      season: formData.season,
      viewedCount: formData.viewedCount,
      comment: formData.comment,
    };
  };

  const createNewMedia = async (formData: ModifyFormValues) => {
    try {
      const payload = preparePayload(formData);

      const response = await createListItem(payload);

      if (response?.success) {
        toast.success('Успішно додано!', {
          description: payload.name,
        });
      } else if (response?.error === ErrorCodes.ITEM_ALREADY_EXISTS) {
        toast.error('Не вдалось додати!', {
          description: 'Це аніме вже є у вашому списку.',
        });
      } else {
        toast.error('Не вдалось додати!', {
          description: 'Сталася невідома помилка.',
        });
      }
    } catch (error) {
      toast.error('Не вдалось додати!', {
        description: `Сталася невідома помилка. ${(error as Error).message || error}`,
      });
    }
  };

  return { createNewMedia };
};
