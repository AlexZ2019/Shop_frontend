import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '../../../constants/routePaths';
import { PropsType } from './types/types';
import { USER_QUERY } from '../../auth/graphql/queries/getUser';
import { client } from '../../../providers/apollo/config';

export const NotAuthWrapper: FC<PropsType> = ({ children }) => {
  const navigate = useNavigate();
  const user = client.readQuery({
    query: USER_QUERY
  });

  useEffect(() => {
    if (user) {
      navigate(RoutePaths.main);
    }
  }, [user]);

  return <>{children}</>;
};
