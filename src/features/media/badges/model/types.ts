import { MediaItem } from '@/shared/types/media';

export type MediaItemBadgesProps = Pick<
  MediaItem,
  'episode' | 'season' | 'isFavorite' | 'status'
>;
