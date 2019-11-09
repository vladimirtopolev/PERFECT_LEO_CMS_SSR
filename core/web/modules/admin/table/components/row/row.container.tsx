import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useReactRouter from 'use-react-router';
import {getTableHeaders, getTableRow, saveTableRow, updateTableRow} from '../../store/actions/actions';
import * as selectors from '../../store/reducers';
import {GET_TABLE_HEADERS_ACTION, GET_TABLE_ROWS_ACTION} from '../../store/actions/types';
import WithSpinner from '../../../../../common/helpers/with-spinner.render-props-component';
import RowComponent from './row.component';
import {Row} from '../../schema/models';

interface RouteParams {
    tableName: string,
    locale: string,
    rowId: string
}

export default (props: any) => {
    const {match, history} = useReactRouter<RouteParams>();
    const {tableName, rowId, locale} = match.params;

    const dispatch = useDispatch();

    const headers = useSelector(selectors.getTableHeaders(tableName));
    const row = useSelector(selectors.getTableRow(tableName, rowId));
    const isLoading = useSelector(selectors.isLoadingTasks([GET_TABLE_HEADERS_ACTION]));
    const localeItem = props.options.locales.find((l: any) => l.key === locale);

    const goBack = () => history.push(`/admin/tables/${tableName}`);
    const saveOrUpdateTableRow = (row: Row) => {
        rowId === 'new' ? dispatch(saveTableRow(tableName, row)) : dispatch(updateTableRow(tableName, rowId, row))
    };

    useEffect(() => {
        dispatch(getTableHeaders(tableName));
        rowId !== 'new' && dispatch(getTableRow(tableName, rowId));
    }, [tableName, rowId]);


    return (
        <WithSpinner isLoading={isLoading}>
            {() => <RowComponent row={row}
                                 headers={headers}
                                 locale={localeItem}
                                 goBack={goBack}
                                 saveOrUpdateTableRow={saveOrUpdateTableRow}
                                 {...props}
            />}
        </WithSpinner>
    );
}
