export interface Locale {
    name: string,
    lang: string,
    key: string,
    title: string
}

export enum HEADER_TYPES {
    INPUT = 'INPUT',
    IMAGE = 'IMAGE',
    TEXTAREA = 'TEXTAREA',
    IMAGE_GALLERY= 'IMAGE_GALLERY'
}

export interface TableMeta {
    name: string,
    title: string,
    rowCounts: string
}

export interface Header {
    _id: string,
    type: HEADER_TYPES.IMAGE | HEADER_TYPES.INPUT | HEADER_TYPES.TEXTAREA | HEADER_TYPES.IMAGE_GALLERY,
    internalName: string,
    notLocalized?: boolean,
    properties?: any,
    name: string,
}

export interface Cell {
    _id: string,
    header: Header,
    value: any
}

export interface Row {
    _id: string,
    cells: Cell[]
}

export interface Table {
    _id: string,
    name: string,
    title: string,
    headers: Header[],
    rows: Row[]
}
