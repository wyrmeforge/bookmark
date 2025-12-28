import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { INDEX_NAMES } from "./shared/enums";
import { defaultListItemFields } from "./validators/list_item";
import { mediaItemFields } from "./validators/media_item";

export default defineSchema({
  lists: defineTable(defaultListItemFields)
    .index(INDEX_NAMES.LISTS_BY_USER, ["user"])
    .searchIndex(INDEX_NAMES.LISTS_BY_ITEM_NAME, {
      searchField: "name",
      filterFields: ["user"],
    }),
  media: defineTable(mediaItemFields).index(INDEX_NAMES.MEDIA_BY_API_ID, [
    "mediaApiId",
  ]),
  users: defineTable({
    name: v.string(),
    nickname: v.optional(v.string()),
    avatar: v.optional(v.string()),
    friends: v.optional(v.array(v.id("users"))),
    tokenIdentifier: v.string(),
  })
    .index("by_token", ["tokenIdentifier"])
    .searchIndex("by_name", {
      searchField: "name",
      filterFields: ["name"],
    }),
});
