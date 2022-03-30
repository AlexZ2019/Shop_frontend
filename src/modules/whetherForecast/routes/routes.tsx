import routePaths from "../../../constants/routePaths";
import React from "react";
import WhetherForecast from "../pages/WhetherForecast";

export const routes = [
    {path: routePaths.main, component: <WhetherForecast/>},
];
