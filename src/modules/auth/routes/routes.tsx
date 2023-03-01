import routePaths from '../../../constants/routePaths';
import SignIn from '../pages/SignIn';
import React from 'react';
import { RouteType } from '../../common/interfaces/moduleInterfaces';
import Registration from "../pages/Registration";

export const routes = [
  { path: routePaths.signIn, component: <SignIn />, type: RouteType.NotAuth },
  { path: routePaths.register, component: <Registration />, type: RouteType.NotAuth }
];
