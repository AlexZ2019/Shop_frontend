import { Button, Input } from 'antd';
import { Control, Controller, FieldError, FieldValues, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import styles from './index.module.css';
import { FC, ReactNode } from 'react';

type FormProps = {
  title: string;
  submitButtonText: string;
  redirectButtonText: string;
  redirect: () => void;
  extraFields?: { name: string, component: any }[];
}

type UserFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  control: Control;
  errors: { email?: FieldError | undefined; password?: FieldError | undefined };
  loading: boolean;
  formProps: FormProps;
};

const UserForm: FC<UserFormProps> = ({ onSubmit, handleSubmit, control, errors, loading, formProps }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h3>{ formProps.title }</h3>
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
      { formProps.extraFields &&
        formProps.extraFields.map((extraField, index) => {
        return (
          <div className={styles.input}>
            <Controller key={index} name={extraField.name} control={control} render={extraField.component}/>
        </div>
        );
      })}
      <Button type="link" onClick={formProps.redirect} htmlType="submit" disabled={loading} className={styles.formButton}>
        { formProps.redirectButtonText }
      </Button>
      <Button type="primary" htmlType="submit" loading={loading} disabled={loading} className={styles.formButton}>
        { formProps.submitButtonText }
      </Button>
    </form>
  );
};

export default UserForm;
