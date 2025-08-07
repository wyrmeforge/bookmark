import { MEDIA_STATUS_FILTERS } from '@/shared/config';
import { MediaStatus } from '@/shared/enums';

export const MODIFY_MEDIA_STATUS_ITEMS = MEDIA_STATUS_FILTERS.filter(
  ({ key }) =>
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
