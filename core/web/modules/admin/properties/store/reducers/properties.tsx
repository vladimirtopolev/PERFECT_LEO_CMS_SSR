import {Reducer} from 'redux';
import {AsyncAction, AsyncActionStatus, SucceededAsyncAction} from '../../../../../utilities/asyncActions';


import {GET_PROPERTIES, UPDATE_PROPERTIES} from '../actions/types';
import {Property} from '../../schema/models';
import {Params} from '../../../table/store/actions/actions';

type GetPropertiesActionSuccess = SucceededAsyncAction<typeof GET_PROPERTIES, Property[], Params>;
type UpdatePropertiesActionSuccess = SucceededAsyncAction<typeof UPDATE_PROPERTIES, Property[], Params>;

const properties: Reducer<Property[], AsyncAction<any, any>> = (state = [], action) => {
    if (action.type === GET_PROPERTIES) {
        switch (action.status) {
            case AsyncActionStatus.SUCCEEDED:
                return requestProperties(state, action as GetPropertiesActionSuccess);
            default:
                return state;
        }
    }
    if (action.type === UPDATE_PROPERTIES) {
        switch (action.status) {
            case AsyncActionStatus.SUCCEEDED:
                return requestUpdateProperties(state, action as UpdatePropertiesActionSuccess);
            default:
                return state;
        }
    }

    return state;
};

const requestProperties = (state: Property[], action: GetPropertiesActionSuccess):Property[] => {
    return action.payload;
};
const requestUpdateProperties = (state: Property[], action: UpdatePropertiesActionSuccess):Property[] => {
    return action.payload;
};

export default properties;


//selectors
export const getProperties = (state: any) => {
    return state;
};
