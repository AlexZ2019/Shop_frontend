import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../../../../providers/apollo/config';
import { USER_QUERY } from '../../graphql/queries/getUser';
import RoutePaths from '../../../../constants/routePaths';

export const PrivetRouteWrapper: FC<ReactNode> = ({ children }) => {
  const navigate = useNavigate();
  const user = client.readQuery({
    query: USER_QUERY
  });
  useEffect(() => {
    if (!user) { // TODO: return null if !user
      navigate(RoutePaths.signIn);
    }
  }, [user]);
  return <>{children}</>;
};
