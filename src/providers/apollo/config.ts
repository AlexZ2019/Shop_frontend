import {
  ApolloClient,
  createHttpLink,
  from, fromPromise,
  GraphQLRequest,
  InMemoryCache,
} from '@apollo/client';
import {
  getLocalStorageValue,
  removeLocalStorageValue,
  setLocalStorageValue,
} from '../../utils/localStorage';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN_MUTATION } from '../../modules/auth/graphql/mutations/refreshToken';
import config from '../../config';
import { gqlErrors } from './gqlErrors';
import { notification } from 'antd';
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: config.serverApI
});

const isRefreshRequest = (operation: GraphQLRequest) => operation.operationName ===
  'RefreshToken';

const returnTokenDependingOnOperation = (operation: GraphQLRequest) => {
  if (isRefreshRequest(operation)) {
    return getLocalStorageValue('refreshToken') || '';
  } else {
    return getLocalStorageValue('accessToken') || '';
  }
};

const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
    });

    const accessToken = refreshResolverResponse.data?.refreshToken.accessToken;
    await setLocalStorageValue('accessToken',
      refreshResolverResponse.data?.refreshToken.accessToken);
    await setLocalStorageValue('refreshToken',
      refreshResolverResponse.data?.refreshToken.refreshToken);
    return accessToken;
  } catch (err) {
    await removeLocalStorageValue('accessToken');
    await removeLocalStorageValue('refreshToken');
    throw err;
  }
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            if (operation.operationName === 'RefreshToken') return;
            return fromPromise(
              refreshToken().catch((error) => {
                return;
              })
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken) => {
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`,
                  },
                });
                return forward(operation);
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
  },
);
const authLink = setContext(async (operation, { headers }) => {
  const token = returnTokenDependingOnOperation(operation);
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});
export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});
