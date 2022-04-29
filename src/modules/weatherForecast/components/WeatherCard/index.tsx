import { Card } from 'antd';
import { FC } from 'react';
import { CityId } from '../../types';
import { WEATHER_FORECAST_QUERY } from '../../graphql/queries/getWeatherForecast';
import { useQuery } from '@apollo/client';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_CITY_MUTATION } from '../../../city/graphql/mutations/deleteCity';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import { client } from '../../../../providers/apollo/config';

type Day = {
  clouds: number
  humidity: number
  temp: {
    tempDay: number
    tempNight: number
  }
  windSpeed: number
}

const WeatherCard: FC<CityId> = ({ cityId }) => {
  const user = client.readQuery({
    query: USER_QUERY
  });

  const { data, loading } = useQuery(WEATHER_FORECAST_QUERY, {
    variables: { cityId }
  });

  const [deleteCity] = useMutation(DELETE_CITY_MUTATION);
  const deleteCityHandle = async (cityId: string) => {
    await deleteCity({
      variables: { userId: +user.getUser.userId, cityId: +cityId }, update(cache) {
        cache.modify({
          fields: {
            getUserCitiesId(existingCityIdRefs) {
              return existingCityIdRefs.filter((id: CityId) => id.cityId !== cityId)
            }
          }
        });
      }
    });
  };

  return <Card loading={loading}>
    {data && data.getCityWeatherForecast
      ? <>
        <h4>City: {data.getCityWeatherForecast.name}</h4>
        <h5>State: {data.getCityWeatherForecast.state}</h5>
        <h5>Country: {data.getCityWeatherForecast.country}</h5>
        {data.getCityWeatherForecast.weatherForecast.map((day: Day, index: number) => {
          if (index > 0 && index < 4) {
            return <div>
              <div>
                Temperature: day: {day.temp.tempDay} / night: {day.temp.tempNight}
              </div>
              <div>Wind speed: {day.windSpeed} m/s</div>
            </div>;
          }
        })}
        <DeleteOutlined onClick={() => deleteCityHandle(cityId)} />
      </>
      : 'Plase, add a city to see weather forecast'}
  </Card>;
};

export default WeatherCard;
