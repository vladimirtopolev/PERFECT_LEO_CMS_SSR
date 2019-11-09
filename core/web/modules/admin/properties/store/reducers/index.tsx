import {combineReducers} from 'redux';

import properties, * as fromOrderedCalls from './properties';
import {MODULE_NAME} from '../../constants';

const rootReducer = combineReducers({
    properties
});

export default rootReducer;


// selectors
export const getProperties = (state: any) =>
    fromOrderedCalls.getProperties(state[MODULE_NAME].properties);


