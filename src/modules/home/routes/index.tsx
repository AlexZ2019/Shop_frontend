import routePaths from '../../../constants/routePaths';
import React from 'react';
import { RouteType } from '../../common/interfaces/moduleInterfaces';
import Home from '../pages/Home';

export const routes = [
  { path: routePaths.main, component: <Home />, type: RouteType.Auth }
];
