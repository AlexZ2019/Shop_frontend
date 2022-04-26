import { FC } from 'react';
import MainSpiner from '../mainSpiner';

type Props<D> = {
  Component: FC<D>
  loading: boolean
  data: D
}

const SpinnerWrapper: FC<Props<any>> = ({ Component, loading, data }) => {
  if (data && !loading) {
    return <Component data={data}/>;
  }
  if (loading) {
    return <MainSpiner />;
  }
  return null;
};

export default SpinnerWrapper;
