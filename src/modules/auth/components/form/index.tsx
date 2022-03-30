import { Button, Input } from 'antd';
import { Controller } from 'react-hook-form';
import s from './index.module.css';
import { FC } from 'react';
import { FormProps } from '../../types/types';

const CustomForm: FC<FormProps> = ({ onSubmit, handleSubmit, control, errors }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => <Input placeholder="email" {...field} className={s.input} />}
      />
      {errors.email && <span>This field is required</span>}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input placeholder="password" type={'password'} {...field} className={s.input} />
        )}
      />
      {errors.password && <span>This field is required</span>}
      <Button type="primary" htmlType="submit">
        Sign in
      </Button>
    </form>
  );
};

export default CustomForm;
