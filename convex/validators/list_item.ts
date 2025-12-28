import { v } from "convex/values";
import { MEDIA_STATUS_VALUES } from "../shared/enums";

/**
 * Validation constraints for list items
 * Document the expected ranges and limits for validation
 */
export const CONSTRAINTS = {
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 255,
  RATING_MIN: 0,
  RATING_MAX: 10,
  VIEWED_COUNT_MIN: 0,
  EPISODES_COUNT_MIN: 0,
  COMMENT_MAX_LENGTH: 1000,
  MEDIA_API_ID_MIN_LENGTH: 1,
  MEDIA_API_ID_MAX_LENGTH: 255,
  URL_MAX_LENGTH: 2048,
} as const;

// Status validator using const array
export const statusValidator = v.union(
  ...MEDIA_STATUS_VALUES.map((status) => v.literal(status))
);

// Common validators
const mediaApiIdValidator = v.string();
const nameValidator = v.string();
const rateValidator = v.number();
const viewedCountValidator = v.number();
const episodesCountValidator = v.number();
const urlValidator = v.string();
const commentValidator = v.string();

// Core list item fields (shared between DB and mutation args)
export const commonListItemFields = {
  mediaApiId: mediaApiIdValidator,
  isFavorite: v.optional(v.boolean()),
  name: nameValidator,
  rate: v.optional(rateValidator),
  image: v.string(),
  status: statusValidator,
  viewedCount: v.optional(viewedCountValidator),
  episodesCount: v.optional(episodesCountValidator),
  website: v.optional(urlValidator),
  comment: v.optional(commentValidator),
};

// Full list item schema as stored in database (includes user field)
export const defaultListItemFields = {
  ...commonListItemFields,
  user: v.id("users"),
};

// Arguments for creating a new list item (excludes user, which is set by mutation)
export const createListItemArgs = commonListItemFields;

// Arguments for partial updates to list item (all fields optional)
export const updateListItemArgs = v.object({
  isFavorite: v.optional(v.boolean()),
  rate: v.optional(rateValidator),
  status: v.optional(statusValidator),
  viewedCount: v.optional(viewedCountValidator),
  episodesCount: v.optional(episodesCountValidator),
  website: v.optional(urlValidator),
  comment: v.optional(commentValidator),
});

// Type exports for frontend
export type CreateListItemInput = typeof createListItemArgs;
export type UpdateListItemInput = typeof updateListItemArgs;
export type ListItemCommon = typeof commonListItemFields;
