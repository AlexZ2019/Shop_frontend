import { FC } from 'react';
import Spiner from '../Spinner';

type Props<D> = {
  Component: FC<D>;
  loading: boolean;
  componentProps: D;
  emptyDivClasses: any | null;
};

const ComponentWrapper: FC<Props<any>> = ({ Component, loading, componentProps, emptyDivClasses = null }) => {
  if (componentProps && !loading) {
    return <Component {...componentProps} />;
  }
  if (loading) {
    return <Spiner spinnerType='simple' customStyles='' />;
  }
  return <div className={emptyDivClasses} />;
};

export default ComponentWrapper;
