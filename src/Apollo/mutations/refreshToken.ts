import {setLocalStorageValue} from "../../helpers/localStorage";
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
    const [refreshToken, {loading}] = useMutation(refreshTokenMutationGQL, {
        onCompleted: (data: { login: { accessToken: string, refreshToken: string }}) => {
            setLocalStorageValue("accessToken", data.login.accessToken);
            setLocalStorageValue("refreshToken", data.login.refreshToken);
        },
        onError: () => navigate(SIGN_IN)
    });


    return [refreshToken, loading]
};

