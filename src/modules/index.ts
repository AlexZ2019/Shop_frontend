import { mergeArrays } from '../utils/reduceArrays';
import auth from './auth';
import whetherForecast from './weather';
import { IModule } from './common/interfaces/moduleInterfaces';

const routes = mergeArrays(auth.routes, whetherForecast.routes );

const module: IModule = { routes };
export default module;
