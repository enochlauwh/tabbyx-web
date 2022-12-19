import { from, ApolloClient, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client';

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  console.log('response', response);
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }

  if (response?.errors) {
    const notAuthenticated = response.errors.some((error) => {
      if (Array.isArray(error.extensions)) {
        error.extensions.some(
          (extension) => extension.code === 'UNAUTHENTICATED',
        );
      }

      return false;
    });

    if (notAuthenticated) {
      location.reload();
    }
  }
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:5700/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;
