import { MEDIA_STATUS_FILTERS } from "@/shared/config";
import { MediaStatus } from "@/shared/enums";

export const MENU_MEDIA_FILTERS = MEDIA_STATUS_FILTERS.filter(({ key }) =>
  [
    MediaStatus.Scheduled,
    MediaStatus.Watching,
    MediaStatus.Postponed,
    MediaStatus.Abandoned,
    MediaStatus.Completed,
  ].includes(key)
);
