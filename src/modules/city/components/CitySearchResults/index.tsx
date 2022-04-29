import { FC } from 'react';
import { City } from '../../../weatherForecast/types';
import { AutoComplete, Button, Input, Select } from 'antd';
import styles from './index.module.css';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CITY_MUTATION } from '../../graphql/mutations/addCity';
import { client } from '../../../../providers/apollo/config';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  data: [City]
}


const CitySearchResults: FC<Props> = ({ data }) => {
    const user = client.readQuery({
      query: USER_QUERY
    });
    const [addCity, { loading }] = useMutation(ADD_CITY_MUTATION);

    const {
      handleSubmit,
      control
    } = useForm({
      defaultValues: {
        selectedValue: ''
      }
    });

    const handleSelector = async (formValues: { selectedValue: string }) => {

      if (formValues.selectedValue) {
        const valueName = formValues.selectedValue.split(', ');
        await addCity({
          variables: {
            ...data.filter((city) => {
                if (city.name === valueName[0] && city.state === valueName[1]) {
                  return city;
                }
              }
            )[0], userId: +user.getUser.userId
          }
        });
      }

    };

    const renderItem = (city: City, key: number) => ({
      value: city.name + ', ' + city.state,
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
        <span>
          {city.name}
      </span>
          <span>
          {city.state}
      </span>
          <span>
          {city.country}
      </span>
        </div>
      )
    });

    const options = [
      {
        label: 'results',
        options: data.map((city, index) => {
          return renderItem(city, index);
        })
      }
    ];

    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit(handleSelector)}>
          <Controller
            name='selectedValue'
            control={control}
            render={({ field }) => <AutoComplete
              {...field}
              dropdownClassName='certain-category-search-dropdown'
              dropdownMatchSelectWidth={500}
              className={styles.select}
              options={options}
            >
              <Input size='large' placeholder='select city' />
            </AutoComplete>}
          />
          <Button size="large" htmlType='submit' loading={loading} className={styles.selectButton}>Add</Button>
        </form>
      </div>
    );
  }
;

export default CitySearchResults;
