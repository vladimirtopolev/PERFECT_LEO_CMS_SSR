import * as express from "express";
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as formData from 'express-form-data';
import {Application, Router} from 'express';
import * as mongoose from 'mongoose';
import {matchRoutes, RouteConfig} from 'react-router-config';
import clientRenderer from './helpers/clientRenderer';
import createStore from './helpers/createStore';
import axios from 'axios';
import {LocaleManager} from '../web/utilities/localeManager';

export class App {
    app: Application;
    routes: ({ router: Router, modulePath: string })[] = [];

    constructor(public clientRoutes: RouteConfig[], public reducers: any, public localeManager: LocaleManager) {
    }

    runServer(config: any) {
        const PORT = process.env.PORT || 5000;
        return mongoose.connect(config.dbConfig.host, {dbName: config.dbConfig.dbName, useNewUrlParser: true})
            .then(() => {
                console.log(`Connection to DB is successful: ${config.dbConfig.host}`);
                this.getApp().listen(PORT, () => console.log(`Listening on ${PORT}`));
            });
    }

    addModuleRouter(modulePath: string, router: Router) {
        this.routes.push({modulePath, router});
        return this;
    }

    initRoutes() {
        this.routes.forEach(({router, modulePath}) => {
            this.app.use(modulePath, router);
        });
    }

    initDefaultMiddlewares() {
        // parse application/json and look for raw text
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.json({type: 'application/json'}));

        this.app.use(formData.parse());
    }

    getApp(): Application {
        this.app = express();
        this.app.use(express.static(path.resolve(__dirname, '../web')));

        this.initDefaultMiddlewares();
        this.initRoutes();


        this.app.get("*", (req, res, next) => {
            const store = createStore(this.reducers);

            axios.defaults.baseURL = `${req.protocol}://${req.get('host')}`;

            const promises = matchRoutes(this.clientRoutes, req.path).map(({route}) => {
                return route.loadData ? route.loadData(store) : null;
            });

            Promise.all(promises)
                .then(() => {
                    res.send(clientRenderer(req, this.clientRoutes, __dirname, store, this.localeManager));
                }).catch(e => console.log(e));
        });

        return this.app;
    }
}
