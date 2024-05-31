import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { getUserId } from './helpers';

// query

export const getList = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);

    return await ctx.db
      .query('lists')
      .withIndex('by_user', (q) => q.eq('user', userId))
      .collect();
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

    const inProgress = allLists.filter((list) => list.status === 'in_progress');
    const abandoned = allLists.filter((list) => list.status === 'abandoned');
    const complete = allLists.filter((list) => list.status === 'completed');
    const favorite = allLists.filter((list) => !!list.is_favorite);

    return {
      all: allLists.length,
      is_favorite: favorite.length,
      in_progress: inProgress.length,
      abandoned: abandoned.length,
      complete: complete.length,
    };
  },
});

export const addItemToList = mutation({
  args: {
    name: v.string(),
    module: v.string(),
    is_favorite: v.boolean(),
    rate: v.float64(),
    status: v.string(),
    viewed_count: v.float64(),
    imageUrl: v.string(),
    id: v.string(),
    episode: v.string(),
    season: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    await ctx.db.insert('lists', { ...args, user: userId });
  },
});

export const getListByStatus = query({
  args: { module: v.string(), status: v.string() },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (args.status === 'all') {
      return await ctx.db
        .query('lists')
        .withIndex('by_user', (q) => q.eq('user', userId))
        .filter((q) => q.eq(q.field('module'), args.module))
        .collect();
    }

    if (args.status === 'favorite') {
      return await ctx.db
        .query('lists')
        .withIndex('by_user', (q) => q.eq('user', userId))
        .filter((q) =>
          q.and(
            q.eq(q.field('module'), args.module),
            q.eq(q.field('is_favorite'), true)
          )
        )
        .collect();
    }

    return await ctx.db
      .query('lists')
      .withIndex('by_user', (q) => q.eq('user', userId))
      .filter((q) =>
        q.and(
          q.eq(q.field('module'), args.module),
          q.eq(q.field('status'), args.status)
        )
      )
      .collect();
  },
});

export const deleteListItem = mutation({
  args: { id: v.id('lists') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const sortListBy = query({
  args: { module: v.string(), status: v.string(), sortBy: v.string() },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    let list;

    if (args.status === 'all') {
      list = await ctx.db
        .query('lists')
        .withIndex('by_user', (q) => q.eq('user', userId))
        .filter((q) => q.eq(q.field('module'), args.module))
        .collect();
    } else if (args.status === 'favorite') {
      list = await ctx.db
        .query('lists')
        .withIndex('by_user', (q) => q.eq('user', userId))
        .filter((q) =>
          q.and(
            q.eq(q.field('module'), args.module),
            q.eq(q.field('is_favorite'), true)
          )
        )
        .collect();
    } else {
      list = await ctx.db
        .query('lists')
        .withIndex('by_user', (q) => q.eq('user', userId))
        .filter((q) =>
          q.and(
            q.eq(q.field('module'), args.module),
            q.eq(q.field('status'), args.status)
          )
        )
        .collect();
    }

    if (args.sortBy === 'desc') {
      return list.sort((a, b) => b._creationTime - a._creationTime);
    }

    if (args.sortBy === 'asc') {
      return list.sort((a, b) => a._creationTime - b._creationTime);
    }
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

export const updateList = mutation({
  args: { id: v.id('lists'), newData: v.any() },
  handler: async (ctx, args) => {
    const { id, newData } = args;

    await ctx.db.patch(id, { ...newData });
  },
});
