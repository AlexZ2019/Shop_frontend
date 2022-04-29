import gql from 'graphql-tag';

export const DELETE_CITY_MUTATION = gql`
  mutation deleteCity($userId: Float!, $cityId: Float!) {
  deleteCity(userId: $userId,cityId: $cityId){
    success
  }
}
`;
