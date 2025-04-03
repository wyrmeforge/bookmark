import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { getUserId } from './helpers';
import { Filters } from './enums';
import { paginationOptsValidator } from 'convex/server';

export const getList = query({
  args: {
    filter: v.string(),
    paginationOpts: paginationOptsValidator,
    searchValue: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { filter } = args;
    const userId = await getUserId(ctx);

    if (!userId) {
      throw new Error('User not authenticated');
    }

    let lists;

    if (args.searchValue) {
      lists = ctx.db
        .query('lists')
        .withSearchIndex('by_name', (q) =>
          q.search('name', args.searchValue || '').eq('user', userId)
        );
    } else {
      lists = ctx.db
        .query('lists')
        .withIndex('by_user', (q) => q.eq('user', userId))
        .order('desc');
    }

    if (filter && filter !== Filters.All) {
      lists = lists.filter((q) =>
        filter === Filters.Favorite
          ? q.eq(q.field('is_favorite'), true)
          : q.eq(q.field('status'), filter)
      );
    }

    const paginatedLists = await lists.paginate(args.paginationOpts);

    return paginatedLists;
  },
});

export const createListItem = mutation({
  args: {
    name: v.string(),
    is_favorite: v.boolean(),
    rate: v.optional(v.string()),
    status: v.string(),
    viewed_count: v.optional(v.string()),
    imageUrl: v.string(),
    unity_id: v.string(),
    episode: v.optional(v.string()),
    season: v.optional(v.string()),
    comment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const existingItem = await ctx.db
      .query('lists')
      .filter((q) => q.eq(q.field('unity_id'), args.unity_id))
      .first();

    if (existingItem) {
      return { success: false, error: 'ITEM_ALREADY_EXISTS' };
    }

    await ctx.db.insert('lists', { ...args, user: userId });

    return { success: true };
  },
});

export const updateListItem = mutation({
  args: { id: v.id('lists'), newData: v.any() },
  handler: async (ctx, args) => {
    const { id, newData } = args;

    await ctx.db.patch(id, { ...newData });

    return { success: true };
  },
});

export const deleteListItem = mutation({
  args: { id: v.id('lists') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const getListModules = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);

    const allLists = await ctx.db
      .query('lists')
      .withIndex('by_user', (q) => q.eq('user', userId))
      .collect();

    const statusCounts = {
      all: allLists.length,
      is_favorite: 0,
      in_progress: 0,
      in_future: 0,
      abandoned: 0,
      complete: 0,
    };

    for (const list of allLists) {
      if (list.is_favorite) {
        statusCounts.is_favorite++;
      }

      switch (list.status) {
        case Filters.InProgress:
          statusCounts.in_progress++;
          break;
        case Filters.InFuture:
          statusCounts.in_future++;
          break;
        case Filters.Abandoned:
          statusCounts.abandoned++;
          break;
        case Filters.Completed:
          statusCounts.complete++;
          break;
        default:
          break;
      }
    }

    return statusCounts;
  },
});
