import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '../../../constants/routePaths';
import { PropsType } from './types/types';
import client from '../../../providers/apollo';
import { USER_QUERY } from '../../auth/graphql/queries/getUser';

export const PrivetRouteWrapper: FC<PropsType> = ({children}) => {
  const navigate = useNavigate();
  const user = client.readQuery({
    query: USER_QUERY
  })

  useEffect(() => {
    if (!user) {
      navigate(RoutePaths.signIn);
    }
  }, []);

  return <>{children}</>
}
