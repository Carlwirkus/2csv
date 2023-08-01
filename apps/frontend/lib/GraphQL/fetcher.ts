import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://localhost/graphql");

export function fetcher<TData, TVariables extends { [key: string]: any }>(
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit["headers"]
) {
  return async (): Promise<TData> =>
    client.request({
      document: query,
      variables,
      requestHeaders,
    });
}
