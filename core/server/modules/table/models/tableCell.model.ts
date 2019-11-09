import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
import {TableHeader, TableHeaderDocument} from './tableHeader.model';

const {Schema} = mongoose;
export interface TableCell {
    _id: any,
    header: any
    value: any
}

export interface TableCellDocument extends TableCell, Document {
}

export const TableCellSchema = new Schema({
    header: {
        type: Schema.Types.ObjectId, ref: 'TableHeader'
    },
    value: Schema.Types.Mixed
});


export const TableCellModel = mongoose.model<TableCellDocument>('TableCell', TableCellSchema);
