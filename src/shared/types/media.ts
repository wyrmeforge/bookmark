import { Doc, Id } from '@convex/dataModel';

export type MediaItem = Doc<'lists'>;

export type MediaItemId = Id<'lists'>;

export type MediaItemStatus = MediaItem['status'];
