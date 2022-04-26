import * as React from 'react';
import SignInForm from '../components/SignInForm';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { LOGIN_MUTATION } from '../graphql/mutations/login';
import { getLocalStorageValue, setTokensToLocalStorage } from '../../../utils/localStorage';
import { Inputs } from '../types';
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
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data: { login: { accessToken: string; refreshToken: string } }) => {
      const tokens = data.login;
      setTokensToLocalStorage(tokens);
    }
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await login({ variables: data });
    if (getLocalStorageValue('accessToken')) {
      await fetchUser(); // needed to save a user to apollo cache
      navigate(RoutePaths.main);
    }
  };

  return (
    <SignInForm
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      loading={loading}
    />
  );
};

export default SignIn;
