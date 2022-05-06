import { Button, Input } from 'antd';
import { Control, Controller, FieldError, FieldValues, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import styles from './index.module.css';
import { FC } from 'react';

type FormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  control: Control;
  errors: { email?: FieldError | undefined; password?: FieldError | undefined };
  loading: boolean;
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
        <div className={styles.errorMessage}>{errors.email ? errors.email.message : ''}</div>
      </div>
      <div className={styles.input}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input placeholder="password" type="password" {...field} />}
        />
        <div className={styles.errorMessage}>{errors.password ? errors.password.message : ''}</div>
      </div>
      <Button type="primary" htmlType="submit" loading={loading} disabled={loading} className={styles.formButton}>
        Sign in
      </Button>
    </form>
  );
};

export default SignInForm;
