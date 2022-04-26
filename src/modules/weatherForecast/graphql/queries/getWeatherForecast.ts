import gql from 'graphql-tag';

export const WEATHER_FORECAST_QUERY = gql`
  query getWeatherForecast($cityId: Float!) {
  getCityWeatherForecast(cityId: $cityId){
    name
    state
    country
    weatherForecast{
    humidity
    windSpeed
    clouds
    temp {
      tempDay
      tempNight
    }
    }
  }
}
`;


