import * as React from 'react';
import {Route, Switch} from 'react-router';
import {lazy} from 'react';

const AdminTableEntityRows = lazy(() => import('./components/admin-table-entity-rows.container'));
const AdminTableEntityRow = lazy(() => import('./components/admin-table-entity-row.container'));

interface RoutesProps {
    domainPath: string,
    tableName: string,
    RowsRenderer: any,
    RowRenderer: any
}

export default ({domainPath, tableName, RowsRenderer, RowRenderer}: RoutesProps) => {
    return (
        <Switch>
            <Route exact
                   path={`${domainPath}`}
                   render={() => <AdminTableEntityRows tableName={tableName}
                                                       RowsRenderer={RowsRenderer}/>}/>
            <Route exact
                   path={`${domainPath}/:tableEntityRowId`}
                   render={() => <AdminTableEntityRow tableName={tableName}
                                                      RowRenderer={RowRenderer}/>}/>
        </Switch>
    );
}
