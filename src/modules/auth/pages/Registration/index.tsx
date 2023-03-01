import * as React from 'react';
import UserForm from '../../components/UserForm';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './index.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from "../../graphql/mutations/register";
import { Select } from "antd";
import { useCallback } from "react";
import RoutePaths from "../../../../constants/routePaths";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(3),
  sex: yup.string()
}).required();

const Registration = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema)
  });
  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => {
      navigate(`../${RoutePaths.signIn}`, { replace: true });
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await register({ variables: data });
  };

  const goToLogin = () => {
    navigate(`../${RoutePaths.signIn}`, { replace: true });
  }

  const Selector = useCallback(({ field }) => {
    return (
      <Select {...field}  style={{width: '100%'}}>
        <Select.Option value="male">Male</Select.Option>
        <Select.Option value="female">Female</Select.Option>
      </Select>
    )
  }, []);

  const extraFields = [
    {
      name: 'sex',
      component: Selector
    },
  ];

  return (
    <div className={styles.signInContainer}>
      <UserForm
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        loading={loading}
        formProps={{ title: 'Register', submitButtonText: 'Register', extraFields, redirectButtonText: 'login',
          redirect: goToLogin }}
      />
    </div>
  );
};

export default Registration;
