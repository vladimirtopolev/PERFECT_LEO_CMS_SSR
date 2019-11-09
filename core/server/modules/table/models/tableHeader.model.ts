import * as mongoose from 'mongoose';
import {Document} from 'mongoose';

export enum TableHeaderTypesEnum {
    INPUT = 'INPUT',
    TEXTAREA = 'TEXTAREA',
    IMAGE = 'IMAGE',
    IMAGE_GALLERY = 'IMAGE_GALLERY',
    DATE = 'DATE'
}

type TableHeaderTypes =
    TableHeaderTypesEnum.DATE |
    TableHeaderTypesEnum.INPUT |
    TableHeaderTypesEnum.TEXTAREA |
    TableHeaderTypesEnum.IMAGE |
    TableHeaderTypesEnum.IMAGE_GALLERY;

export interface TableHeader {
    type: TableHeaderTypes,
    name: string,
    internalName: string,
    previewHidden?: boolean,
    properties?: object,
    notLocalized?: boolean,
    order?: Number
}

export interface TableHeaderDocument extends TableHeader, Document {
}

export const TableHeaderSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['INPUT', 'TEXTAREA', 'IMAGE', 'IMAGE_GALLERY', 'DATE'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    internalName: {
        type: String,
        required: true
    },
    previewHidden: Boolean,
    properties: Object,
    notLocalized: Boolean,
    order: Number,
});

export const TableHeaderModel = mongoose.model<TableHeaderDocument>('TableHeader', TableHeaderSchema);



