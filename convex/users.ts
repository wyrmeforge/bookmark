import { mutation } from './_generated/server';

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

  const userName = identity.name || identity.nickname;

  if (user !== null) {
    if (user.name !== userName) {
      await db.patch(user._id, { name: userName });
    }
    return user._id;
  }

  return db.insert('users', {
    name: userName!,
    tokenIdentifier: identity.tokenIdentifier,
  });
});
