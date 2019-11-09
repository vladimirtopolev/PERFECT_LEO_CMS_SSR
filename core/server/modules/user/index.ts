import {Router} from "express";
import userController from './controllers/users.controller';

export default (): Router => {
    const moduleRootRouter = Router();

    moduleRootRouter.route('/signin')
        .post(userController.signin);

    return moduleRootRouter;
}
