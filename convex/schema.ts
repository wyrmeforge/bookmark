import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { mediaItemFields } from './validators/media_item';
import { ListIndexes, MediaIndexes } from './shared/enums';
import { defaultListItemFields } from './validators/list_item';

export default defineSchema({
  lists: defineTable(defaultListItemFields)
    .index(ListIndexes.UserIndex, ['user'])
    .searchIndex(ListIndexes.NameSearchIndex, {
      searchField: 'name',
      filterFields: ['user'],
    }),
  media: defineTable(mediaItemFields).index(MediaIndexes.MediaApiIdIndex, [
    'mediaApiId',
  ]),
  users: defineTable({
    name: v.string(),
    nickname: v.optional(v.string()),
    avatar: v.optional(v.string()),
    friends: v.optional(v.array(v.id('users'))),
    tokenIdentifier: v.string(),
  })
    .index('by_token', ['tokenIdentifier'])
    .searchIndex('by_name', {
      searchField: 'name',
      filterFields: ['name'],
    }),
});
