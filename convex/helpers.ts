import { QueryCtx } from './_generated/server';

export const getUserId = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new Error('Unauthenticated call!');
  }

  const user = await ctx.db
    .query('users')
    .withIndex('by_token', (q) =>
      q.eq('tokenIdentifier', identity.tokenIdentifier)
    )
    .unique();

  if (!user || !user?._id) {
    throw new Error('Unauthenticated call!');
  }

  return user._id;
};
