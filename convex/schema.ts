import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  lists: defineTable({
    id: v.string(),
    module: v.string(),
    is_favorite: v.optional(v.boolean()),
    name: v.string(),
    rate: v.optional(v.float64()),
    status: v.string(),
    viewed_count: v.optional(v.float64()),
    imageUrl: v.string(),
    episode: v.optional(v.string()),
    season: v.optional(v.string()),
    user: v.id('users'),
  }).index('by_user', ['user']),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index('by_token', ['tokenIdentifier']),
});
