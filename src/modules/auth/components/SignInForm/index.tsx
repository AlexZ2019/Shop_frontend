import { Button, Input } from 'antd';
import { Control, Controller, FieldError, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import styles from './index.module.css'; // TODO: rename to styles
import { FC } from 'react';
import { Inputs } from '../../types';
// TODO: to validate form use yap (if email, min max symbols, password validate (min, max symbols))
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
      <Controller
        name="email"
        control={control}
        render={({ field }) => <Input placeholder="email" {...field} className={styles.input} />}
      />
      {errors.email && <span>This field is required</span>}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input placeholder="password" type={'password'} {...field} className={styles.input} />
        )}
      />
      {errors.password && <span>This field is required</span>}
      <Button type="primary" htmlType="submit" loading={loading}>
        Sign in
      </Button>
    </form>
  );
};

export default SignInForm;
