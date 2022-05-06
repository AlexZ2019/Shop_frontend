import React, { FC, ReactNode, useEffect } from 'react';
import { USER_QUERY } from '../../modules/user/graphql/queries/getUser';
import MainSpiner from '../../modules/common/components/MainSpiner';
import { getLocalStorageValue } from '../../utils/localStorage';
import { useLazyQuery } from '@apollo/react-hooks';

const UserProvider: FC<ReactNode> = ({ children }) => {
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
