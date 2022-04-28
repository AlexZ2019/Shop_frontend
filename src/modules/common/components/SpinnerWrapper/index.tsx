import { FC } from 'react';
import MainSpiner from '../mainSpiner';

type Props<D> = {
  Component: FC<D>
  loading: boolean
  data: D
  emptyDivClasses: any | null
}

const SpinnerWrapper: FC<Props<any>> = ({ Component, loading, data, emptyDivClasses = null }) => {
  if (data && !loading) {
    return <Component data={data}/>;
  }
  if (loading) {
    return <MainSpiner />;
  }
  return <div className={emptyDivClasses} />;
};

export default SpinnerWrapper;
