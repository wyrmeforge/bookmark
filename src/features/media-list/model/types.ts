import { MediaStatus } from '@/shared/enums';
import { MediaItem, MediaItemId } from '@/shared/api';

export type UseMediaActionsProps = {
  mediaItemId: MediaItemId;
  isFavorite?: MediaItem['isFavorite'];
};

export type UseMediaActionsReturn = {
  toggleFavorite: () => Promise<void>;
  changeStatus: (newStatus: MediaStatus) => Promise<void>;
};
