import * as mongoose from 'mongoose';
import {Request, Response} from 'express';
import {PropertyModel, PropertyProperties} from '../models/property.model';


class TableController {

    getProperties = async (req: Request, res: Response) => {
        const properties = await PropertyModel
            .find({})
            .exec();
        if (properties) {
            return res.json(properties);
        }
        return res.status(404).json({error: `Properties does not exist`});
    };

    updateProperties = async (req: Request, res: Response) => {
        const bulkOpts = req.body.reduce((memo: any[], property: PropertyProperties) => {
            return memo.concat({
                updateOne: {
                    filter: {'_id': property._id},
                    update: {'$set': {value: property.value}}
                }
            });
        }, []);

        await PropertyModel.bulkWrite(bulkOpts);
        return this.getProperties(req, res);
    };
}

export default new TableController();
