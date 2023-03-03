import routePaths from '../../../constants/routePaths';
import React from 'react';
import { RouteType } from '../../common/interfaces/moduleInterfaces';
import Items from "../pages/Items";
import Item from "../pages/Item";


export const routes = [
  { path: routePaths.main, component: <Items />, type: RouteType.Auth },
  { path: routePaths.item, component: <Item />, type: RouteType.Auth }
];
