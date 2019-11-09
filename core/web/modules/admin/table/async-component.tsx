import * as React from 'react';
import {lazy, Suspense} from 'react';

const Table = lazy(() => import( './components/table/table.container'));
const Row = lazy(() => import( './components/row/row.container'));

import {MODULE_NAME} from './constants';
const Components: { [k: string]: any } = {
    Table,
    Row
};

const AsyncComponent = (props: any) => {
    const {componentName, reduxStoreManager} = props;
    import('./store/reducers')
        .then(module => {
            reduxStoreManager.injectReducer(MODULE_NAME, module.default);
        });
    const Component = Components[componentName];
    return (
        <Suspense fallback={'Spinner'}>
            <Component {...props} />
        </Suspense>
    );
};

export default AsyncComponent;
