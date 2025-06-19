import { MediaItemId } from '@/shared/types/media';

export type UseDeleteMediaItemReturn = {
  deleteMedia: (id: MediaItemId) => Promise<void>;
};
