import {useUserQuery} from "../Apollo/queries/getUser";
import {useRefreshTokenMutation} from "../Apollo/mutations/refreshToken";

export const AuthProvider = ({children}: any) => {

    const [refreshToken] = useRefreshTokenMutation();
    useUserQuery({onError: () => refreshToken()});

    return <>{children}</>
}
