import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_ANI_LIST_API;

if (!endpoint) {
  throw new Error("Missing NEXT_PUBLIC_ANI_LIST_API");
}

export const graphqlClient = new GraphQLClient(endpoint);

export const fetcher = <T>([query, variables]: [
  string,
  Record<string, unknown>,
]): Promise<T> => graphqlClient.request<T>(query, variables);
