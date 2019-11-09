import * as React from "react";
import {hydrate} from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import routes from './routes';
import StoreManager from './clientManagers/storeManager';
import {Provider} from 'react-redux';
import {WithLanguageContext} from './clientManagers/localeManager';
import './styles.scss';

const store = StoreManager.getStore();

hydrate((
    <Provider store={store}>
        <BrowserRouter>
            <WithLanguageContext>
                {renderRoutes(routes)}
            </WithLanguageContext>
        </BrowserRouter>
    </Provider>
), document.getElementById("root"));
