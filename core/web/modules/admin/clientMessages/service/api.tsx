import axios from 'axios';

// MODULE TABLE
const MODULE_DOMAIN = 'clientMessages';

export interface Message {
    _id: any,
    messageStructureName: string,
    values: {
        [k: string]: any
    }
}
export function getClientMessages(): Promise<Message[]> {
    return axios.get(`/api/${MODULE_DOMAIN}`)
        .then(res => {
            return res.data as Message[]
        });
}
