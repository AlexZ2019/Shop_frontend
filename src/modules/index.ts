import { mergeArrays } from '../utils/reduceArrays';
import auth from './auth';
import { IModule } from './common/interfaces/moduleInterfaces';
import home from "./home";

const routes = mergeArrays(auth.routes, home.routes);
const module: IModule = { routes };
export default module;
