import gql from "graphql-tag";

export const refreshTokenMutationGQL = gql`
    mutation RefreshToken {
        refreshToken {
            accessToken
            refreshToken
        }
    }
`;
