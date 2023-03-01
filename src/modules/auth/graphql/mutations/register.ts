import gql from 'graphql-tag';

export const REGISTER_MUTATION = gql`
  mutation CreateUSer($email: String!, $password: String!, $sex: String) {
    createUser(email: $email, password: $password, sex: $sex)
  }
`;
