import { v } from 'convex/values';
import { query } from './_generated/server';
import { getUserId } from './helpers';

export const getMediaStats = query({
  args: { mediaId: v.number() },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) throw new Error('User not authenticated');

    return ctx.db
      .query('media')
      .withIndex('by_mediaId', (q) => q.eq('mediaId', args.mediaId))
      .unique();
  },
});
