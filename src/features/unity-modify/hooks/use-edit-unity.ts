import { useMutation } from 'convex/react';
import { z as u } from 'zod';
import { FormSchema } from '../form-config';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

export const useEditUnity = () => {
  const updateListItem = useMutation(api.lists.updateListItem);

  const editUnity = (
    unityId: Id<'lists'>,
    data: u.infer<typeof FormSchema>
  ) => {
    updateListItem({ id: unityId, newData: data });
  };

  return editUnity;
};
