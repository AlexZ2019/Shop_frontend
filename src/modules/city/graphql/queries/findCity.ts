import gql from 'graphql-tag';

export const FIND_CITY_QUERY = gql`
  query findCity($city: String!, $userId: Float!) {
    findCity(city: $city, userId: $userId) {
      name
      country
      state
      lat
      lon
      isAdded
    }
  }
`;
