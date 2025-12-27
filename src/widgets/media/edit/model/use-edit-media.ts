import { useMutation } from 'convex/react';
import { api } from '@convex/api';
import { toast } from 'sonner';
import { ListMediaId } from '@/entities/media';
import { mapEditMediaPayload } from './edit-media.mapper';
import { TMediaModifyFormValues } from '@/features/media-modify/model/helpers';

export const useEditMedia = () => {
  const updateListItem = useMutation(api.lists.updateListItem);

  const editUnity = async (id: ListMediaId, data: TMediaModifyFormValues) => {
    const payload = mapEditMediaPayload(data);
    const response = await updateListItem({ id, newData: payload });

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
