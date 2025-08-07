import { api } from '@convex/api';
import { useMutation, useQuery } from 'convex/react';

export const useComments = (id: number) => {
  const commentsList = useQuery(api.comments.getMediaComments, { mediaId: id });

  const addComment = useMutation(api.comments.addComment);
  const deleteComment = useMutation(api.comments.deleteComment);

  return {
    commentsList,
    addComment,
    deleteComment,
  };
};
