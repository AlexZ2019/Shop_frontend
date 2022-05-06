import { FC } from 'react';
import WeatherCard from '../Card';

type Props = {
  data: [{cityId: string}];
};

const WeatherCities: FC<Props> = ({ data }) => {
  return (
    <div>
      {data.map((cityId: {cityId: string}, index) => {
        return <WeatherCard cityId={cityId.cityId} key={index} />;
      })}
    </div>
  );
};

export default WeatherCities;
