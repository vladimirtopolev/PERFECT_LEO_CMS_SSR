import * as mongoose from 'mongoose';
import {Model, Schema} from 'mongoose';


export interface Field {
    fieldName: string,
    label: string,
    validation: any[],
}

export interface MessageStructureProperties {
    _id: any,
    messageStructureName: string,
    fields: Field[]
}

export interface MessageStructure extends mongoose.Document {
}

export const MessageStructureSchema = new Schema({
    messageStructureName: String,
    fields: Array,
});


export const MessageStructureModel: Model<MessageStructure> = mongoose.model('MessageStructure', MessageStructureSchema);
