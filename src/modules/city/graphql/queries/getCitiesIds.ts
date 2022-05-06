import gql from 'graphql-tag';

export const CITIES_IDS_QUERY = gql`
  query getCitiesIds($userId: Float!) { 
    getCitiesIds(userId: $userId) {
      cityId
    }
  }
`;

