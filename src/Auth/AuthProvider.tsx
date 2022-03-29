import {useUserQuery} from "../Apollo/queries/getUser";
import {useRefreshTokenMutation} from "../Apollo/mutations/refreshToken";
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from "antd";

export const AuthProvider = ({children}: any) => {

    const [refreshToken, refreshLoading] = useRefreshTokenMutation();
    // @ts-ignore
    const {data, loading, error} = useUserQuery({onError: () => refreshToken()});

    if (loading || error && refreshLoading) {
        return <div style={{margin: "auto", padding: "45vh"}}><Spin indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />} /></div>
    }

    return <>{children}</>
}
