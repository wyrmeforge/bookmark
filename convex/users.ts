import { mutation, query } from './_generated/server';
import { getUserId } from './helpers';
import { v } from 'convex/values';

export const store = mutation(async ({ db, auth }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error('Called storeUser without authentication present');
  }

  const user = await db
    .query('users')
    .withIndex('by_token', (q) =>
      q.eq('tokenIdentifier', identity.tokenIdentifier)
    )
    .unique();

  const userName = identity.name || identity.nickname || identity.email;

  if (user !== null) {
    if (user.name !== userName) {
      await db.patch(user._id, { name: userName });
    }
    return user._id;
  }

  return db.insert('users', {
    name: userName!,
    friends: [],
    tokenIdentifier: identity.tokenIdentifier,
  });
});

export const getUserFriends = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('_id'), args.userId))
      .unique();
  },
});
