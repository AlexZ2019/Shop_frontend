import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getLocalStorageValue, setLocalStorageValue } from '../../utils/localStorage';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN_MUTATION } from '../../modules/auth/graphql/mutations/refreshToken';
import config from '../../constants/config';

const httpLink = createHttpLink({
  uri: config.endpoint
});

const authLink = setContext((_, { headers }) => {
  if (getLocalStorageValue('accessToken') && getLocalStorageValue('accessToken') !== 'undefined') {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${getLocalStorageValue('accessToken')}`
      }
    };
  }
});

export const refreshTokenClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const refreshAndSaveTokens = async (refreshToken: string | null) => {
  try {
    const response = await refreshTokenClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      context: {
        headers: {
          authorization: `Bearer ${refreshToken}`
        }
      }
    });
    setLocalStorageValue('accessToken', response.data.refreshToken.accessToken);
    setLocalStorageValue('refreshToken', response.data.refreshToken.refreshToken);
    return response;
  } catch (e) {
    throw e;
  }
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    (async () => {
      if (graphQLErrors) {
        for (const { extensions } of graphQLErrors) {
          switch (extensions.code) {
            case 'UNAUTHENTICATED':
              try {
                const refreshResponse = await refreshAndSaveTokens(getLocalStorageValue('refreshToken'));
                operation.setContext({
                  headers: {
                    ...operation.getContext().headers,
                    authorization: `Bearer ${refreshResponse?.data.refreshToken.accessToken}`
                  }
                });

                return forward(operation);
              }
              catch (e) {
                return e;
              }
          }
        }
      }
    })();
  });

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});

