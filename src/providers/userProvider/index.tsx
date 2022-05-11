import React, { FC, ReactNode, useEffect } from 'react';
import { USER_QUERY } from '../../modules/user/graphql/queries/getUser';
import { getLocalStorageValue } from '../../utils/localStorage';
import Spiner from '../../modules/common/components/Spinner';
import { useLazyQuery } from '@apollo/client';

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
    return <Spiner spinnerType='main' customStyles=''/>;
  }

  return <>{children}</>;
};

export default UserProvider;
