import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

export const useDeleteUnity = () => {
  const deleteListItem = useMutation(api.lists.deleteListItem);

  const deleteUnity = (id: Id<'lists'>) => {
    deleteListItem({ id });
  };

  return deleteUnity;
};
