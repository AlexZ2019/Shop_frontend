import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_QUERY } from '../../../../user/graphql/queries/getUser';
import RoutePaths from '../../../../../constants/routePaths';
import { useQuery } from '@apollo/client';
import Navigation from "../../../../common/components/Navigation";
import styles from './index.module.css';
import { useLogout } from "../../../hooks/logout";
export const PrivetRouteWrapper: FC<ReactNode> = ({ children }) => {
  const navigate = useNavigate();
  const { data } = useQuery(USER_QUERY);
  const logout = useLogout();

  useEffect(() => {
    if (!data) {
      navigate(RoutePaths.signIn);
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return <div className={styles.container}>
    <Navigation logout={logout}/>
    {children}
  </div>;
};
