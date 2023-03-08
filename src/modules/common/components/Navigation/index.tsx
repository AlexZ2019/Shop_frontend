import { Button, Row } from "antd";
import styles from "./index.module.css"

const Navigation = ({ logout }: { logout: () => void }) => {

  return <Row justify='space-between' className={styles.navigation}>
    <h3>ShopName</h3>
    <Button type="text" onClick={logout}>Logout</Button>
  </Row>
}

export default Navigation
