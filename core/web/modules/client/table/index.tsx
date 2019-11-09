import * as React from 'react';
import {lazy} from 'react';
import {Route} from 'react-router';

const AdminTableEntityRoutes = lazy(() => import('./routes'));

export const adminTableEntityCreator = (
    domainPath: string,
    tableName: string,
    RowsRenderer: any,
    RowRenderer: any
) => <Route path={domainPath} render={() => <AdminTableEntityRoutes domainPath={domainPath}
                                                                    tableName={tableName}
                                                                    RowsRenderer={RowsRenderer}
                                                                    RowRenderer={RowRenderer}/>}/>;
