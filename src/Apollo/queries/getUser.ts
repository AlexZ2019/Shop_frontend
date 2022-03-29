import gql from "graphql-tag";
import {useQuery} from "@apollo/client";
import {useRefreshTokenMutation} from "../mutations/refreshToken";

const userQueryGQL = gql`
    query getUser{
        getUser {
            userId
            email
        }
    }
`;

export const useUserQuery = (options: any = {}) => useQuery(userQueryGQL, {
    ...options
});

