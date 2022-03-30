import {Layout, Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {useLogout} from "../../modules/Auth/hooks/logout";

export const TopBar = () => {

    const logout = useLogout()

    return <Layout>
        <Header className="header">
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal" style={{display: "flex", justifyContent: "space-between"}} >
                <Menu.Item key="1">Whether forecast</Menu.Item>
                <Menu.Item key="2" onClick={logout}>Logout</Menu.Item>
            </Menu>
        </Header>
    </Layout>
}
