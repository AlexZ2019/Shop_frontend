import gql from 'graphql-tag';

export const LOGIN_WITH_GOOGLE_MUTATION = gql`
  mutation loginWithGoogle($token: String!) {
      loginWithGoogle(token: $token) {
      accessToken
      refreshToken
    }
  }
`;
