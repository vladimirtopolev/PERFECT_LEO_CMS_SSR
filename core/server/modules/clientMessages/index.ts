import {Router} from "express";
import ClientMessageController from './controllers/clientMessage.controller';
export default (): Router => {
    const moduleRootRouter = Router();

    moduleRootRouter.route('/')
        .get(ClientMessageController.getClientMessages);

    return moduleRootRouter;
}
