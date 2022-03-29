import gql from "graphql-tag";

export const loginMutationGQL = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
            refreshToken
        }
    }
`;

