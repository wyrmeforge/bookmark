import { MEDIA_FILTERS } from '@/shared/config/media/media-filters';
import { MediaStatus } from '@/shared/enums/media';

export const MODIFY_MEDIA_STATUS_ITEMS = MEDIA_FILTERS.filter(({ key }) =>
  [
    MediaStatus.Scheduled,
    MediaStatus.Watching,
    MediaStatus.Postponed,
    MediaStatus.Abandoned,
    MediaStatus.Completed,
  ].includes(key)
).map(({ key, label }) => ({
  value: key,
  label,
}));
