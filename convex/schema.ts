import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { MediaStatus } from './enums';

export default defineSchema({
  lists: defineTable({
    media3PartyId: v.string(),
    isFavorite: v.optional(v.boolean()),
    name: v.string(),
    rate: v.optional(v.string()),
    status: v.union(
      v.literal(MediaStatus.Scheduled),
      v.literal(MediaStatus.Watching),
      v.literal(MediaStatus.Postponed),
      v.literal(MediaStatus.Abandoned),
      v.literal(MediaStatus.Completed)
    ),
    viewedCount: v.optional(v.string()),
    imageUrl: v.string(),
    episode: v.optional(v.string()),
    season: v.optional(v.string()),
    comment: v.optional(v.string()),
    user: v.id('users'),
  })
    .index('by_user', ['user'])
    .searchIndex('by_name', {
      searchField: 'name',
      filterFields: ['user'],
    }),
  users: defineTable({
    name: v.string(),
    friends: v.optional(v.array(v.string())),
    tokenIdentifier: v.string(),
  }).index('by_token', ['tokenIdentifier']),
});
