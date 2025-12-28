import { v } from "convex/values";
import { MEDIA_STATUS_VALUES } from "../shared/enums";

/**
 * Validation constraints for media items
 * Document the expected ranges and limits for validation
 */
export const MEDIA_CONSTRAINTS = {
  GENRES_MIN_ITEMS: 0,
  GENRES_MAX_ITEMS: 50,
  SCORE_COUNTS_MAX_ITEMS: 100,
  MEDIA_API_ID_MAX_LENGTH: 255,
  URL_MAX_LENGTH: 2048,
  SEASON_YEAR_MAX_LENGTH: 4,
  USERS_COUNT_MIN: 0,
  EPISODES_COUNT_MIN: 0,
  BANNER_URL_MAX_LENGTH: 2048,
  COVER_URL_MAX_LENGTH: 2048,
} as const;

/**
 * Status count object mapping each status to the count of items with that status
 * Represents aggregate statistics for media items across different statuses
 */
export const statusCount = v.object(
  Object.fromEntries(
    MEDIA_STATUS_VALUES.map((status) => [status, v.int64()])
  ) as Record<string, ReturnType<typeof v.int64>>
);

/**
 * Core media item database schema
 * Contains all fields stored for a media item in the database
 */
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

// Type exports for type-safe usage
export type MediaItemFields = typeof mediaItemFields;
export type StatusCountType = typeof statusCount;
