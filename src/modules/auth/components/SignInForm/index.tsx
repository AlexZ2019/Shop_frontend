import { Button, Input } from 'antd';
import { Control, Controller, FieldError, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import styles from './index.module.css';
import { FC } from 'react';
import { Inputs } from '../../types';

type FormProps = {
  onSubmit: SubmitHandler<Inputs>
  handleSubmit: UseFormHandleSubmit<Inputs>
  control: Control<Inputs>
  errors: { email?: FieldError | undefined; password?: FieldError | undefined }
  loading: boolean
};

const SignInForm: FC<FormProps> = ({ onSubmit, handleSubmit, control, errors, loading }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>Weather Forecast</h1>
      <h3>Sign In</h3>
      <div className={styles.input}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input placeholder="email" {...field} />}
        />
        {errors.email && <span>This field is required</span>}
      </div>
      <div className={styles.input}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input placeholder="password" type={'password'} {...field} />
          )}
        />
        {errors.password && <span>This field is required</span>}
      </div>
      <Button type="primary" htmlType="submit" loading={loading}>
        Sign in
      </Button>
    </form>
  );
};

export default SignInForm;
