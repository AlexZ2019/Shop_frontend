import gql from 'graphql-tag';

export const DELETE_CITY_MUTATION = gql`
  mutation deleteCity($cityId: Float!) {
    deleteCity(cityId: $cityId)
  }
`;
