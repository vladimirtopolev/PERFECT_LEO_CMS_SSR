
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../../modules/client/table/store/actions/actions';
import * as selectors from '../../modules/client/table/store/reducers';
import {Row} from '../../modules/admin/table/schema/models';

export function useAdminTableRow(tableName: string, rowId: string) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getAdminTableRow(tableName, rowId));
    }, []);

    return useSelector(selectors.getTableRow(tableName, rowId)) as Row;
}
