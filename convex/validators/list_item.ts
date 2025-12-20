import { v } from 'convex/values';
import { MediaItemStatus } from '../shared/enums';

export const statusValidator = v.union(
  v.literal(MediaItemStatus.All),
  v.literal(MediaItemStatus.Favorite),
  v.literal(MediaItemStatus.Scheduled),
  v.literal(MediaItemStatus.Watching),
  v.literal(MediaItemStatus.Postponed),
  v.literal(MediaItemStatus.Abandoned),
  v.literal(MediaItemStatus.Completed)
);

export const listItemFields = {
  mediaApiId: v.string(),
  isFavorite: v.optional(v.boolean()),
  name: v.string(),
  rate: v.optional(v.number()),
  status: statusValidator,
  viewedCount: v.optional(v.number()),
  episodesCount: v.optional(v.number()),
  website: v.optional(v.string()),
  comment: v.optional(v.string()),
  user: v.id('users'),
};
