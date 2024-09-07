import { useMutation } from 'convex/react';
import { z as u } from 'zod';
import { FormSchema } from '../form-config';
import { useContext } from 'react';
import { UnityStateContext } from '@/components/providers/unity-state-provider';
import { api } from '../../../../convex/_generated/api';
import { toast } from '@/components/ui/use-toast';

export const useCreateUnity = () => {
  const { currentModule } = useContext(UnityStateContext);
  const createListItem = useMutation(api.lists.createListItem);

  const createNewUnity = (formData: u.infer<typeof FormSchema>) => {
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

    const { id, name, imageUrl } = unity_info || {};

    if (!id || !imageUrl) return;

    const unityData = {
      unity_id: id,
      module: currentModule,
      is_favorite: !!is_favorite,
      name: own_name || name || '',
      rate,
      imageUrl,
      status,
      episode,
      season,
      viewed_count,
    };

    createListItem(unityData);

    toast({ title: 'Успішно додано!' });
  };

  return createNewUnity;
};
