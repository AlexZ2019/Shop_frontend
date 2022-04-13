import React, { useEffect } from 'react';
import { ChildrenProps } from '../../modules/auth/types/types';
import { USER_QUERY } from '../../modules/auth/graphql/queries/getUser';
import MainSpiner from '../../modules/common/components/mainSpiner';
import { getLocalStorageValue } from '../../utils/localStorage';
import { useLazyQuery } from '@apollo/react-hooks';

const UserProvider = ({ children }: ChildrenProps) => {
  const accessToken = getLocalStorageValue('accessToken');
  const [fetchUser, { loading }] = useLazyQuery(USER_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
  });

  useEffect(() => {
    (async () => {
      if (accessToken) {
        await fetchUser();
      }
    })();
  }, [accessToken]);

  if (loading) {
    return <MainSpiner />;
  }

  return <>{children}</>;
};

export default UserProvider;
