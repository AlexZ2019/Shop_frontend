import gql from 'graphql-tag';

export const CITIES_IDS_QUERY = gql`
  query getCitiesIds { 
    getCitiesIds {
      cityId
    }
  }
`;

