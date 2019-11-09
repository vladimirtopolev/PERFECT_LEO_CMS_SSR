import * as React from 'react';
import {Header} from '../../schema/models';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import {TableProps} from './table.component';
import Cell from '../cells/cell.component';

import * as styles from './table-renderer-as-table.component.styles.css';
import * as buttonStyles from './tableRenderer-common.component.styles.css';

interface TableRendererProps extends TableProps {
    headerFilters: (header: Header) => boolean,
    toggleModal: (state: boolean) => void,
    changeDeletedRowId: (id: string) => void
}

export default ({
                    headers,
                    rows,
                    headerFilters,
                    locale,
                    domainPath,
                    tableMeta,
                    toggleModal,
                    changeDeletedRowId,
                    options
                }: TableRendererProps) => {
    console.log(tableMeta)
    return (
        <table className={styles.Table}>
            <thead>
            <tr>
                <th/>
                {headers
                    .filter(headerFilters)
                    .map(header => <th key={header._id}>{header.name}</th>)}
                <th className={styles.Table__actionColumn}/>
            </tr>
            </thead>
            <tbody>
            {rows.map(row => {
                return (
                    <tr key={row._id}>
                        <td>{row._id}</td>
                        {headers
                            .filter(headerFilters)
                            .map(header => {
                                const cell = row.cells.find(c => c.header._id === header._id);
                                return (<td key={header._id}>
                                    <Cell cell={cell}
                                          defaultLocale={options.defaultLocale}
                                          locale={locale}
                                          notLocalized={header.notLocalized}
                                          isTableValue={true}/>
                                </td>);
                            })}
                        <td>
                            <Link
                                className={cn(buttonStyles.iconButton, buttonStyles.iconButton_edit)}
                                to={`${domainPath}/${tableMeta.name}/rows/${locale.key}/${row._id}`}>
                            </Link>
                            <button
                                className={cn(buttonStyles.iconButton, buttonStyles.iconButton_warning, buttonStyles.iconButton_delete)}
                                onClick={() => {
                                    changeDeletedRowId(row._id);
                                    toggleModal(true);
                                }}>
                            </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
