import { FC } from 'react';
import s from './index.module.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Search from 'antd/es/input/Search';

type Props = {
  onSubmit: SubmitHandler<{ search: string }>;
  loading: boolean;
  placeholder: string;
};

const SearchData: FC<Props> = ({ onSubmit, loading, placeholder }) => {
  const {
    handleSubmit,
    control
  } = useForm({
    defaultValues: {
      search: ''
    }
  });

  return (
    <div className={s.citySearch}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <Search
              placeholder={placeholder}
              {...field}
              loading={loading}
              enterButton
              onSearch={(search) => onSubmit({ search })}
            />
          )}
        />
      </form>
    </div>
  );
};

export default SearchData;
