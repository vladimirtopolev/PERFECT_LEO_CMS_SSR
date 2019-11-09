import * as mongoose from 'mongoose';
import {Model, Schema} from 'mongoose';


export interface FieldValues {
    [K:string]: any
}

export interface ClientMessageProperties {
    _id: any,
    values: FieldValues,
    messageStructureName: string
}

export interface ClientMessage extends mongoose.Document {
}

export const ClientMessageSchema = new Schema({
    messageStructureName: String,
    values: Object,
});


export const ClientMessageModel: Model<ClientMessage> = mongoose.model('ClientMessage', ClientMessageSchema);
