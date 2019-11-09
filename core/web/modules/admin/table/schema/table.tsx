import {NormalizedSchema, schema} from 'normalizr';

export const header = new schema.Entity('headers', {}, {idAttribute: '_id'});
export const headers = new schema.Array(header);
export const tableHeaders = new schema.Entity('table', {
    headers: headers
}, {idAttribute: 'name'});

export const cell = new schema.Entity('cells', {type: header}, {idAttribute: '_id'});
export const cells = new schema.Array(cell);

export const row = new schema.Entity('rows', {cells: cells}, {idAttribute: '_id'});
export const rows = new schema.Array(row);
export const tableRows = new schema.Entity('table', {
    rows: rows
}, {idAttribute: 'name'});

export const table = new schema.Entity('table', {
    rows: rows,
    cells: cells,
    headers: headers
}, {idAttribute: 'name'});


export interface TableEntities {
    table: any,
    rows: any[],
    cells: any[],
    headers: any[]
}

export interface HeadersEntities {
    table: any,
    headers: any[]
}

export interface RowsEntities {
    table: any,
    rows: any[]
}

export interface NormalizedTableResponse extends NormalizedSchema<TableEntities, any[]> {
}

export interface NormalizedTableHeadersResponse extends NormalizedSchema<HeadersEntities, any[]> {
}

export interface NormalizedTableRowsResponse extends NormalizedSchema<RowsEntities, any[]> {
}
