import { v } from 'convex/values';
import { MediaItemStatus } from '../shared/enums';

export const statusCount = v.array(
  v.object({
    [MediaItemStatus.Abandoned]: v.int64(),
    [MediaItemStatus.All]: v.int64(),
    [MediaItemStatus.Completed]: v.int64(),
    [MediaItemStatus.Favorite]: v.int64(),
    [MediaItemStatus.Postponed]: v.int64(),
    [MediaItemStatus.Scheduled]: v.int64(),
    [MediaItemStatus.Watching]: v.int64(),
  })
);

export const mediaItemFields = {
  statusCount,
  mediaApiId: v.string(),
  scoreCounts: v.array(v.record(v.string(), v.int64())),
  genres: v.array(v.string()),
  episodesCount: v.optional(v.number()),
  bannerUrl: v.optional(v.string()),
  coverUrl: v.string(),
  seasonYear: v.string(),
  usersCount: v.int64(),
};
