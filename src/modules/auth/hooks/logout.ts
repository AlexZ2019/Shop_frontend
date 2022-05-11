import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { removeLocalStorageValue } from '../../../utils/localStorage';
import routePaths from '../../../constants';
import { client } from '../../../providers/apollo/config';
import { LOGOUT_MUTATION } from '../graphql/mutations/logout';
export const useLogout = () => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  return async (userId: number) => {
    await client.mutate({
      mutation: LOGOUT_MUTATION,
      variables: {
        userId
      }
    })
    await apolloClient.clearStore();
    removeLocalStorageValue('accessToken');
    removeLocalStorageValue('refreshToken');
    navigate(routePaths.signIn);
  };
};
