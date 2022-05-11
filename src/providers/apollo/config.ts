import { ApolloClient, createHttpLink, from, fromPromise, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getLocalStorageValue, setTokensToLocalStorage } from '../../utils/localStorage';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN_MUTATION } from '../../modules/auth/graphql/mutations/refreshToken';
import config from '../../config';
import { createBrowserHistory } from 'history';
import RoutePaths from '../../constants/routePaths';
import { gqlErrors } from './gqlErrors';
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

const refreshTokens = async () => {
  try {
    const refreshToken = getLocalStorageValue('refreshToken');
    const response = await refreshTokenClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      context: {
        headers: {
          authorization: `Bearer ${refreshToken}`
        }
      }
    });
    setTokensToLocalStorage(response.data.refreshToken);
    return response.data.refreshToken;
  } catch (e) {
    const history = createBrowserHistory();
    history.push(RoutePaths.signIn);
    throw e;
  }
};
let isRefreshing = false;
let pendingRequests: Function[] = [];

const setIsRefreshing = (value: boolean) => {
  isRefreshing = value;
};

const addPendingRequest = (pendingRequest: Function) => {
  pendingRequests.push(pendingRequest);
};

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      if (error.message === 'Unauthorized') {
        let forward$;
        if (!isRefreshing) {
          setIsRefreshing(true);
          forward$ = fromPromise(
            refreshTokens().then((tokens) => {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${tokens.accessToken}`
                }
              });
              resolvePendingRequests();
            }).catch(() => {
              pendingRequests = [];
              return;
            }).finally(() => {
              setIsRefreshing(false);
            })
          );
        } else {
          forward$ = fromPromise(
            new Promise<void>((resolve) => {
              addPendingRequest(() => resolve());
            })
          );
        }
        forward$.flatMap(() => {
          return forward(operation);
        });
      }
      else {
        notification.error({
          message: gqlErrors[error.message].errorTitle,
          description: gqlErrors[error.message].errorDescription
        });
      }
    }
  }
  if (networkError) {
    return notification.error({
      message: gqlErrors['Network error'].errorTitle,
      description: gqlErrors['Network error'].errorDescription
    });
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getCitiesIds: {
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
