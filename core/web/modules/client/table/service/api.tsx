import axios from 'axios';

// MODULE TABLE
const MODULE_TABLE_DOMAIN = 'tables';

export function getTable(tableName: string): Promise<any> {
    return axios.get(`/api/${MODULE_TABLE_DOMAIN}/${tableName}`);
}

export function getTableRow(tableName: string, rowId: string) {
    return axios.get(`/api/${MODULE_TABLE_DOMAIN}/${tableName}/rows/${rowId}`);
}
