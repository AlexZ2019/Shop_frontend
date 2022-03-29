import {useUserQuery} from "../Apollo/queries/getUser";
import {useRefreshTokenMutation} from "../Apollo/mutations/refreshToken";

export const AuthProvider = ({children}: any) => {

    const [refreshToken] = useRefreshTokenMutation();
    const {data, loading, error} = useUserQuery({onError: () => refreshToken()});

    return <>{children}</>
}
