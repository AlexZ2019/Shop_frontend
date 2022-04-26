import routePaths from '../../../constants/routePaths';
import React from 'react';
import WeatherForecast from '../pages/WeatherForecast';
import { RouteType } from '../../common/interfaces/moduleInterfaces';

export const routes = [{ path: routePaths.main, component: <WeatherForecast />, type: RouteType.Auth }];
