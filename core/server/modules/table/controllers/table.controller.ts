import * as _ from 'lodash';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
import {Request, Response} from 'express';

import '../models/tableHeader.model';
import {TableHeader} from '../models/tableHeader.model';

import {TableRowModel, TableRow} from '../models/tableRow.model';

import {TableModel, Table} from '../models/table.model';
import {TableCell, TableCellDocument, TableCellModel} from '../models/tableCell.model';

const populateCellDescription = {
    path: 'cells',
    model: 'TableCell',
    populate: {
        path: 'header',
        model: 'TableHeader'
    }
};

const populateRowsDescription = {
    path: 'rows',
    model: 'TableRow',
    populate: populateCellDescription
};

class TableController {

    findTableByName(tableName: string) {
        return TableModel.findOne({name: tableName}).exec();
    }

    getTable = async (req: Request, res: Response) => {
        const {tableName} = req.params;
        const table = await TableModel.findOne({name: tableName})
            .populate('headers')
            .populate(populateRowsDescription)
            .exec();
        if (table) {
            return res.json(table);
        }
        return res.status(404).json({error: `Table "${tableName}" does not exist`});
    };

    getHeaders = async (req: Request, res: Response) => {
        const {tableName} = req.params;
        const table = await TableModel.findOne({name: tableName})
            .populate('headers')
            .exec();
        if (table) {
            const rowCount = await TableRowModel.count({table: table._id.toString()});
            return res.json(Object.assign(
                _.omit(table.toJSON(), ['rows']),
                {rowCount}
            ));
        }
        return res.status(404).json({error: `Table "${tableName}" does not exist`});
    };

    getRows = async (req: Request, res: Response) => {
        const {tableName} = req.params;

        const table = await TableModel
            .findOne({name: tableName})
            .exec();

        if (table) {
            const rowCount = await TableRowModel.count({table: table._id.toString()});

            const rootTableRows = TableRowModel
                .find({table: table._id.toString()})
                .populate(populateCellDescription)
                .sort({'createdDate': 1});

            const limit = _.get(req, 'query.limit');
            const cursor = _.get(req, 'query.cursor');
            limit && rootTableRows.limit(+limit);
            cursor && rootTableRows.skip(+cursor);

            const tableRows = await rootTableRows.exec();
            return res.json(Object.assign(
                _.omit(table.toJSON(), ['headers']),
                {rows: tableRows},
                {rowCount}
            ));
        }
        return res.status(404).json({error: `Table "${tableName}" does not exist`});
    };

    _getRow = async (tableName: string, rowId: string, res: Response) => {
        const table = await TableModel.findOne({name: tableName}, {
            rows: {
                $elemMatch: {$eq: ObjectId(rowId)},
            },
            name: 1,
            title: 1
        })
            .populate(populateRowsDescription)
            .populate('headers')
            .exec();

        if (table) {
            return res.json(table);
        }
        return res.status(404).json({error: `Table "${tableName}" does not exist`});
    };

    getRow = (req: Request, res: Response) => {
        const {tableName, rowId} = req.params;
        this._getRow(tableName, rowId, res);
    };

    updateRow = async (req: Request, res: Response) => {
        const {tableName, rowId} = req.params;
        const table = await TableModel.findOne({name: tableName, rows: {$elemMatch: {$eq: rowId}}});
        if (!table) {
            return res
                .status(404).json({error: `Table "${tableName}" does not exist`});
        }
        if (table.rows.length === 0) {
            return res
                .status(404).json({error: `Table "${tableName}" does not content row with id ${rowId}`});
        }

        const bulkOpts = req.body.cells.reduce((memo: any[], cell: TableCellDocument) => {
            return memo.concat({
                updateOne: {
                    filter: {'_id': cell._id},
                    update: {'$set': {value: cell.value}}
                }
            });
        }, []);

        await TableCellModel.bulkWrite(bulkOpts);
        this._getRow(tableName, rowId, res);
    };

    createRow = async (req: Request, res: Response) => {
        const {tableName} = req.params;
        const table = await this.findTableByName(tableName);
        if (!table) {
            return res.status(404).json({error: `Table "${tableName}" does not exist`});
        }

        if (!req.body.cells) {
            return res.status(400).json({error: 'Request body should content "cells" property'});
        }

        const cells: TableCellDocument[] = req.body.cells.map((cell: any) => {
            return {
                ...cell,
                header: mongoose.Types.ObjectId(cell.header._id || cell.header),
                table: table._id,
                createdDate: (new Date()).getTime()
            };
        });

        const savedCells: TableCellDocument[] = await TableCellModel.create(cells);

        const tableRow = new TableRowModel({cells: savedCells});
        const savedTableRow = await tableRow.save();

        await TableModel.findByIdAndUpdate(table._id, {
            rows: table.rows.concat(savedTableRow._id)
        });
        this._getRow(tableName, savedTableRow._id, res);


    };

    deleteRow = async (req: Request, res: Response) => {
        const {rowId, tableName} = req.params;
        const table = await this.findTableByName(tableName);
        if (!table) {
            return res.status(404).json({error: `Table "${tableName}" does not exist`});
        }

        await TableModel.findByIdAndUpdate(table._id, {
            rows: table.rows.filter((row: any) => row._id.toString() !== rowId)
        });

        const deletedRow = await TableRowModel.findOneAndRemove({_id: rowId})
            .populate(populateCellDescription)
            .exec();
        res.json(deletedRow);
    };
}

export default new TableController();
