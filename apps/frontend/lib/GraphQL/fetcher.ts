import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

const client = new GraphQLClient(endpoint);

export function fetcher<TData, TVariables extends { [key: string]: any }>(
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit["headers"]
) {
  return async (): Promise<TData> => {
    if (window === undefined) {
      throw new Error("Fetcher should only be called on the client");
    }

    if (!window.Clerk.session) {
      return client.request({
        document: query,
        variables,
        requestHeaders,
      });
    }

    const token = await window.Clerk.session.getToken();

    return client.request({
      document: query,
      variables,
      requestHeaders: {
        Authorization: `Bearer ${token}`,
        ...requestHeaders,
      },
    });
  };
}
