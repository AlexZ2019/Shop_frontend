import {setLocalStorageValue} from "../../helpers/localStorage";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {useNavigate} from "react-router-dom";
import {MAIN} from "../../helpers/consts";

export const loginMutationGQL = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
            refreshToken
        }
    }
`;

export const useLoginMutation = () => {

    const navigate = useNavigate();

    const [mutation] = useMutation(loginMutationGQL, {
        onCompleted: (data: { login: { accessToken: string, refreshToken: string }}) => {
            setLocalStorageValue("accessToken", data.login.accessToken);
            setLocalStorageValue("refreshToken", data.login.refreshToken);
            navigate(MAIN);
        },
    });

    const login = (email: string, password: string) => {
        return mutation({
            variables: {
                email,
                password
            },
        });
    }
    return [login]
};

