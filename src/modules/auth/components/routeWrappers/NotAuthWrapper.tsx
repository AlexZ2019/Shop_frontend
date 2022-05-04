import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import RoutePaths from '../../../../constants/routePaths';
import { useQuery } from '@apollo/client';

export const NotAuthWrapper: FC<ReactNode> = ({ children }) => {
  const navigate = useNavigate();
  const { data } = useQuery(USER_QUERY);
  useEffect(() => {
    if (data) {
      navigate(RoutePaths.main);
    }
  }, [data]);

  if (data) {
    return null;
  }
  return <>{children}</>;
};
