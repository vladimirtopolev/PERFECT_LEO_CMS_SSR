import * as React from 'react';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useReactRouter from 'use-react-router';
import * as actions from '../../store/actions/actions';
import * as selectors from '../../store/reducers';
import {GET_TABLE_HEADERS_ACTION, GET_TABLE_ROWS_ACTION} from '../../store/actions/types';
import WithSpinner from '../../../../../common/helpers/with-spinner.render-props-component';
import LocaleTabsRenderer from '../../../../../common/elements/locale-tabs-renderer.component';
import Table from './table.component';
import * as queryString from 'query-string';

type RouteParams = { tableName: string };
type QueryParams = { limit: number, cursor: number, locale: string };

export default (props: any) => {
    const {options} = props;
    const {match, location} = useReactRouter<RouteParams>();
    const queryParams = queryString.parse(location.search, {parseNumbers: true}) as QueryParams;

    const tableName = match.params.tableName;
    const limitFromUrl = queryParams.limit || 10;
    const cursorFromUrl = queryParams.cursor || 0;
    const initLocale = queryParams.locale;

    const [limit, setLimit] = useState(limitFromUrl);
    const [cursor, setCursor] = useState(cursorFromUrl);

    const changeLimit = (limit: number) =>{
        setCursor(0);
        setLimit(limit);
    };

    const dispatch = useDispatch();

    const headers = useSelector(selectors.getTableHeaders(tableName));
    const rows = useSelector(selectors.getTableRows(tableName));
    const tableMeta = useSelector(selectors.getTableMeta(tableName));
    const isLoading = useSelector(selectors.isLoadingTasks([GET_TABLE_HEADERS_ACTION, GET_TABLE_ROWS_ACTION]));

    useEffect(() => {
        dispatch(actions.getTableHeaders(tableName));
        dispatch(actions.getTableRows(tableName, limit, cursor));
        changeLimit(limitFromUrl);
    }, [tableName, limitFromUrl, cursorFromUrl, initLocale]);

    useEffect(() => {
        dispatch(actions.getTableRows(tableName, limit, cursor));
    }, [limit, cursor]);

    return (
        <WithSpinner isLoading={isLoading}>
            {() =>
                <LocaleTabsRenderer
                    locales={options.locales}
                    initLocale={initLocale}
                    renderLocaleTab={(locale) => <Table locale={locale}
                                                        tableMeta={tableMeta}
                                                        headers={headers}
                                                        deleteRow={(rowID: string) =>
                                                            dispatch(actions.deleteTableRow(tableName, rowID))}
                                                        rows={rows}
                                                        hasPaginator={true}
                                                        paginationMeta={{
                                                            limit,
                                                            cursor,
                                                            totalCount: tableMeta.rowCount,
                                                            changeLimit
                                                        }}
                                                        {...props}/>
                    }
                />}
        </WithSpinner>
    );
}
