import { useMutation } from 'convex/react';
import { api } from '@convex/api';
import {
  ErrorCodes,
  ModifyFormValues,
  UseCreateMediaReturn,
} from '../dto/types';
import { toast } from 'sonner';
import { createMediaMapper } from '../lib';

export const useCreateMedia = (): UseCreateMediaReturn => {
  const createListItem = useMutation(api.lists.createListItem);

  const createNewMedia = async (formData: ModifyFormValues) => {
    try {
      const payload = createMediaMapper(formData);

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
