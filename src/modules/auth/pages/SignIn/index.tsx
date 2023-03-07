import * as React from 'react';
import UserForm from '../../components/UserForm';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { LOGIN_MUTATION } from '../../graphql/mutations/login';
import { getLocalStorageValue, setTokensToLocalStorage } from '../../../../utils/localStorage';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import RoutePaths from '../../../../constants/routePaths';
import styles from './index.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GoogleLogin } from "@react-oauth/google";
import { LOGIN_WITH_GOOGLE_MUTATION } from "../../graphql/mutations/loginWithGoogle";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(3)
}).required();

const SignIn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema)
  });
  const [fetchUser, { loading }] = useLazyQuery(USER_QUERY);
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data: { login: { accessToken: string; refreshToken: string } }) => {
      const tokens = data.login;
      setTokensToLocalStorage(tokens);
    }
  });
  const [loginWithGoogle] = useMutation(LOGIN_WITH_GOOGLE_MUTATION, {
    onCompleted: async (data: { loginWithGoogle: { accessToken: string; refreshToken: string } }) => {
      const tokens = data.loginWithGoogle;
      setTokensToLocalStorage(tokens);
      await fetchUser();
      navigate(RoutePaths.main);
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await login({ variables: data });
    if (getLocalStorageValue('accessToken')) {
      await fetchUser();
      navigate(RoutePaths.main);
    }
  };

  const goToRegistration = () => {
    navigate(`../${RoutePaths.register}`, { replace: true });
  }

  return (
    <div className={styles.signInContainer}>
      <UserForm
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        loading={loading}
        formProps={{ title: 'Login', submitButtonText: 'Login', redirectButtonText: 'Register',
          redirect: goToRegistration }}
      />
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);
          await loginWithGoogle({ variables: { token: credentialResponse.credential }});

        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </div>
  );
};

export default SignIn;
