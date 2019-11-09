import {combineReducers, createStore, Store, applyMiddleware, AnyAction} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

export interface StoreWithAsyncReducers extends Store {
    asyncReducers?: { [k: string]: any },
}


const getInitStateDefault = (): { [K: string]: any } => {
    return {
        //@ts-ignore
        ...window.INITIAL_STATE,
        auth: localStorage && localStorage.getItem('auth') && localStorage.getItem('auth') !== 'undefined'
            ? JSON.parse(localStorage.getItem('auth'))
            : {
                auth: null,
                asyncStatuses: {}
            }
    }
};

export default class ReduxStoreManager {
    staticReducers: any;
    store: StoreWithAsyncReducers;

    constructor(staticReducers: any, getInitState: () => { [K: string]: any } = getInitStateDefault) {
        this.staticReducers = staticReducers;
        this.store = createStore(
            this.createReducer(),
            getInitState(),
            composeWithDevTools(applyMiddleware(thunk, logger)));

        this.store.asyncReducers = {};

        // save each changes in store in localStorage
        this.store.subscribe(() => {
            localStorage.setItem('auth', JSON.stringify(this.store.getState().auth));
        });
    }

    createReducer = (asyncReducers?: any) => {
        return combineReducers({
            ...this.staticReducers,
            ...asyncReducers
        });
    };

    replaceReducer = (asyncReducers: any) => {
        return combineReducers({
            ...this.staticReducers,
            ...asyncReducers
        });
    };

    injectReducer = (key: string, reducer: any) => {
        if (Object.hasOwnProperty.call(this.store.asyncReducers, key)) return;

        this.store.asyncReducers[key] = reducer;
        this.store.replaceReducer(this.replaceReducer(this.store.asyncReducers));
    };

    getStore = () => {
        return this.store;
    };
}


