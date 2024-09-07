import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { getUserId } from './helpers';
import { Filters } from './enums';

export const getList = query({
  args: {
    module: v.string(),
    status: v.string(),
    sortBy: v.object({
      value: v.string(),
      direction: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { status, module, sortBy } = args;
    const userId = await getUserId(ctx);

    let query = ctx.db
      .query('lists')
      .withIndex('by_user', (q) => q.eq('user', userId))
      .filter((q) => q.eq(q.field('module'), module));

    if (status !== 'all') {
      query = query.filter((q) =>
        status === 'favorite'
          ? q.eq(q.field('is_favorite'), true)
          : q.eq(q.field('status'), status)
      );
    }

    const list = await query.collect();

    const validSortKeys: (keyof (typeof list)[0])[] = [
      '_creationTime',
      'rate',
      'viewed_count',
    ];

    if (validSortKeys.includes(sortBy.value as keyof (typeof list)[0])) {
      const sortKey = sortBy.value as keyof (typeof list)[0];
      list.sort((a, b) => {
        const aValue = a[sortKey] ?? (sortBy.direction === 'desc' ? -1 : 1);
        const bValue = b[sortKey] ?? (sortBy.direction === 'desc' ? -1 : 1);

        return sortBy.direction === 'desc'
          ? bValue > aValue
            ? 1
            : -1
          : aValue > bValue
            ? 1
            : -1;
      });
    }

    return list;
  },
});

export const getListItem = query({
  args: { id: v.id('lists') },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    return await ctx.db
      .query('lists')
      .withIndex('by_user', (q) => q.eq('user', userId))
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();
  },
});

export const createListItem = mutation({
  args: {
    name: v.string(),
    module: v.string(),
    is_favorite: v.boolean(),
    rate: v.optional(v.string()),
    status: v.string(),
    viewed_count: v.optional(v.string()),
    imageUrl: v.string(),
    unity_id: v.string(),
    episode: v.optional(v.string()),
    season: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    await ctx.db.insert('lists', { ...args, user: userId });
  },
});

export const updateListItem = mutation({
  args: { id: v.id('lists'), newData: v.any() },
  handler: async (ctx, args) => {
    const { id, newData } = args;

    await ctx.db.patch(id, { ...newData });
  },
});

export const deleteListItem = mutation({
  args: { id: v.id('lists') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getListModules = query({
  args: { module: v.string() },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const allLists = await ctx.db
      .query('lists')
      .withIndex('by_user', (q) => q.eq('user', userId))
      .filter((q) => q.eq(q.field('module'), args.module))
      .collect();

    const statusCounts = allLists.reduce(
      (counts, list) => {
        counts.all++;

        switch (list.status) {
          case Filters.Favorite:
            counts.is_favorite++;
            break;
          case Filters.InProgress:
            counts.in_progress++;
            break;
          case Filters.InFuture:
            counts.in_future++;
            break;
          case Filters.Abandoned:
            counts.abandoned++;
            break;
          case Filters.Completed:
            counts.complete++;
            break;
          default:
            break;
        }
        return counts;
      },
      {
        all: 0,
        is_favorite: 0,
        in_progress: 0,
        in_future: 0,
        abandoned: 0,
        complete: 0,
      }
    );

    return statusCounts;
  },
});
