import {Router} from "express";
import tableController from './controllers/table.controller';

export default (): Router => {
    const moduleRootRouter = Router();

    moduleRootRouter.get(`/:tableName`, tableController.getTable);

    moduleRootRouter.get(`/:tableName/headers`, tableController.getHeaders);

    moduleRootRouter.route(`/:tableName/rows`)
        .get(tableController.getRows)
        .post(tableController.createRow);

    moduleRootRouter.route('/:tableName/rows/:rowId')
        .get(tableController.getRow)
        .put(tableController.updateRow)
        .delete(tableController.deleteRow);

    return moduleRootRouter;
}
