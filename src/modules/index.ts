import * as auth from "./auth";
import * as common from "./common";
import * as whetherForecast from "./whetherForecast"
import {mergeArrays} from "../utils/reduceArrays";

let routes = mergeArrays(auth.routes, whetherForecast.routes)
console.log("routes", routes)
export {auth, common, whetherForecast, routes}




