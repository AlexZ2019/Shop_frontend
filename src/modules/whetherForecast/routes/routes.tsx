import routePaths from '../../../constants/routePaths';
import React from 'react';
import WhetherForecast from '../pages/WhetherForecast';
import { RouteType } from '../../../interfaces/moduleInterfaces';

export const routes = [{ path: routePaths.main, component: <WhetherForecast />, type: RouteType.Auth }];
