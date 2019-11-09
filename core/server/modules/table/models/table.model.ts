import * as mongoose from 'mongoose';
import {Model, Schema, Document} from 'mongoose';

export interface Table {
    name: string;
    title: string;
    headers: string[] | mongoose.Types.ObjectId[];
    rows: (string | mongoose.Types.ObjectId)[];
    uiConfig?: any;
    adiminConfig?: any
}


export interface TableDocument extends Table, Document {

}

export const TableSchema = new Schema<TableDocument>({
    name: String,
    title: String,
    headers: [{
        type: Schema.Types.ObjectId, ref: 'TableHeader'
    }],
    rows: [{
        type: Schema.Types.ObjectId, ref: 'TableRow'
    }],
    uiConfig: Schema.Types.Mixed,
    adminConfig: Schema.Types.Mixed
});

export const TableModel: Model<TableDocument> = mongoose.model('Table', TableSchema);

