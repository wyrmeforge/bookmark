import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { getUserId } from './helpers';
import { paginationOptsValidator } from 'convex/server';
import { MediaStatus } from './enums';

export const getList = query({
  args: {
    filter: v.string(),
    paginationOpts: paginationOptsValidator,
    genre: v.optional(v.string()),
    sortBy: v.optional(v.union(v.literal('date'), v.literal('year'))),
    sortOrder: v.optional(v.union(v.literal('asc'), v.literal('desc'))),
  },
  handler: async (
    ctx,
    { filter, paginationOpts, genre, sortBy, sortOrder }
  ) => {
    const userId = await getUserId(ctx);

    let listsQuery;

    if (sortBy === 'date') {
      listsQuery = ctx.db
        .query('lists')
        .withIndex('by_user', (q) => q.eq('user', userId))
        .order(sortOrder ?? 'desc'); // сортування по _creationTime
    } else if (sortBy === 'year') {
      listsQuery = ctx.db
        .query('lists')
        .withIndex('by_user_seasonYear', (q) => q.eq('user', userId))
        .order(sortOrder ?? 'desc');
    } else {
      listsQuery = ctx.db
        .query('lists')
        .withIndex('by_user', (q) => q.eq('user', userId));
    }

    // 🔹 Фільтр по статусу
    if (filter !== MediaStatus.All) {
      const isFavoriteFilter = filter === MediaStatus.Favorite;

      listsQuery = listsQuery.filter((q) =>
        isFavoriteFilter
          ? q.eq(q.field('isFavorite'), true)
          : q.eq(q.field('status'), filter)
      );
    }

    // 🔹 Пагінація
    const result = await listsQuery.paginate(paginationOpts);

    // 🔹 Фільтр по жанру (масив жанрів)
    if (genre) {
      result.page = result.page.filter((item) => item.genres?.includes(genre));
    }

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
      .query('lists')
      .withSearchIndex('by_name', (q) =>
        q.search('name', value || '').eq('user', userId)
      )
      .take(5);

    return result;
  },
});

export const getListItem = query({
  args: { mediaId: v.number() },
  handler: async (ctx, { mediaId }) => {
    const userId = await getUserId(ctx);

    return await ctx.db
      .query('lists')
      .withIndex('by_user', (q) => q.eq('user', userId))
      .filter((q) => q.eq(q.field('mediaId'), mediaId))
      .unique();
  },
});

export const createListItem = mutation({
  args: {
    name: v.string(),
    isFavorite: v.boolean(),
    rate: v.optional(v.number()),
    status: v.union(
      v.literal(MediaStatus.All),
      v.literal(MediaStatus.Favorite),
      v.literal(MediaStatus.Scheduled),
      v.literal(MediaStatus.Watching),
      v.literal(MediaStatus.Postponed),
      v.literal(MediaStatus.Abandoned),
      v.literal(MediaStatus.Completed)
    ),
    viewedCount: v.optional(v.number()),
    imageUrl: v.string(),
    website: v.optional(v.string()),
    mediaId: v.number(),
    genres: v.array(v.string()),
    seasonYear: v.string(),
    episode: v.optional(v.number()),
    bannerImage: v.optional(v.string()),
    totalEpisodes: v.optional(v.number()),
    season: v.optional(v.string()),
    comment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const existingItem = await ctx.db
      .query('lists')
      .filter((q) => q.eq(q.field('mediaId'), args.mediaId))
      .filter((q) => q.eq(q.field('user'), userId))
      .first();

    if (existingItem) {
      return { success: false, error: 'ITEM_ALREADY_EXISTS' };
    }
    const media = await ctx.db
      .query('media')
      .withIndex('by_mediaId', (q) => q.eq('mediaId', args.mediaId))
      .unique();

    const rate = args.rate || 10;
    const isValidRate = !isNaN(rate) && rate >= 1 && rate <= 10;

    if (media) {
      const rateKey = `_${rate}` as keyof typeof media.totalRate;

      await ctx.db.patch(media._id, {
        users: media.users + 1,
        totalRate: isValidRate
          ? {
              ...media.totalRate,
              [rateKey]: media.totalRate[rateKey] + 1,
            }
          : media.totalRate,
        totalStatuses: {
          ...media.totalStatuses,
          [args.status]: media.totalStatuses[args.status] + 1,
          ...(args.isFavorite && {
            [MediaStatus.Favorite]:
              media.totalStatuses[MediaStatus.Favorite] + 1,
          }),
        },
      });
    } else {
      // Create new totalRate from 1 to 10
      const totalRate: {
        _1: number;
        _2: number;
        _3: number;
        _4: number;
        _5: number;
        _6: number;
        _7: number;
        _8: number;
        _9: number;
        _10: number;
      } = {
        _1: rate === 1 ? 1 : 0,
        _2: rate === 2 ? 1 : 0,
        _3: rate === 3 ? 1 : 0,
        _4: rate === 4 ? 1 : 0,
        _5: rate === 5 ? 1 : 0,
        _6: rate === 6 ? 1 : 0,
        _7: rate === 7 ? 1 : 0,
        _8: rate === 8 ? 1 : 0,
        _9: rate === 9 ? 1 : 0,
        _10: rate === 10 ? 1 : 0,
      };

      await ctx.db.insert('media', {
        mediaId: args.mediaId,
        users: 1,
        totalRate,
        totalStatuses: {
          [MediaStatus.All]: 1,
          [MediaStatus.Abandoned]:
            args.status === MediaStatus.Abandoned ? 1 : 0,
          [MediaStatus.Completed]:
            args.status === MediaStatus.Completed ? 1 : 0,
          [MediaStatus.Postponed]:
            args.status === MediaStatus.Postponed ? 1 : 0,
          [MediaStatus.Scheduled]:
            args.status === MediaStatus.Scheduled ? 1 : 0,
          [MediaStatus.Watching]: args.status === MediaStatus.Watching ? 1 : 0,
          [MediaStatus.Favorite]: args.isFavorite ? 1 : 0,
        },
      });
    }
    await ctx.db.insert('lists', { ...args, user: userId });

    return { success: true };
  },
});

// Update
export const updateListItem = mutation({
  args: { id: v.id('lists'), newData: v.any() },
  handler: async (ctx, args) => {
    const { id, newData } = args;

    await ctx.db.patch(id, { ...newData });

    return { success: true };
  },
});

// Delete
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
