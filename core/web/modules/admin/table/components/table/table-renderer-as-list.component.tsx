import * as React from 'react';
import {Header} from '../../schema/models';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import {TableProps} from './table.component';
import Cell from '../cells/cell.component';

import * as styles from './table-renderer-as-list.component.styles.css';
import * as buttonStyles from './tableRenderer-common.component.styles.css';

interface TableRendererProps extends TableProps {
    headerFilters: (header: Header) => boolean,
    toggleModal: (state: boolean) => void,
    changeDeletedRowId: (id: string) => void
}

export default ({rows, headers, headerFilters, locale, domainPath, tableMeta, changeDeletedRowId, toggleModal, options}: TableRendererProps) => {
    return (
        <div className={styles.List}>
            {rows.map(row => {
                return (
                    <div className={styles.Item}>
                        {headers
                            .filter(headerFilters)
                            .map(header => {
                                const cell = row.cells.find(c => c.header._id === header._id);
                                return (
                                    <div className={styles.Item__row}>
                                        <div className={styles.Item__cellName}>
                                            {header.name}</div>
                                        <div className={styles.Item__cellValue}>
                                            <Cell cell={cell}
                                                  locale={locale}
                                                  defaultLocale={options.defaultLocale}
                                                  notLocalized={header.notLocalized}
                                                  isTableValue={true}/>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <div className={styles.Item__toolbar}>
                            <Link
                                className={cn(buttonStyles.iconButton, buttonStyles.iconButton_edit)}
                                to={`${domainPath}/${tableMeta.name}/rows/${locale.key}/${row._id}`}/>
                            <button
                                className={cn(buttonStyles.iconButton, buttonStyles.iconButton_warning, buttonStyles.iconButton_delete)}
                                onClick={() => {
                                    changeDeletedRowId(row._id);
                                    toggleModal(true);
                                }}>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
