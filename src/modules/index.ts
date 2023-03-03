import { mergeArrays } from '../utils/reduceArrays';
import auth from './auth';
import { IModule } from './common/interfaces/moduleInterfaces';
import item from "./item";

const routes = mergeArrays(auth.routes, item.routes);
const module: IModule = { routes };
export default module;
