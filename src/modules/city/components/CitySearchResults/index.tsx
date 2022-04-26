import { FC } from 'react';
import { City } from '../../../weatherForecast/types';
import { List } from 'antd';
import CityResult from '../CityResult';
import s from './index.module.css';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CITY_MUTATION } from '../../graphql/mutation/addCity';
import { client } from '../../../../providers/apollo/config';
import { USER_QUERY } from '../../../auth/graphql/queries/getUser';

type Props = {
  data: [City]
}

const CitySearchResults: FC<Props> = ({ data }) => {
  const user = client.readQuery({
    query: USER_QUERY
  });
  const [addCity, { loading }] = useMutation(ADD_CITY_MUTATION);
  const addCityHandler = async (city: City) => {
    await addCity({ variables: { ...city, userId: +user.getUser.userId } });
  };

  return (
    <div className={s.container}>

      <List>
        {data.map((city, index) => {
          return <CityResult key={index} name={city.name} country={city.country} lat={city.lat} lon={city.lon}
                             state={city.state} addCityHandler={addCityHandler} loading={loading} />;
        })}
      </List>
    </div>
  );
};

export default CitySearchResults;
