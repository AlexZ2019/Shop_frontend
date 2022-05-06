import routePaths from '../../../constants/routePaths';
import React from 'react';
import { RouteType } from '../../common/interfaces/moduleInterfaces';
import Weather from '../pages/Weather';

export const routes = [
  { path: routePaths.main, component: <Weather />, type: RouteType.Auth }
];
