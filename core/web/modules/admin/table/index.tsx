import * as React from 'react';
import {Route} from 'react-router';
import {lazy} from 'react';
import ReduxStoreManager from '../../../utilities/reduxStoreManagerFactory';

const TableRoutes = lazy(() => import('./routes'));

export const tableRouterCreator = (domainPath: string, reduxStoreManager: ReduxStoreManager, options?: any) =>
    <Route path={domainPath} render={() =>
        <TableRoutes domainPath={domainPath}
                     reduxStoreManager={reduxStoreManager}
                     options={options}/>}/>;
