import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserId } from "./helpers";

export const store = mutation(async ({ db, auth }) => {
  const identity = await auth.getUserIdentity();

  if (!identity) {
    throw new Error("Called storeUser without authentication present");
  }

  const user = await db
    .query("users")
    .withIndex("by_token", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .unique();

  const userName = identity.name || identity.nickname || identity.email;

  if (!userName) {
    throw new Error("User name is required");
  }

  if (user !== null) {
    if (user.name !== userName) {
      await db.patch(user._id, { name: userName });
    }
    return user._id;
  }

  return db.insert("users", {
    name: userName,
    avatar: identity.pictureUrl || identity?.profileUrl,
    nickname: identity.nickname,
    friends: [],
    tokenIdentifier: identity.tokenIdentifier,
  });
});

export const getCurrentUser = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    return await ctx.db.get(userId);
  },
});

export const getUserFriends = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    const user = await ctx.db.get(userId);

    if (!user?.friends || user.friends.length === 0) {
      return [];
    }

    const friends = await Promise.all(
      user.friends.map((friendId) => ctx.db.get(friendId))
    );

    return friends.filter(Boolean); // remove nulls
  },
});

export const searchUsersByName = query({
  args: { name: v.string() },
  handler: (ctx, args) => {
    return ctx.db
      .query("users")
      .withSearchIndex("by_name", (q) => q.search("name", args.name))
      .collect();
  },
});

export const getUserById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    if (!args.id) {
      return;
    }

    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique();
  },
});

export const getUsersNicknames = query({
  handler: async ({ db }) => {
    const data = await db.query("users").collect();

    return data.map((item) => ({
      id: item._id,
      avatar: item.avatar,
      display: item.nickname || item.name,
    }));
  },
});
