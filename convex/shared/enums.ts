export const MEDIA_STATUSES = {
  ALL: "all",
  SCHEDULED: "scheduled",
  WATCHING: "watching",
  POSTPONED: "postponed",
  ABANDONED: "abandoned",
  COMPLETED: "completed",
  FAVORITE: "favorite",
} as const;

export const MEDIA_STATUS_VALUES = [
  "all",
  "scheduled",
  "watching",
  "postponed",
  "abandoned",
  "completed",
  "favorite",
] as const;

export type MediaStatus = (typeof MEDIA_STATUS_VALUES)[number];

export const INDEX_NAMES = {
  LISTS_BY_USER: "by_user",
  LISTS_BY_ITEM_NAME: "by_item_name",
  MEDIA_BY_API_ID: "by_media_api_id",
} as const;

export type FilterType = MediaStatus;
