import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserId } from "./helpers";
import {
  INDEX_NAMES,
  MEDIA_STATUS_VALUES,
  MEDIA_STATUSES,
} from "./shared/enums";
import { createListItemArgs, updateListItemArgs } from "./validators/list_item";

// Error messages as constants
const ERRORS = {
  ITEM_ALREADY_EXISTS: "ITEM_ALREADY_EXISTS",
  NO_FIELDS_TO_UPDATE: "NO_FIELDS_TO_UPDATE",
  ITEM_NOT_FOUND: "ITEM_NOT_FOUND",
} as const;

// Response types for mutation and query handlers
export const createListItem = mutation({
  args: createListItemArgs,
  handler: async (
    ctx,
    args
  ): Promise<{ success: boolean; error?: string; id?: string }> => {
    const userId = await getUserId(ctx);

    // Check for existing item with same mediaApiId for this user
    const existingItem = await ctx.db
      .query("lists")
      .withIndex(INDEX_NAMES.LISTS_BY_USER, (q) => q.eq("user", userId))
      .filter((q) => q.eq(q.field("mediaApiId"), args.mediaApiId))
      .first();

    if (existingItem) {
      return { success: false, error: ERRORS.ITEM_ALREADY_EXISTS };
    }

    const id = await ctx.db.insert("lists", { ...args, user: userId });
    return { success: true, id };
  },
});

/**
 * Retrieves paginated list items filtered by status or favorite
 * Uses indexes for optimal performance
 */
export const getList = query({
  args: {
    filter: v.union(...MEDIA_STATUS_VALUES.map(v.literal)),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { filter, paginationOpts }) => {
    const userId = await getUserId(ctx);

    let listsQuery = ctx.db
      .query("lists")
      .withIndex(INDEX_NAMES.LISTS_BY_USER, (q) => q.eq("user", userId));

    // Apply status or favorite filter
    if (filter === MEDIA_STATUSES.FAVORITE) {
      listsQuery = listsQuery.filter((q) => q.eq(q.field("isFavorite"), true));
    } else if (filter !== MEDIA_STATUSES.ALL) {
      listsQuery = listsQuery.filter((q) => q.eq(q.field("status"), filter));
    }

    return await listsQuery.paginate(paginationOpts);
  },
});

/**
 * Searches media items by name for the authenticated user
 * Limited to 5 results for performance
 */
export const searchMedia = mutation({
  args: {
    value: v.optional(v.string()),
  },
  handler: async (ctx, { value }) => {
    const userId = await getUserId(ctx);

    const searchQuery = value?.trim() || "";

    return await ctx.db
      .query("lists")
      .withSearchIndex(INDEX_NAMES.LISTS_BY_ITEM_NAME, (q) =>
        q.search("name", searchQuery).eq("user", userId)
      )
      .take(5);
  },
});

/**
 * Retrieves a single list item by media API ID
 */
export const getListItem = query({
  args: { mediaApiId: v.string() },
  handler: async (ctx, { mediaApiId }) => {
    const userId = await getUserId(ctx);

    return await ctx.db
      .query("lists")
      .withIndex(INDEX_NAMES.LISTS_BY_USER, (q) => q.eq("user", userId))
      .filter((q) => q.eq(q.field("mediaApiId"), mediaApiId))
      .unique();
  },
});

/**
 * Updates a list item with partial data
 * Validates that at least one field is provided
 */
export const updateListItem = mutation({
  args: {
    id: v.id("lists"),
    newData: updateListItemArgs,
  },
  handler: async (
    ctx,
    { id, newData }
  ): Promise<{ success: boolean; error?: string }> => {
    // Ensure at least one field is provided for update
    const hasUpdates = Object.values(newData).some(
      (value) => value !== undefined
    );
    if (!hasUpdates) {
      return { success: false, error: ERRORS.NO_FIELDS_TO_UPDATE };
    }

    // Filter out undefined values
    const updateData = Object.fromEntries(
      Object.entries(newData).filter(([, value]) => value !== undefined)
    );

    await ctx.db.patch(id, updateData);
    return { success: true };
  },
});

/**
 * Deletes a list item by ID
 */
export const deleteListItem = mutation({
  args: { id: v.id("lists") },
  handler: async (ctx, { id }): Promise<{ success: boolean }> => {
    await ctx.db.delete(id);
    return { success: true };
  },
});

/**
 * Counts list items by status and calculates aggregate statistics
 * Returns counts for each media status plus total "all" count
 */
export const getListModulesCount = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);

    const allLists = await ctx.db
      .query("lists")
      .withIndex(INDEX_NAMES.LISTS_BY_USER, (q) => q.eq("user", userId))
      .collect();

    // Initialize status counts for each status value
    const statusCounts: Record<string, number> = MEDIA_STATUS_VALUES.reduce(
      (acc, status) => {
        acc[status] = 0;
        return acc;
      },
      {} as Record<string, number>
    );

    // Count items by status and favorite
    for (const item of allLists) {
      if (item.isFavorite) {
        statusCounts[MEDIA_STATUSES.FAVORITE]++;
      }

      if (
        item.status &&
        item.status !== MEDIA_STATUSES.ALL &&
        MEDIA_STATUS_VALUES.includes(
          item.status as (typeof MEDIA_STATUS_VALUES)[number]
        )
      ) {
        statusCounts[item.status]++;
      }
    }

    // Set total count
    statusCounts[MEDIA_STATUSES.ALL] = allLists.length;

    return statusCounts;
  },
});
