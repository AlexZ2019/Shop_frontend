import routePaths from './routePaths';
import config from '../config';
import staticInfo from './staticInfo';

export default {
  ...routePaths,
  ...config,
  ...staticInfo
};
