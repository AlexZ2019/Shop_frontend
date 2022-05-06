import gql from 'graphql-tag';

export const WEATHER_QUERY = gql`
  query getWeather($cityId: Float!) {
    getWeather(cityId: $cityId) {
      name
      state
      country
      weatherForecast {
        humidity
        windSpeed
        weather {
          main
          description
        }
        temp {
          tempDay
          tempNight
        }
      }
    }
  }
`;
