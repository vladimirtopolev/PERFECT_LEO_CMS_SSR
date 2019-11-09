import * as mongoose from 'mongoose';
import {Model, Schema} from 'mongoose';

export interface PropertyProperties {
    _id: any,
    type: string,
    name: string,
    internalName: string,
    order: number,
    notLocalized?: true,
    group?: string,
    titleGroup?:string,
    value: any
}

export interface Property extends mongoose.Document{

}

export const PropertySchema = new Schema({
    type: String,
    name: String,
    internalName: String,
    order: Number,
    group: String,
    titleGroup: String,
    notLocalized: Boolean,
    value: Schema.Types.Mixed
});


export const PropertyModel: Model<Property> = mongoose.model('Property', PropertySchema);
