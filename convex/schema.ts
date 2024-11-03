import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  lists: defineTable({
    unity_id: v.string(),
    is_favorite: v.optional(v.boolean()),
    name: v.string(),
    rate: v.optional(v.string()),
    status: v.string(),
    viewed_count: v.optional(v.string()),
    imageUrl: v.string(),
    episode: v.optional(v.string()),
    season: v.optional(v.string()),
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
