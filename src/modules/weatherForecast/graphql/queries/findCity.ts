import gql from 'graphql-tag';

export const FIND_CITY_QUERY = gql`
   query findCity($city: String!){
     findCity(city: $city) {
     name
     country
     state
     lat
     lon
   }
 }
`;
