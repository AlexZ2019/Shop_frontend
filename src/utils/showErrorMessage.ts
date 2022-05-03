import { notification } from 'antd';

export const openNotificationWithIcon = (errorTitle: string, errorDescription: string = '') => {
  notification['error']({
    message: errorTitle,
    description: errorDescription
  });
};
