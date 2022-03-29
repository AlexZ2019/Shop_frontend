import {storeData} from "../../helpers/localStorage";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {useNavigate} from "react-router-dom";
import {MAIN, SIGN_IN} from "../../helpers/consts";

export const refreshTokenMutationGQL = gql`
    mutation RefreshToken {
        refreshToken {
            accessToken
            refreshToken
        }
    }
`;

export const useRefreshTokenMutation = () => {


    const navigate = useNavigate();
    const [refreshToken] = useMutation(refreshTokenMutationGQL, {
        onCompleted: (data: { login: { accessToken: string, refreshToken: string }}) => {
            storeData("accessToken", data.login.accessToken);
            storeData("refreshToken", data.login.refreshToken);
        },
        onError: () => navigate(SIGN_IN)
    });


    return [refreshToken]
};

