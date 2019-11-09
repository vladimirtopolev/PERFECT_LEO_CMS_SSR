import tables, * as fromTables from './tables';
import * as _ from 'lodash';
import {combineReducers} from 'redux';
import {AsyncAction} from '../../../../../utilities/asyncActions';
import {GET_TABLE_ACTION, GET_TABLE_HEADERS_ACTION, GET_TABLE_ROWS_ACTION} from '../actions/types';
import {MODULE_NAME} from '../../constants';

const asyncStatuses = (state: any = {}, action: AsyncAction<typeof GET_TABLE_ACTION>) => {
    if (
        action.type === GET_TABLE_ACTION
        || action.type === GET_TABLE_HEADERS_ACTION
        || action.type === GET_TABLE_ROWS_ACTION
    ) {
        return {...state, [action.type]: action.status};
    }
    return state;
};

const rootReducer = combineReducers({
    tables,
    asyncStatuses
});

export default rootReducer;

export type TableModuleState = ReturnType<typeof rootReducer>;


// selectors
export const getTable = (tableName: string)=>(state: any) => fromTables.getTable(state[MODULE_NAME].tables, tableName);
export const getTableMeta = (tableName: string) =>(state: any) => fromTables.getTableMeta(state[MODULE_NAME].tables, tableName);
export const getTableHeaders = (tableName: string) =>(state: any) => fromTables.getTableHeaders(state[MODULE_NAME].tables, tableName);
export const getTableRows = (tableName: string) => (state: any) => fromTables.getTableRows(state[MODULE_NAME].tables, tableName);
export const getTableRow = (tableName: string, rowId: string) => (state: any) => fromTables.getTableRow(state[MODULE_NAME].tables, tableName, rowId);

export const getAsyncTaskStatuses = (state: any) => state[MODULE_NAME].asyncStatuses;


export const isLoadingTasks = (tasks: string[]) => (state: any) => {
    return tasks.some(actionKey => state[MODULE_NAME].asyncStatuses[actionKey] === 'STARTED');
};
