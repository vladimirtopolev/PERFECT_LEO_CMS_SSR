import {Reducer} from 'redux';
import {AsyncAction, AsyncActionStatus, SucceededAsyncAction} from '../../../../../utilities/asyncActions';
import {GET_ADMIN_TABLE_ROWS_DATA, GET_ADMIN_TABLE_ROW_DATA} from '../actions/types';
import {NormalizedTableResponse} from '../../../../admin/table/schema/table';
import {Params} from '../../../../admin/table/store/actions/actions';
import * as _ from 'lodash';

type GetTableRowsActionSuccess = SucceededAsyncAction<typeof GET_ADMIN_TABLE_ROWS_DATA, NormalizedTableResponse, Params>;
type GetTableRowActionSuccess = SucceededAsyncAction<typeof GET_ADMIN_TABLE_ROW_DATA, NormalizedTableResponse, Params>;

type GetTableActionsSuccess = GetTableRowsActionSuccess | GetTableRowActionSuccess;

const adminTableData: Reducer<any, AsyncAction<any, any>> = (state = {}, action) => {
    if (action.type === GET_ADMIN_TABLE_ROWS_DATA
        || action.type === GET_ADMIN_TABLE_ROW_DATA) {
        switch (action.status) {
            case AsyncActionStatus.SUCCEEDED:
                return requestTableSuccess(state, action as GetTableActionsSuccess);
            default:
                return state;
        }
    }
    return state;
};

export default adminTableData;

const requestTableSuccess = (state: any, action: GetTableActionsSuccess) => {
    const {entities} = action.payload;
    const {tableName} = action.params;
    return {
        ...state,
        [tableName]: {
            ...entities,
            headerIds: entities.table[tableName].headers,
            rowIds: entities.table[tableName].rows
        }
    };
};

//selectors
export const getTable = (state: any, tableName: string) => state.adminTableData[tableName];

export const getTableMeta = (state: any, tableName: string) => {
    const tableMeta = getTable(state, tableName);
    return tableMeta
        ? tableMeta.table[tableName]
        : {
            name: tableName,
            title: ''
        };
};

export const getTableRows = (tableName: string) =>(state: any) => {
    const tableMeta = getTable(state, tableName);
    return _.get(tableMeta, 'rowIds', [])
        .map((rowKey: any) => tableMeta.rows[rowKey])
        .map((row: any) => ({
            ...row,
            cells: row.cells.map((cellKey: any) => {
                const cell = tableMeta.cells[cellKey];
                return {
                    ...cell,
                    type: tableMeta.headers[cell.header]
                };
            })
        }));
};

export const getTableRow = ( tableName: string, rowId: string) => (state: any) => {
    const tableMeta = getTable(state, tableName);

    const row = _.get(tableMeta, `rows.${rowId}`);
    return row
        ? {
            ...row,
            cells: row.cells.map((cellKey: any) => {
                const cell = tableMeta.cells[cellKey];
                return {
                    ...cell,
                    type: tableMeta.headers[cell.header]
                };
            })
        }
        : undefined;
};
