import { MediaStatus } from '@/shared/enums/media';
import { MediaItem, MediaItemId } from '@/shared/types/media';

export type UseMediaActionsProps = {
  mediaItemId: MediaItemId;
  isFavorite?: MediaItem['isFavorite'];
};

export type UseMediaActionsReturn = {
  toggleFavorite: () => Promise<void>;
  changeStatus: (newStatus: MediaStatus) => Promise<void>;
};
