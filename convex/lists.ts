import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { getUserId } from './helpers';
import { paginationOptsValidator } from 'convex/server';
import { MediaStatus } from './enums';

export const getList = query({
  args: {
    filter: v.string(),
    paginationOpts: paginationOptsValidator,
    searchValue: v.optional(v.string()),
  },
  handler: async (ctx, { filter, paginationOpts, searchValue }) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error('User not authenticated');

    let listsQuery;

    if (searchValue) {
      // Use search index when search is active
      listsQuery = ctx.db
        .query('lists')
        .withSearchIndex('by_name', (q) =>
          q.search('name', searchValue).eq('user', userId)
        );
    } else {
      // Use normal index for user when search is not active
      listsQuery = ctx.db
        .query('lists')
        .withIndex('by_user', (q) => q.eq('user', userId))
        .order('desc');
    }

    // Apply filter only if it's not "All"
    if (filter && filter !== MediaStatus.All) {
      const isFavoriteFilter = filter === MediaStatus.Favorite;

      listsQuery = listsQuery.filter((q) =>
        isFavoriteFilter
          ? q.eq(q.field('isFavorite'), true)
          : q.eq(q.field('status'), filter)
      );
    }

    return await listsQuery.paginate(paginationOpts);
  },
});

export const createListItem = mutation({
  args: {
    name: v.string(),
    isFavorite: v.boolean(),
    rate: v.optional(v.string()),
    status: v.union(
      v.literal(MediaStatus.Scheduled),
      v.literal(MediaStatus.Watching),
      v.literal(MediaStatus.Postponed),
      v.literal(MediaStatus.Abandoned),
      v.literal(MediaStatus.Favorite),
      v.literal(MediaStatus.Completed)
    ),
    viewedCount: v.optional(v.string()),
    imageUrl: v.string(),
    media3PartyId: v.string(),
    episode: v.optional(v.string()),
    season: v.optional(v.string()),
    comment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const existingItem = await ctx.db
      .query('lists')
      .filter((q) => q.eq(q.field('media3PartyId'), args.media3PartyId))
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
      [MediaStatus.Scheduled]: 0,
      [MediaStatus.Watching]: 0,
      [MediaStatus.Postponed]: 0,
      [MediaStatus.Abandoned]: 0,
      [MediaStatus.Completed]: 0,
      [MediaStatus.Favorite]: 0,
    };

    for (const list of allLists) {
      if (list.isFavorite) {
        statusCounts[MediaStatus.Favorite]++;
      }

      switch (list.status) {
        case MediaStatus.Scheduled:
          statusCounts[MediaStatus.Scheduled]++;
          break;
        case MediaStatus.Watching:
          statusCounts[MediaStatus.Watching]++;
          break;
        case MediaStatus.Postponed:
          statusCounts[MediaStatus.Postponed]++;
          break;
        case MediaStatus.Abandoned:
          statusCounts[MediaStatus.Abandoned]++;
          break;
        case MediaStatus.Completed:
          statusCounts[MediaStatus.Completed]++;
          break;
        default:
          break;
      }
    }

    return statusCounts;
  },
});
