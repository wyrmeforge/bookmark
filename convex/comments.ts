import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getUserId } from './helpers';

export const getMediaComments = query({
  args: {
    mediaId: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error('User not authenticated');

    return ctx.db
      .query('comments')
      .order('desc')
      .filter((q) => q.eq(q.field('mediaId'), args.mediaId))
      .collect();
  },
});

export const addComment = mutation({
  args: {
    mediaId: v.number(),
    comment: v.string(),
    mention: v.optional(v.array(v.id('users'))),
    user: v.object({
      nickname: v.string(),
      picture: v.string(),
      id: v.string(),
    }),
    replyTo: v.optional(
      v.object({
        userId: v.string(),
        nickname: v.string(),
        commentId: v.id('comments'),
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error('User not authenticated');

    await ctx.db.insert('comments', {
      mediaId: args.mediaId,
      comment: args.comment,
      user: args.user,
      mention: args.mention,
      replyTo: args.replyTo ?? undefined,
    });
  },
});

export const deleteComment = mutation({
  args: { id: v.id('comments') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);

    return { success: true };
  },
});
