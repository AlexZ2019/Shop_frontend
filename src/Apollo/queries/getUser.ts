import gql from "graphql-tag";
import {useQuery} from "@apollo/client";

const userQueryGQL = gql`
    query getUser {
        getUser {
            userId
            email
        }
    }
`;

export const useUserQuery = (options: any = {}) => useQuery(userQueryGQL, {
    ...options
});

