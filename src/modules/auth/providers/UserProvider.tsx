import { FC } from 'react';
import { Props } from '../types/types';
import { useNavigate } from 'react-router-dom';

const UserProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return <>{children}</>;
};

export default UserProvider;
