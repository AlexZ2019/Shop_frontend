import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '../../../constants/routePaths';
import { PropsType } from './types';
import { client } from '../../../providers/apollo/config';
import { USER_QUERY } from '../graphql/queries/getUser';

export const PrivetRouteWrapper: FC<PropsType> = ({ children }) => {
  const navigate = useNavigate();
  const user = client.readQuery({
    query: USER_QUERY
  });
  useEffect(() => {
    if (!user) {
      navigate(RoutePaths.signIn);
    }
  }, [user]);
  return <>{children}</>;
};
