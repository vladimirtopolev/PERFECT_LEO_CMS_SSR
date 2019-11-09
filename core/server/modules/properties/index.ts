import {Router} from "express";
import propertiesController from './controllers/properties.controller';

export default (): Router => {
    const moduleRootRouter = Router();

    moduleRootRouter.route('/')
        .get(propertiesController.getProperties)
        .put(propertiesController.updateProperties);

    return moduleRootRouter;
}
