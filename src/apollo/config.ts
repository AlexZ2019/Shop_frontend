import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getLocalStorageValue, setLocalStorageValue } from '../utils/localStorage';
import { onError } from '@apollo/client/link/error';
import { USER_QUERY } from '../modules/auth/graphql/queries/getUser';
import { REFRESH_TOKEN_MUTATION } from '../modules/auth/graphql/mutations/refreshToken';

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

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          const headers = operation.getContext().headers;
          client.mutate({
            mutation: REFRESH_TOKEN_MUTATION,
            context: {
              headers: {
                authorization: refreshToken ? `Bearer ${refreshToken}` : ''
              }
            }
          }).then(data => {
            setLocalStorageValue("accessToken", data.data.refreshToken.accessToken);
            setLocalStorageValue("refreshToken", data.data.refreshToken.refreshToken);
            debugger
          });

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

client.query({
  query: USER_QUERY,
  context: {
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  }
}).then(r => console.log(r));
