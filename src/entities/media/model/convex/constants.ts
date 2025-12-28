import type { Doc } from "@convex/dataModel";

export const MEDIA_STATUS_VALUES = [
  "all",
  "scheduled",
  "watching",
  "postponed",
  "abandoned",
  "completed",
  "favorite",
] as const;

export type TMediaStatus = (typeof MEDIA_STATUS_VALUES)[number];
export type TMediaId = Doc<"lists">["_id"];

export interface IListItemCommon {
  mediaApiId: string;
  name: string;
  image: string;
  status: TMediaStatus;
  isFavorite?: boolean;
  rate?: number;
  viewedCount?: number;
  episodesCount?: number;
  website?: string;
  comment?: string;
}

export interface IListItem extends IListItemCommon {
  user: string;
  _id: TMediaId;
  _creationTime: number;
}
export interface ICreateListItem extends IListItemCommon {}

export interface IUpdateListItem
  extends Partial<Omit<IListItemCommon, "image">> {}
