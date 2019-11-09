import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
import {TableCell} from './tableCell.model';
import {Table} from './table.model';

const {Schema} = mongoose;

export interface TableRow {
    cells: (string | TableCell)[]
    table: string| Table | mongoose.Types.ObjectId,
    createdDate: number
}

export interface TableRowDocument extends TableRow, Document {

}

export const TableRowSchema = new mongoose.Schema({
    cells: [{
        type: Schema.Types.ObjectId, ref: 'TableCellModel'
    }],
    table: {
        type: Schema.Types.ObjectId, ref: 'Table'
    },
    createdDate: Schema.Types.Number
});


export const TableRowModel = mongoose.model<TableRowDocument>('TableRow', TableRowSchema);
