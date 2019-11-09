import * as React from 'react';
import {Route, Switch} from 'react-router';
import AsyncComponent from './async-component';
import ReduxStoreManager from '../../../utilities/reduxStoreManagerFactory';
import {Locale} from '../../../common/types/locale';

export interface TableModuleOptions {
    locales: Locale[],
    defaultLocale: Locale
}

export default ({domainPath, reduxStoreManager, options}: { domainPath: string, reduxStoreManager: ReduxStoreManager, options?: TableModuleOptions }) => {
    return (
        <Switch>
            <Route path={`${domainPath}/:tableName/rows/:locale/:rowId`}
                   render={() => <AsyncComponent componentName="Row"
                                                 domainPath={domainPath}
                                                 reduxStoreManager={reduxStoreManager}
                                                 options={options}/>}/>,
            <Route path={`${domainPath}/:tableName`}
                   render={() => <AsyncComponent componentName="Table"
                                                 domainPath={domainPath}
                                                 reduxStoreManager={reduxStoreManager}
                                                 options={options}/>}/>
        </Switch>
    );
}
