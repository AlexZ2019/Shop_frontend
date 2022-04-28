import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../../../../providers/apollo/config';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import RoutePaths from '../../../../constants/routePaths';

export const PrivetRouteWrapper: FC<ReactNode> = ({ children }) => {
  const navigate = useNavigate();
  const user = client.readQuery({
    query: USER_QUERY
  });
  useEffect(() => {
    if (!user) {
      navigate(RoutePaths.signIn);
    }
  }, [user]);

  if (!user) {
    return null
  }

  return <>{children}</>;
};
