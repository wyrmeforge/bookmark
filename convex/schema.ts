import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { MediaStatus } from './enums';

export default defineSchema({
  lists: defineTable({
    mediaId: v.number(),
    isFavorite: v.optional(v.boolean()),
    name: v.string(),
    rate: v.optional(v.number()),
    status: v.union(
      v.literal(MediaStatus.All),
      v.literal(MediaStatus.Favorite),
      v.literal(MediaStatus.Scheduled),
      v.literal(MediaStatus.Watching),
      v.literal(MediaStatus.Postponed),
      v.literal(MediaStatus.Abandoned),
      v.literal(MediaStatus.Completed)
    ),
    viewedCount: v.optional(v.number()),
    bannerImage: v.optional(v.string()),
    imageUrl: v.string(),
    episode: v.optional(v.number()),
    totalEpisodes: v.optional(v.number()),
    website: v.optional(v.string()),
    comment: v.optional(v.string()),
    user: v.id('users'),
  })
    .index('by_user', ['user', 'status'])
    .searchIndex('by_name', {
      searchField: 'name',
      filterFields: ['user'],
    }),
  users: defineTable({
    name: v.string(),
    nickname: v.optional(v.string()),
    friends: v.optional(v.array(v.id('users'))),
    tokenIdentifier: v.string(),
  })
    .index('by_token', ['tokenIdentifier'])
    .searchIndex('by_name', {
      searchField: 'name',
      filterFields: ['name'],
    }),
  media: defineTable({
    mediaId: v.number(),
    users: v.number(),
    totalRate: v.object({
      _1: v.number(),
      _2: v.number(),
      _3: v.number(),
      _4: v.number(),
      _5: v.number(),
      _6: v.number(),
      _7: v.number(),
      _8: v.number(),
      _9: v.number(),
      _10: v.number(),
    }),
    totalStatuses: v.object({
      [MediaStatus.All]: v.number(),
      [MediaStatus.Abandoned]: v.number(),
      [MediaStatus.Completed]: v.number(),
      [MediaStatus.Postponed]: v.number(),
      [MediaStatus.Scheduled]: v.number(),
      [MediaStatus.Watching]: v.number(),
      [MediaStatus.Favorite]: v.number(),
    }),
  }).index('by_mediaId', ['mediaId']),
  comments: defineTable({
    comment: v.string(),
    replyTo: v.optional(
      v.object({
        userId: v.string(),
        nickname: v.string(),
        commentId: v.id('comments'),
      })
    ),
    mediaId: v.number(),
    user: v.object({
      id: v.string(),
      nickname: v.string(),
      picture: v.string(),
    }),
  }).index('by_mediaId', ['mediaId']),
});
