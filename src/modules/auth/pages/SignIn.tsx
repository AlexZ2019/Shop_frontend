import * as React from 'react';
import CustomForm from '../components/form';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { loginMutationGQL } from '../graphql/mutations/login';
import { getLocalStorageValue, setLocalStorageValue } from '../../../utils/localStorage';
import { Inputs } from '../types/types';
import { USER_QUERY } from '../graphql/queries/getUser';
import RoutePaths from '../../../constants/routePaths';

const SignIn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const [fetchUser, { loading }] = useLazyQuery(USER_QUERY);
  const [login] = useMutation(loginMutationGQL, {
    onCompleted: (data: { login: { accessToken: string; refreshToken: string } }) => {
      setLocalStorageValue('accessToken', data.login.accessToken);
      setLocalStorageValue('refreshToken', data.login.refreshToken);
    }
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await login({ variables: data });
    if (getLocalStorageValue('accessToken')) {
      await fetchUser();
      navigate(RoutePaths.main);
    }
  };

  return (
    <div>
      <CustomForm
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        loading={loading}
      />
    </div>
  );
};

export default SignIn;
