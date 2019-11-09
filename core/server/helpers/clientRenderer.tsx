import * as fs from 'fs';
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {renderRoutes, RouteConfig} from 'react-router-config';
import {Request} from 'express';
import * as path from "path";
import {Provider} from 'react-redux';
import {LocaleManager, WithLanguageContextRendererFactory} from '../../web/utilities/localeManager';

export default (req: Request, clientRoutes: RouteConfig[], dirname: string, store: any, localeManager: LocaleManager) => {
    const page = fs.readFileSync(path.resolve(dirname, '../index.html'), 'utf8');
    const WithLanguageContext = WithLanguageContextRendererFactory(localeManager);

    const renderedContent = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <WithLanguageContext>
                    {renderRoutes(clientRoutes)}
                </WithLanguageContext>
            </StaticRouter>
        </Provider>
    );

    return page.replace(/<div id="root"><\/div>/,
        `
            <div id="root">${renderedContent}</div>
            <script>
                window.INITIAL_STATE=${JSON.stringify(store.getState())}
            </script>
        `);
}
