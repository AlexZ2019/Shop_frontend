import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getLocalStorageValue, setTokensToLocalStorage } from '../../utils/localStorage';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN_MUTATION } from '../../modules/auth/graphql/mutations/refreshToken';
import config from '../../config';
import { createBrowserHistory } from 'history';
import RoutePaths from '../../constants/routePaths';
import { notification } from 'antd';

const httpLink = createHttpLink({
  uri: config.serverApI
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getLocalStorageValue('accessToken');
  if (accessToken) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`
      }
    };
  }
});

export const refreshTokenClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const refreshTokens = async (refreshToken: string | null) => {
  try {
    const response = await refreshTokenClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      context: {
        headers: {
          authorization: `Bearer ${refreshToken}`
        }
      }
    });

    return response.data.refreshToken;
  } catch (e) {
    const history = createBrowserHistory();
    history.push(RoutePaths.signIn);
    throw e;
  }
};

const openNotificationWithIcon = (errorTitle: string, errorDescription: string) => {
  notification['error']({
    message: errorTitle,
    description: errorDescription
  });
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    (async () => {
      if (graphQLErrors) {
        for (const { message } of graphQLErrors) {
          switch (message) {
            case 'Unauthorized':
              const tokens = await refreshTokens(getLocalStorageValue('refreshToken'));
              setTokensToLocalStorage(tokens);
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  authorization: `Bearer ${tokens.accessToken}`
                }
              });

              return forward(operation);
            case 'Invalid Credentials': {
              openNotificationWithIcon('email or password is incorrect',
                'Please, enter correct email and password and try again');
            }

          }
        }
      }
      if (networkError) {
        openNotificationWithIcon('Connection is failed', '');
      }
    })();
  });

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getUserCitiesId: {
            keyArgs: false,
            merge(existing = [], incoming) {
              if (!existing.length) {
                return incoming;
              } else {
                return [...existing, incoming[incoming.length - 1]];
              }
            }
          }
        }
      }
    }
  })
});

