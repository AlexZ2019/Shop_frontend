import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { removeLocalStorageValue } from '../../../utils/localStorage';
import routePaths from '../../../constants';
export const useLogout = () => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  return async () => {
    await apolloClient.clearStore();
    removeLocalStorageValue('accessToken');
    removeLocalStorageValue('refreshToken');
    navigate(routePaths.signIn);
  };
};
