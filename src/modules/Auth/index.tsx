import {LoadingOutlined} from '@ant-design/icons'
import {Spin} from "antd";
import {refreshTokenMutationGQL} from "./graphql/mutations/refreshToken";
import {useQuery} from "@apollo/client";
import {userQueryGQL} from "./graphql/queries/getUser";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {setLocalStorageValue} from "../../helpers/localStorage";
import {SIGN_IN} from "../../helpers/consts";

const AuthProvider = ({children}: any) => {
    const navigate = useNavigate();
    const [refreshToken] = useMutation(refreshTokenMutationGQL, {
        onCompleted: (data: { login: { accessToken: string, refreshToken: string }}) => {
            setLocalStorageValue("accessToken", data.login.accessToken);
            setLocalStorageValue("refreshToken", data.login.refreshToken);
        },
        onError: () => navigate(SIGN_IN)
    });
    const {data, loading, error} = useQuery(userQueryGQL, {
       onError: () => refreshToken()
    });

    if (loading) {
        return (
            <div style={{margin: "auto", padding: "45vh"}}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />} />
            </div>)
    }

    return <>{children}</>
}

export default AuthProvider
