import routePaths from '../../../constants/routePaths';
import React from 'react';
import { RouteType } from '../../common/interfaces/moduleInterfaces';
import Items from "../pages/Items";


export const routes = [
  { path: routePaths.main, component: <Items />, type: RouteType.Auth }
];
