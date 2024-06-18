import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: `${process.env.SHOPIFY_GRAPHQL_API_URL!}`,
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_TOKEN!,
      },
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
