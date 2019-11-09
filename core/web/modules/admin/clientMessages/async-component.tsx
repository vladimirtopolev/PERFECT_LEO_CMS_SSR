import * as React from 'react';
import {lazy, Suspense} from 'react';

const MessagesDashboard = lazy(() => import( './components/messageDashboard.container'));

import {MODULE_NAME} from './constants';
const Components: { [k: string]: any } = {
    MessagesDashboard
};

const AsyncComponent = (props: any) => {
    const {componentName, reduxStoreManager} = props;
    const Component = Components[componentName];
    return (
        <Suspense fallback={'Spinner'}>
            <Component {...props} />
        </Suspense>
    );
};

export default AsyncComponent;
