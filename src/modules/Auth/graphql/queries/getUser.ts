import gql from "graphql-tag";

export const userQueryGQL = gql`
    query getUser {
        getUser {
            userId
            email
        }
    }
`;


