import * as React from 'react';

import HomePage from './components/home/HomePage';

export default [
    {
        ...HomePage,
        path: '/',
        exact: true
    }
];
