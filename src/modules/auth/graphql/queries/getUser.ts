import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query getUser {
    getUser {
      userId
      email
    }
  }
`;

// TODO: add user module and move all the files for a user
