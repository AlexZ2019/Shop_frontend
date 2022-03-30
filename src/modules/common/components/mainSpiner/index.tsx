import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import s from './index.module.css';

const MainSpiner = () => {
  return (
    <div className={s.loaderWrapper}>
      <Spin indicator={<LoadingOutlined className={s.spinner} spin />} />
    </div>
  );
};

export default MainSpiner;
