import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { createApolloProvider } from "@vue/apollo-option";
import { api } from "@/config";
import { relayStylePagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: api.HTTP_LINK,
});

const cache = new InMemoryCache({
  typePolicies: {
    Collection: {
      fields: {
        products: relayStylePagination(),
      },
    },
  },
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-Shopify-Storefront-Access-Token": api.MIDDLEWARE_LINK,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export const apolloProvider = createApolloProvider({
  defaultClient: client,
});
