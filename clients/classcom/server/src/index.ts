import {App} from '../../../../core/server/app';
import * as devConfig from '../config/default.json';
import * as prodConfig from '../config/prod.json';

import tableModuleRouterFactory from '../../../../core/server/modules/table';
import propertiesModuleRouterFactory from '../../../../core/server/modules/properties';
import userModuleRouterFactory from '../../../../core/server/modules/user';
import cloudinaryModuleRouterFactory from '../../../../core/server/modules/cloudinary'
import clientMessagesModuleRouterFactory from '../../../../core/server/modules/clientMessages'


const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

// for server side rendering from client side
import routes from '../../web/src/routes';
import reducers from '../../web/src/reducers';
import {localManager} from '../../web/src/clientManagers/localeManager'

new App(routes, reducers, localManager)
    .addModuleRouter('/api/tables', tableModuleRouterFactory())
    .addModuleRouter('/api/properties', propertiesModuleRouterFactory())
    .addModuleRouter('/api/users', userModuleRouterFactory())
    .addModuleRouter('/api/cloudinary', cloudinaryModuleRouterFactory(config.cloudinary))
    .addModuleRouter('/api/clientMessages', clientMessagesModuleRouterFactory())
    .runServer(config);
