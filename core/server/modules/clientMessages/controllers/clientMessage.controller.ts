import * as mongoose from 'mongoose';
import {Request, Response} from 'express';
import {ClientMessageModel} from '../models/clientMessage.model';


class ClientMessagesController {

    getClientMessages = async (req: Request, res: Response) => {
        const messages = await ClientMessageModel
            .find({})
            .exec();
        if (messages) {
            return res.json(messages);
        }
        return res.status(404).json({error: `Cannot find client messages`});
    };
}

export default new ClientMessagesController();
