import gql from 'graphql-tag';

export const LOGOUT_MUTATION = gql`
  mutation Logout($userId: Float!) {
    logout(userId: $userId)
  }
`;
