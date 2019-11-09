import {Reducer} from 'redux';
import * as _ from 'lodash';
import {
    GET_TABLE_ACTION,
    GET_TABLE_HEADERS_ACTION,
    GET_TABLE_ROW_ACTION,
    GET_TABLE_ROWS_ACTION,
    SAVE_TABLE_ROW_ACTIONS,
    UPDATE_TABLE_ROW_ACTION,
    DELETE_TABLE_ROW_ACTION
} from '../actions/types';
import {Params} from '../actions/actions';

import {AsyncAction, AsyncActionStatus, SucceededAsyncAction} from '../../../../../utilities/asyncActions';
import {NormalizedTableResponse, NormalizedTableHeadersResponse, NormalizedTableRowsResponse} from '../../schema/table';

type GetTableActionSuccess = SucceededAsyncAction<typeof GET_TABLE_ACTION, NormalizedTableResponse, Params>;
type GetTableHeadersActionSuccess = SucceededAsyncAction<typeof GET_TABLE_HEADERS_ACTION, NormalizedTableHeadersResponse, Params>;

type GetTableRowsActionSuccess = SucceededAsyncAction<typeof GET_TABLE_ROWS_ACTION, NormalizedTableRowsResponse, Params>;
type GetTableRowActionSuccess = SucceededAsyncAction<typeof GET_TABLE_ROW_ACTION, NormalizedTableRowsResponse, Params>;
type SaveTableRowActionSuccess = SucceededAsyncAction<typeof SAVE_TABLE_ROW_ACTIONS, NormalizedTableRowsResponse, Params>;
type UpdateTableRowActionSuccess = SucceededAsyncAction<typeof UPDATE_TABLE_ROW_ACTION, NormalizedTableRowsResponse, Params>;
type TableRowActions =
    GetTableRowsActionSuccess
    | GetTableRowActionSuccess
    | SaveTableRowActionSuccess
    | UpdateTableRowActionSuccess;

type DeleteTableActionSuccess = SucceededAsyncAction<typeof DELETE_TABLE_ROW_ACTION, any, Params>;

const tables: Reducer<any, AsyncAction<any, any>> = (state = {}, action) => {
    if (action.type === GET_TABLE_ACTION) {
        switch (action.status) {
            case AsyncActionStatus.SUCCEEDED:
                return requestTableSuccess(state, action as GetTableActionSuccess);
            default:
                return state;
        }
    }
    if (action.type === GET_TABLE_HEADERS_ACTION) {
        switch (action.status) {
            case AsyncActionStatus.SUCCEEDED:
                return requestTableHeadersSuccess(state, action as GetTableHeadersActionSuccess);
            default:
                return state;
        }
    }
    if (action.type === GET_TABLE_ROWS_ACTION ||
        action.type === GET_TABLE_ROW_ACTION ||
        action.type === SAVE_TABLE_ROW_ACTIONS ||
        action.type === UPDATE_TABLE_ROW_ACTION) {
        switch (action.status) {
            case AsyncActionStatus.SUCCEEDED:
                return requestTableRowsSuccess(state, action as TableRowActions);
            default:
                return state;
        }
    }

    if (action.type === DELETE_TABLE_ROW_ACTION) {
        switch (action.status) {
            case AsyncActionStatus.SUCCEEDED:
                return requestDeleteTableRowSuccess(state, action as DeleteTableActionSuccess);
            default:
                return state;
        }
    }

    return state;
};

export default tables;

const requestTableSuccess = (state: any, action: GetTableActionSuccess) => {
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

const requestTableHeadersSuccess = (state: any, action: GetTableHeadersActionSuccess) => {
    const {entities} = action.payload;
    const {tableName} = action.params;
    return {
        ...state,
        [tableName]: {
            ...state[tableName],
            ...entities,
            headerIds: entities.table[tableName].headers
        }
    };
};

const requestTableRowsSuccess = (state: any, action: TableRowActions) => {
    const {entities} = action.payload;
    const {tableName} = action.params;
    return {
        ...state,
        [tableName]: {
            ...state[tableName],
            ...entities,
            rowIds: entities.table[tableName].rows
        }
    };
};

const requestDeleteTableRowSuccess = (state: any, action: DeleteTableActionSuccess) => {
    const {tableName, rowId} = action.params;
    return {
        ...state,
        [tableName]: {
            ...state[tableName],
            rowIds: state[tableName].rowIds.filter((id: string) => id !== rowId)
        }
    };
};

//selectors
export const getTable = (state: any, tableName: string) => state[tableName];

export const getTableMeta = (state: any, tableName: string) => {
    const tableMeta = getTable(state, tableName);
    return tableMeta
        ? tableMeta.table[tableName]
        : {
            name: tableName,
            title: '',
            rowCount: 0
        };
};
export const getTableHeaders = (state: any, tableName: string) => {
    const tableMeta = getTable(state, tableName);
    return _.get(tableMeta, 'headerIds', [])
        .map((headerKey: any) => tableMeta.headers[headerKey]);
};

export const getTableRows = (state: any, tableName: string) => {
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


export const getTableRow = (state: any, tableName: string, rowId: string) => {
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
