import { MEDIA_FILTERS } from '@/shared/config/media/media-filters';
import { MediaStatus } from '@/shared/enums/media';

export const MENU_MEDIA_FILTERS = MEDIA_FILTERS.filter(({ key }) =>
  [
    MediaStatus.Scheduled,
    MediaStatus.Watching,
    MediaStatus.Postponed,
    MediaStatus.Abandoned,
    MediaStatus.Completed,
  ].includes(key)
);
