import { FC } from 'react';
import s from './index.module.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from 'antd';

type Props = {
  onSubmit: SubmitHandler<{search: string}>
  loading: boolean
  placeholder: string
}

const Search: FC<Props> = ({onSubmit, loading, placeholder}) => {
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues: {
      search: ''
    }
  });

  return <div className={s.citySearch}>
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Controller
        name='search'
        control={control}
        render={({ field }) => (
          <Input placeholder={placeholder} size='large' {...field} />
        )}
      />
      <Button type="primary" htmlType="submit" loading={loading}>
        Search
      </Button>
    </form>
  </div>;
};

export default Search;
