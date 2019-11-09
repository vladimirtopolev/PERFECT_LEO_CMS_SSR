import * as api from '../../service/api';
import {asyncActionCreator} from '../../../../../utilities/asyncActions';
import {
    table,
    tableHeaders,
    NormalizedTableHeadersResponse,
    NormalizedTableResponse,
    NormalizedTableRowsResponse
} from '../../schema/table';
import {normalize} from 'normalizr';
import {
    GET_TABLE_ACTION,
    GET_TABLE_HEADERS_ACTION,
    GET_TABLE_ROW_ACTION,
    GET_TABLE_ROWS_ACTION,
    UPDATE_TABLE_ROW_ACTION,
    SAVE_TABLE_ROW_ACTIONS,
    DELETE_TABLE_ROW_ACTION
} from './types';
import {Row} from '../../schema/models';

export const MODULE_NAME = 'tableModule';

export type Params = {
    moduleName: string,
    tableName: string,
    rowId?: string,
}

export function getTable(tableName: string) {
    return asyncActionCreator<typeof GET_TABLE_ACTION, NormalizedTableResponse, Params>(
        GET_TABLE_ACTION,
        api.getTable(tableName)
            .then(response => {
                return normalize(response.data, table);
            }),
        {tableName, moduleName: MODULE_NAME}
    );
}

export function getTableHeaders(tableName: string) {
    return asyncActionCreator<typeof GET_TABLE_HEADERS_ACTION, NormalizedTableHeadersResponse, Params>(
        GET_TABLE_HEADERS_ACTION,
        api.getTableHeaders(tableName)
            .then(response => {
                return normalize(response.data, tableHeaders);
            }),
        {tableName, moduleName: MODULE_NAME}
    );
}

export function getTableRows(tableName: string, rowsPerPage?: number, cursor?: number) {
    return asyncActionCreator<typeof GET_TABLE_ROWS_ACTION, NormalizedTableRowsResponse, Params>(
        GET_TABLE_ROWS_ACTION,
        api.getTableRows(tableName, rowsPerPage, cursor)
            .then(response => {
                return normalize(response.data, table);
            }),
        {tableName, moduleName: MODULE_NAME}
    );
}

export function getTableRow(tableName: string, rowId: string) {
    return asyncActionCreator<typeof GET_TABLE_ROW_ACTION, NormalizedTableRowsResponse, Params>(
        GET_TABLE_ROW_ACTION,
        api.getTableRow(tableName, rowId)
            .then(response => {
                return normalize(response.data, table);
            }),
        {tableName, rowId, moduleName: MODULE_NAME}
    );
}

export function saveTableRow(tableName: string, row: Row) {
    return asyncActionCreator<typeof SAVE_TABLE_ROW_ACTIONS, NormalizedTableRowsResponse, Params>(
        SAVE_TABLE_ROW_ACTIONS,
        api.saveTableRow(tableName, row)
            .then(response => normalize(response.data, table)),
        {tableName, moduleName: MODULE_NAME}
    );
}

export function updateTableRow(tableName: string, rowId: string, row: Row) {
    return asyncActionCreator<typeof UPDATE_TABLE_ROW_ACTION, NormalizedTableRowsResponse, Params>(
        UPDATE_TABLE_ROW_ACTION,
        api.updateTableRow(tableName, rowId, row)
            .then(response => normalize(response.data, table)),
        {tableName, rowId, moduleName: MODULE_NAME}
    );
}

export function deleteTableRow(tableName: string, rowId: string) {
    return asyncActionCreator<typeof DELETE_TABLE_ROW_ACTION, any, Params>(
        DELETE_TABLE_ROW_ACTION,
        api.deleteTableRow(tableName, rowId),
        {tableName, rowId, moduleName: MODULE_NAME}
    )
}
