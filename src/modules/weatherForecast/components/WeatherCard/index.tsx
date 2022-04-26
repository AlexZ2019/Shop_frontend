import { Card } from 'antd';
import { FC } from 'react';
import { CityId } from '../../types';
import { WEATHER_FORECAST_QUERY } from '../../graphql/queries/getWeatherForecast';
import { useQuery } from '@apollo/client';

type Day = {
  clouds: number
  humidity: number
  temp: {
    tempDay: number
    tempNight: number
  }
  windSpeed: number
}

const WeatherCard: FC<CityId> = ({cityId}) => {

  const {data, loading} = useQuery(WEATHER_FORECAST_QUERY, {
    variables: {cityId}
  })

  return <Card  loading={loading}>
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
            </div>
          }
        })}
      </>
    : "Plase, add a city to see weather forecast"}

  </Card>
}

export default WeatherCard
