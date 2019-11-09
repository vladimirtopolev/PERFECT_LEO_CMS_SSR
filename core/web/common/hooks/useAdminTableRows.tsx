
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../../modules/client/table/store/actions/actions';
import * as selectors from '../../modules/client/table/store/reducers';
import {Row} from '../../modules/admin/table/schema/models';

export function useAdminTableRows(tableName: string) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getAdminTableRows(tableName));
    }, []);

    return useSelector(selectors.getTableRows(tableName)) as Row[];
}
