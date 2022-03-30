import {FC} from "react";
import {OnCompleteData, Props} from "../types/types";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {REFRESH_TOKEN_MUTATION} from "../graphql/mutations/refreshToken";
import {setLocalStorageValue} from "../../../utils/localStorage";
import {useQuery} from "@apollo/client";
import {USER_QUERY} from "../graphql/queries/getUser";
import { MainSpiner } from "../../common/";
import routePaths from "../../../constants";

const UserProvider: FC<Props> = ({children}) => {
    const navigate = useNavigate();
    const [refreshToken] = useMutation(REFRESH_TOKEN_MUTATION, {
        onCompleted: (data: OnCompleteData) => {
            setLocalStorageValue("accessToken", data.login.accessToken);
            setLocalStorageValue("refreshToken", data.login.refreshToken);
        },
        onError: () => navigate(routePaths.signIn)
    });
    const {data, loading, error} = useQuery(USER_QUERY, {
        onError: () => refreshToken()
    });

    if (loading) {
        return (
            <MainSpiner/>
        )
    }

    return <>{children}</>
}

export default UserProvider
