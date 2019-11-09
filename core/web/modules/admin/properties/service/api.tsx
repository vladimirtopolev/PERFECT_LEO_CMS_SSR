import axios from 'axios';

// MODULE TABLE
const MODULE_TABLE_DOMAIN = 'properties';

export function getProperties(): Promise<any> {
    return axios.get(`/api/${MODULE_TABLE_DOMAIN}`);
}

export function updateProperties(properties: any): Promise<any> {
    return axios.put(`/api/${MODULE_TABLE_DOMAIN}`, properties);
}
