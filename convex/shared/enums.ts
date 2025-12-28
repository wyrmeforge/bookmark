export enum MediaItemStatus {
  All = "all",
  Scheduled = "scheduled",
  Watching = "watching",
  Postponed = "postponed",
  Abandoned = "abandoned",
  Completed = "completed",
  Favorite = "favorite",
}

export const mediaStatusValues = [
  "all",
  "scheduled",
  "watching",
  "postponed",
  "abandoned",
  "completed",
  "favorite",
] as const;

export type TMediaStatusValues = (typeof mediaStatusValues)[number];

export type TMediaStatus =
  | "all"
  | "scheduled"
  | "watching"
  | "postponed"
  | "abandoned"
  | "completed"
  | "favorite";

export enum ListIndexes {
  UserIndex = "by_user",
  NameSearchIndex = "by_item_name",
}

export enum MediaIndexes {
  MediaApiIdIndex = "by_media_api_id",
}
