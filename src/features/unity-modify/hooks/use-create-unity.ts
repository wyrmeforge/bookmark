import { useMutation } from 'convex/react';
import { z as u } from 'zod';
import { FormSchema } from '../form-config';
import { api } from '../../../../convex/_generated/api';
import { toast } from '@/components/ui/use-toast';
import { ErrorCodes } from '@/enums/errorCodes';

export const useCreateUnity = () => {
  const createListItem = useMutation(api.lists.createListItem);

  const createNewUnity = async (formData: u.infer<typeof FormSchema>) => {
    const {
      unity_info,
      name: own_name,
      viewed_count,
      rate,
      status,
      episode,
      season,
      is_favorite,
    } = formData;

    const { id, name, image } = unity_info || {};

    const unityData = {
      unity_id: id,
      is_favorite: !!is_favorite,
      name: own_name || name,
      rate,
      imageUrl: image,
      status,
      episode,
      season,
      viewed_count,
    };

    try {
      const response = await createListItem(unityData);

      if (response.success) {
        toast({
          title: 'Успішно додано!',
          description: own_name || name,
          variant: 'success',
        });
      } else if (response.error === ErrorCodes.ITEM_ALREADY_EXISTS) {
        toast({
          title: 'Не вдалось додати!',
          description: 'Це аніме вже є у вашому списку.',
          variant: 'destructive',
        });
      }
    } catch (e) {
      toast({
        title: 'Не вдалось додати!',
        description: 'Сталася невідома помилка.',
        variant: 'destructive',
      });
    }
  };

  return createNewUnity;
};
