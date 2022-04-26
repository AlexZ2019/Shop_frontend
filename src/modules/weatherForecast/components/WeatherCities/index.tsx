import { FC } from 'react';
import WeatherCard from '../WeatherCard';
import { CityId } from '../../types';

type Props = {
  data: [CityId]
}

const WeatherCities: FC<Props> = ({ data }) => {

  return <div>
    {data.map((cityId: CityId, index) => {
      return <WeatherCard cityId={cityId.cityId} key={index} />;
    })}
  </div>;
};

export default WeatherCities;
