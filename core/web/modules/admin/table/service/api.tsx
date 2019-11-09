import axios from 'axios';
import {Row} from '../schema/models';
import concatQueryParamsToUrl from '../../../../utilities/concatQueryParamsToUrl';

// MODULE TABLE
const MODULE_TABLE_DOMAIN = 'tables';

export function getTable(tableName: string): Promise<any> {
    return axios.get(`/api/${MODULE_TABLE_DOMAIN}/${tableName}`);
}

export function getTableHeaders(tableName: string) {
    return axios.get(`/api/${MODULE_TABLE_DOMAIN}/${tableName}/headers`);
}

export function getTableRows(tableName: string, limit?: number, cursor?: number) {
    const url = concatQueryParamsToUrl(`/api/${MODULE_TABLE_DOMAIN}/${tableName}/rows`, {
        limit: limit,
        cursor: cursor
    });
    return axios.get(url);
}

export function getTableRow(tableName: string, rowId: string) {
    return axios.get(`/api/${MODULE_TABLE_DOMAIN}/${tableName}/rows/${rowId}`);
}

export function saveTableRow(tableName: string, row: Row) {
    return axios.post(`/api/${MODULE_TABLE_DOMAIN}/${tableName}/rows`, row);
}

export function updateTableRow(tableName: string, idRow: string, row: Row) {
    return axios.put(`/api/${MODULE_TABLE_DOMAIN}/${tableName}/rows/${idRow}`, row);

}

export function deleteTableRow(tableName: string, idRow: string) {
    return axios.delete(`/api/${MODULE_TABLE_DOMAIN}/${tableName}/rows/${idRow}`);
}

export function uploadImage(body: any) {
    return axios.post(`/api/cloudinary/image-upload`, body);
}
