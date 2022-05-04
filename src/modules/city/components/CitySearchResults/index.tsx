import { FC } from 'react';
import { City } from '../../../weatherForecast/types';
import { AutoComplete, Button, Input } from 'antd';
import styles from './index.module.css';
import mainStyles from '../../../index.module.css';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CITY_MUTATION } from '../../graphql/mutations/addCity';
import { client } from '../../../../providers/apollo/config';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { USER_CITIES_ID_QUERY } from '../../graphql/queries/getUserCitiesId';
import { useQuery } from '@apollo/client';
import _ from 'lodash';
import constants from '../../../../constants';

type Props = {
  data: [City];
  onSubmit: SubmitHandler<{ search: string }>;
};

const CitySearchResults: FC<Props> = ({ data, onSubmit }) => {
  const user = client.readQuery({
    query: USER_QUERY
  });
  const [addCity, { loading }] = useMutation(ADD_CITY_MUTATION);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      selectedValue: ''
    }
  });

  const { fetchMore } = useQuery(USER_CITIES_ID_QUERY);

  const handleSearch = async (formValues: { selectedValue: string }) => {
    if (formValues.selectedValue) {
      _.throttle(onSubmit({ search: formValues.selectedValue }), constants.throttlingTime);
    }
  };

  const handleAddCity = async (city: City) => {
    await addCity({
      variables: {
        ...city,
        userId: +user.getUser.id
      }
    });
    await fetchMore({ variables: { userId: +user.getUser.id } });
  };

  const renderItem = (city: City) => ({
    label: (
      <div className={mainStyles.flexSpaceBetween}>
        <div>
          <span className={styles.cityInfo}>{city.name}</span>
          <span className={styles.cityInfo}>{city.state}</span>
          <span>{city.country}</span>
        </div>
        <div>
          <Button onClick={() => handleAddCity(city)} disabled={loading}>
            Add
          </Button>
        </div>
      </div>
    )
  });

  const options = [
    {
      label: 'results',
      options: data
        ? data.map((city) => {
            return renderItem(city);
          })
        : []
    }
  ];

  return (
    <div className={styles.container}>
      <form>
        <Controller
          name="selectedValue"
          control={control}
          render={({ field }) => (
            <AutoComplete
              {...field}
              dropdownClassName="certain-category-search-dropdown"
              dropdownMatchSelectWidth={500}
              className={styles.select}
              options={options}
            >
              <Input size="large" placeholder="search city" onChange={handleSubmit(handleSearch)} />
            </AutoComplete>
          )}
        />
      </form>
    </div>
  );
};
export default CitySearchResults;
