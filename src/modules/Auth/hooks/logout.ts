import {useApolloClient} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import {removeLocalStorageValue} from "../../../helpers/localStorage";
import {SIGN_IN} from "../../../helpers/consts";


export const useLogout = () => {

    const apolloClient = useApolloClient();
    const navigate = useNavigate()

    return async () => {
        await apolloClient.clearStore();
        removeLocalStorageValue("accessToken");
        removeLocalStorageValue("refreshToken");
        navigate(SIGN_IN);
    };
};
