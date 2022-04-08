import React from 'react';
import { ChildrenProps } from '../modules/auth/types/types';
import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../modules/auth/graphql/queries/getUser';
import MainSpiner from '../modules/common/components/mainSpiner';
import { getLocalStorageValue } from '../utils/localStorage';

const UserProvider = ({ children }: ChildrenProps) => {
  const accessToken = getLocalStorageValue('accessToken');
  const { loading, data } = useQuery(USER_QUERY, {context: {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }});

  if (loading) {
    return <MainSpiner />;
  }

  return <>{children}</>;
};

export default UserProvider;
