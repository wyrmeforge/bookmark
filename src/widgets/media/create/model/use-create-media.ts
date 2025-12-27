import { useMutation } from 'convex/react';
import { api } from '@convex/api';
import { toast } from 'sonner';
import { useCallback } from 'react';

import { mapCreateMediaPayload } from './create-media.mapper';
import { TMediaModifyFormValues } from '@/features/media-modify/model/helpers';

interface CreateListItemResponse {
  success?: boolean;
  error?: string | 'ITEM_ALREADY_EXISTS';
}

interface IUseCreateMediaReturn {
  createNewMedia: (mediaData: TMediaModifyFormValues) => Promise<void>;
}

export const useCreateMedia = (): IUseCreateMediaReturn => {
  const createListItem = useMutation(api.lists.createListItem);

  const handleMutationResult = useCallback(
    (response: CreateListItemResponse, mediaName: string) => {
      if (response?.success) {
        toast.success('Успішно додано!', { description: mediaName });
        return;
      }

      if (response?.error === 'ITEM_ALREADY_EXISTS') {
        toast.error('Не вдалось додати!', {
          description: 'Це аніме вже є у вашому списку.',
        });
        return;
      }

      toast.error('Не вдалось додати!', {
        description: 'Сталася невідома помилка.',
      });
    },
    []
  );

  const createNewMedia = useCallback(
    async (formData: TMediaModifyFormValues) => {
      try {
        const payload = mapCreateMediaPayload(formData);
        const response = await createListItem(payload);

        handleMutationResult(response, payload.name);
      } catch (error) {
        toast.error('Не вдалось додати!', {
          description: (error as Error)?.message ?? 'Сталася невідома помилка.',
        });
      }
    },
    [createListItem, handleMutationResult]
  );

  return { createNewMedia };
};
