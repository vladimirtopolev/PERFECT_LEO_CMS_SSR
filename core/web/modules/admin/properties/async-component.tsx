import * as React from 'react';
import {lazy, Suspense} from 'react';

const Properties = lazy(() => import( './components/properties.container'));

import {MODULE_NAME} from './constants';
const Components: { [k: string]: any } = {
    Properties
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
