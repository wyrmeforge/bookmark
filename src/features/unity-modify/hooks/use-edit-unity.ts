import { useMutation } from 'convex/react';
import { z as u } from 'zod';
import { FormSchema } from '../form-config';
import { toast } from '@/shared/ui/use-toast';
import { api } from '@convex/api';
import { Id } from '@convex/dataModel';

export const useEditUnity = () => {
  const updateListItem = useMutation(api.lists.updateListItem);

  const editUnity = async (
    unityId: Id<'lists'>,
    data: u.infer<typeof FormSchema>
  ) => {
    const response = await updateListItem({ id: unityId, newData: data });

    if (response.success) {
      toast({
        title: 'Успішно змінено!',
        variant: 'success',
      });
    } else {
      toast({
        title: 'Не вдалось змінити!',
        description: 'Сталася невідома помилка.',
        variant: 'destructive',
      });
    }
  };

  return editUnity;
};
