import * as api from '../../../../modules/admin/properties/service/api';
import {asyncActionCreator} from '../../../../utilities/asyncActions';
import {GET_COMMON_PROPERTIES} from './types';
import {Property} from '../../../../modules/admin/properties/schema/models';

export function getProperties() {
    return asyncActionCreator<typeof GET_COMMON_PROPERTIES, Property[], undefined>(
        GET_COMMON_PROPERTIES,
        api.getProperties()
            .then(response => {
                return response.data;
            })
    );
}
