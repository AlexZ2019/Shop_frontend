import {Layout, Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {useLogout} from "../../modules/Auth/hooks/logout";
import s from "./index.module.css"

const TopBar = () => {

    const logout = useLogout()

    return <Layout>
        <Header className="header">
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal" className={s.menuWrapper} >
                <Menu.Item key="1">Whether forecast</Menu.Item>
                <Menu.Item key="2" onClick={logout}>Logout</Menu.Item>
            </Menu>
        </Header>
    </Layout>
}

export default TopBar
