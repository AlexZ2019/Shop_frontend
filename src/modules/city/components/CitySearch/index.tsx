import { FC, useRef, useState } from 'react';
import { City } from '../../../weather/types';
import { Alert, AutoComplete, Button, Input, notification, Tag } from 'antd';
import styles from './index.module.css';
import mainStyles from '../../../common/styles/index.module.css';
import { ADD_CITY_MUTATION } from '../../graphql/mutations/addCity';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CITIES_IDS_QUERY } from '../../graphql/queries/getCitiesIds';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import _ from 'lodash';
import constants from '../../../../constants';
import Spiner from '../../../common/components/Spinner';

type Props = {
  data: [City];
  onSubmit: SubmitHandler<{ search: string }>;
  searchLoading: boolean
  searchError: ApolloError | undefined
};

const CitySearch: FC<Props> = ({ data, onSubmit, searchLoading, searchError }) => {
  const [searchFocus, setSearchFocus] = useState(false);
  const handleSearchFocus = (isFocus: boolean) => {
    setSearchFocus(isFocus);
  }
  const onSubmitDebounced = useRef(_.debounce(onSubmit, constants.debounceTime));
  const [addCity, { loading }] = useMutation(ADD_CITY_MUTATION);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      selectedValue: ''
    }
  });

  const { fetchMore } = useQuery(CITIES_IDS_QUERY);

  const handleSearch = async (formValues: { selectedValue: string }) => {
    if (formValues.selectedValue) {
      onSubmitDebounced.current({ search: formValues.selectedValue })
    }
  };

  const handleAddCity = async (city: City) => {
    await addCity({
      variables: {
        ...city,
      }
    });
    await fetchMore({});
    notification.success({
      message: 'The city has been added!',
    });
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
          {
            city.isAdded
              ? <Tag className={styles.tag} color="green">Added</Tag>
              : <Button size='middle' onClick={() => handleAddCity(city)} disabled={loading}>
                Add
              </Button>
          }
        </div>
      </div>
    )
  });

  const options = [
    {
      label: searchLoading
        ? <Spiner spinnerType='simple' customStyles={styles.spinner}/>
        : data?.length
          ? 'results'
          : <Alert message="Nothing was found" type="error" />,
      options: data?.length ?
          data.map((city) => {
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
              dropdownMatchSelectWidth
              className={styles.select}
              options={options}
              onFocus={() => handleSearchFocus(true)}
              onBlur={() => handleSearchFocus(false)}
              open={(searchLoading || Boolean(data) || Boolean(searchError)) && searchFocus}
            >
              <Input size="large" placeholder="search city" onChange={handleSubmit(handleSearch)} />
            </AutoComplete>
          )}
        />
      </form>
    </div>
  );
};
export default CitySearch;
