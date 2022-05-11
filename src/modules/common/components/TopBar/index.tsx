import { Layout, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import s from './index.module.css';
import { useLogout } from '../../../auth/hooks/logout';
import { client } from '../../../../providers/apollo/config';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';

const TopBar = () => {
  const user = client.readQuery({
    query: USER_QUERY
  });
  const logout = useLogout();


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" className={s.menuWrapper}>
          <Menu.Item key="1">Whether forecast</Menu.Item>
          <Menu.Item key="2" onClick={() => logout(user.getCurrentUser.id)}>
            Logout
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default TopBar;
