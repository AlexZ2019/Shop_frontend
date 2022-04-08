import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getLocalStorageValue, setLocalStorageValue } from '../../utils/localStorage';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN_MUTATION } from '../../modules/auth/graphql/mutations/refreshToken';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});

const accessToken = getLocalStorageValue('accessToken');
const refreshToken = getLocalStorageValue('refreshToken');

const authLink = setContext((_, { headers }) => {

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  };
});

const getAndSaveRefreshToken = async (refreshToken: string | null) => {
  const response = await client.mutate({
    mutation: REFRESH_TOKEN_MUTATION,
    context: {
      headers: {
        authorization: `Bearer ${refreshToken}`
      }
    }
  });
  setLocalStorageValue('accessToken', response.data.refreshToken.accessToken);
  setLocalStorageValue('refreshToken', response.data.refreshToken.refreshToken);
};

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          try {
            getAndSaveRefreshToken(refreshToken);
          } catch {
            throw new Error('refresh token is expired');
          }

          return forward(operation);
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
});

export const client = new ApolloClient({
  link: from([errorLink, httpLink, authLink]),
  cache: new InMemoryCache()
});
