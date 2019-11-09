import * as React from 'react';
import {Route} from 'react-router';
import {lazy} from 'react';
import ReduxStoreManager from '../../../utilities/reduxStoreManagerFactory';

const PropertiesRoutes = lazy(() => import('./routes'));

export const clientMessagesRouterCreator = (domainPath: string, reduxStoreManager: ReduxStoreManager, options?: any) =>
    <Route path={domainPath} render={() =>
        <PropertiesRoutes domainPath={domainPath}
                     reduxStoreManager={reduxStoreManager}
                     options={options}/>}/>;
