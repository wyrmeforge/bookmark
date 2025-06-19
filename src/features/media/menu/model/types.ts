import { MediaStatus } from '@/shared/enums/media';
import { MediaItem } from '@/shared/types/media';

export type UseMediaActionsProps = {
  mediaItemId: MediaItem['_id'];
  isFavorite?: MediaItem['isFavorite'];
};

export type UseMediaActionsReturn = {
  toggleFavorite: () => Promise<void>;
  changeStatus: (newStatus: MediaStatus) => Promise<void>;
};
