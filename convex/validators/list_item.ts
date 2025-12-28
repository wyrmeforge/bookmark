import { v } from 'convex/values';
import { mediaStatusValues } from '../shared/enums';

export const statusValidator = v.union(...mediaStatusValues.map(v.literal));

const commonListItemFields = {
  mediaApiId: v.string(),
  isFavorite: v.optional(v.boolean()),
  name: v.string(),
  rate: v.optional(v.number()),
  image: v.string(),
  status: statusValidator,
  viewedCount: v.optional(v.number()),
  episodesCount: v.optional(v.number()),
  website: v.optional(v.string()),
  comment: v.optional(v.string()),
};

export const defaultListItemFields = {
  ...commonListItemFields,
  user: v.id('users'),
};

export const createListItemArgs = commonListItemFields;
