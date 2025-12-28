import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserId } from "./helpers";
import { ListIndexes, MediaItemStatus } from "./shared/enums";
import { createListItemArgs } from "./validators/list_item";

export const createListItem = mutation({
  args: createListItemArgs,
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const existingItem = await ctx.db
      .query("lists")
      .filter((q) => q.eq(q.field("mediaApiId"), args.mediaApiId))
      .filter((q) => q.eq(q.field("user"), userId))
      .first();

    if (existingItem) {
      return { success: false, error: "ITEM_ALREADY_EXISTS" };
    }
    await ctx.db.insert("lists", { ...args, user: userId });

    return { success: true };
  },
});

export const getList = query({
  args: {
    filter: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { filter, paginationOpts }) => {
    const userId = await getUserId(ctx);

    // Start query for the user's lists
    let listsQuery = ctx.db
      .query("lists")
      .withIndex(ListIndexes.UserIndex, (q) => q.eq("user", userId));

    // Filter by favorite or status
    if (filter === MediaItemStatus.Favorite) {
      listsQuery = listsQuery.filter((q) => q.eq(q.field("isFavorite"), true));
    } else if (filter !== MediaItemStatus.All) {
      listsQuery = listsQuery.filter((q) => q.eq(q.field("status"), filter));
    }

    // Paginate
    const result = await listsQuery.paginate(paginationOpts);

    return result;
  },
});

export const searchMedia = mutation({
  args: {
    value: v.optional(v.string()),
  },
  handler: async (ctx, { value }) => {
    const userId = await getUserId(ctx);

    const result = await ctx.db
      .query("lists")
      .withSearchIndex(ListIndexes.NameSearchIndex, (q) =>
        q.search("name", value || "").eq("user", userId)
      )
      .take(5);

    return result;
  },
});

export const getListItem = query({
  args: { mediaApiId: v.string() },
  handler: async (ctx, { mediaApiId }) => {
    const userId = await getUserId(ctx);

    return await ctx.db
      .query("lists")
      .withIndex(ListIndexes.UserIndex, (q) => q.eq("user", userId))
      .filter((q) => q.eq(q.field("mediaApiId"), mediaApiId))
      .unique();
  },
});

// Update
export const updateListItem = mutation({
  args: {
    id: v.id("lists"),
    newData: v.optional(v.object(createListItemArgs)),
  },
  handler: async (ctx, args) => {
    const { id, newData } = args;

    await ctx.db.patch(id, { ...newData });

    return { success: true };
  },
});

// Delete
export const deleteListItem = mutation({
  args: { id: v.id("lists") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);

    return { success: true };
  },
});

export const getListModulesCount = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);

    const allLists = await ctx.db
      .query("lists")
      .withIndex(ListIndexes.UserIndex, (q) => q.eq("user", userId))
      .collect();

    const statusCounts: Record<MediaItemStatus, number> = Object.values(
      MediaItemStatus
    ).reduce(
      (acc, status) => {
        acc[status] = 0;
        return acc;
      },
      {} as Record<MediaItemStatus, number>
    );

    allLists.forEach((item) => {
      if (item.isFavorite) statusCounts[MediaItemStatus.Favorite]++;

      if (
        item.status &&
        item.status !== MediaItemStatus.All &&
        Object.values(MediaItemStatus).includes(item.status as MediaItemStatus)
      ) {
        statusCounts[item.status as MediaItemStatus]++;
      }
    });

    statusCounts[MediaItemStatus.All] = allLists.length;

    return statusCounts;
  },
});
