import gql from 'graphql-tag';

export const USER_CITIES_ID_QUERY = gql`
  query getUserCitiesId($userId: Float!) {
    getUserCitiesId(userId: $userId) {
      cityId
    }
  }
`;
