import * as React from 'react';
import {Route, Switch} from 'react-router';
import AsyncComponent from './async-component';
import ReduxStoreManager from '../../../utilities/reduxStoreManagerFactory';

export default ({domainPath, reduxStoreManager, options}: { domainPath: string, reduxStoreManager: ReduxStoreManager, options?: any }) => {
    return (
        <Switch>
            <Route path={`${domainPath}`}
                   render={() => <AsyncComponent componentName="MessagesDashboard"
                                                 domainPath={domainPath}
                                                 reduxStoreManager={reduxStoreManager}
                                                 options={options}/>}/>
        </Switch>
    );
}
