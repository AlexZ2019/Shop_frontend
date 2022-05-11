import { FC } from 'react';
import WeatherCard from '../Card';

type Props = {
  data: [{cityId: string}];
};

const WeatherCities: FC<Props> = ({ data }) => {
  return (
    <div>
      {data.map((city: {cityId: string}, index) => {
        return <WeatherCard cityId={city.cityId} key={index} />;
      })}
    </div>
  );
};

export default WeatherCities;
