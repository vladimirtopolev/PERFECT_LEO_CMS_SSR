import {Reducer} from 'redux';
import {AsyncAction, AsyncActionStatus, SucceededAsyncAction} from '../../../../utilities/asyncActions';


import {GET_COMMON_PROPERTIES} from '../actions/types';
import {Property} from '../../../admin/properties/schema/models';

type GetPropertiesActionSuccess = SucceededAsyncAction<typeof GET_COMMON_PROPERTIES, Property[]>;

const properties: Reducer<Property[], AsyncAction<any, any>> = (state = [], action) => {
    if (action.type === GET_COMMON_PROPERTIES) {
        switch (action.status) {
            case AsyncActionStatus.SUCCEEDED:
                return requestProperties(state, action as GetPropertiesActionSuccess);
            default:
                return state;
        }
    }
    return state;
};

export default properties;

const requestProperties = (state: Property[], action: GetPropertiesActionSuccess):Property[] => {
    return action.payload;
};

// selectors

export const getProperties = (state:any) => state.properties;
