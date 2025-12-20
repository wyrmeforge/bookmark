/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as enums from "../enums.js";
import type * as helpers from "../helpers.js";
import type * as lists from "../lists.js";
import type * as shared_enums from "../shared/enums.js";
import type * as users from "../users.js";
import type * as validators_list_item from "../validators/list_item.js";
import type * as validators_media_item from "../validators/media_item.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  enums: typeof enums;
  helpers: typeof helpers;
  lists: typeof lists;
  "shared/enums": typeof shared_enums;
  users: typeof users;
  "validators/list_item": typeof validators_list_item;
  "validators/media_item": typeof validators_media_item;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
