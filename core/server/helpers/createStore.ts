import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

export default (reducers: any) => {
    return  createStore(combineReducers(reducers), {}, applyMiddleware(thunk));
}
