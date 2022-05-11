import gql from 'graphql-tag';

export const ADD_CITY_MUTATION = gql`
  mutation addCity(
    $name: String!
    $lat: String!
    $lon: String!
    $state: String!
    $country: String!
  ) {
    addCity(name: $name, lat: $lat, lon: $lon, state: $state, country: $country)
  }
`;
