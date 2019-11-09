import * as React from 'react';
import {Locale} from '../../../../../common/types/locale';
import {useState} from 'react';

import TableRendererAsTable from './table-renderer-as-table.component';
import TableRendererAsList from './table-renderer-as-list.component';
import PaginatorRenderer from './table-paginator-renderer.component';
import {Header, HEADER_TYPES, Row, TableMeta} from '../../schema/models';
import DeleteRowModal from './delete-row-modal.component';
import TableToolbar from './table-toolbar.component';
import * as styles from './table.component.styles.css';

export interface TableProps {
    locale: Locale,
    domainPath: string,
    headers: Header[],
    rows: Row[],
    tableMeta: TableMeta,
    deleteRow: (rowId: string) => void,
    hasPaginator?: boolean,
    paginationMeta?: {
        limit: number,
        cursor: number,
        totalCount: number,
        changeLimit: (limit: number) => void
    },
    options: any
}

export default (props: TableProps) => {
    const {headers, rows, tableMeta, locale, domainPath, deleteRow, hasPaginator, paginationMeta} = props;

    const [view, changeView] = useState<string>('table');
    const [isOpen, toggleModal] = useState<boolean>(false);
    const [deletedRowId, changeDeletedRowId] = useState<string>(null);

    const TableRenderer = view === 'table' ? TableRendererAsTable : TableRendererAsList;
    const headerFilters = (header: Header) => header.type !== HEADER_TYPES.IMAGE_GALLERY;

    return (
        <div className={styles.TableManager}>
            <div className={styles.TableManager__toolbar}>
                <TableToolbar
                    view={view}
                    changeView={changeView}
                    domainPath={domainPath}
                    tableMeta={tableMeta}
                    locale={locale}
                    limit={paginationMeta.limit}
                    changeLimit={paginationMeta.changeLimit}
                />
            </div>

            <div className={styles.TableManager__table}>
                <TableRenderer
                    headerFilters={headerFilters}
                    toggleModal={toggleModal}
                    changeDeletedRowId={changeDeletedRowId}
                    {...props}
                />

                {hasPaginator && <PaginatorRenderer baseUrl={`${domainPath}/${tableMeta.name}`}
                                                    locale={locale}
                                                    totalCount={paginationMeta.totalCount}
                                                    limit={paginationMeta.limit}
                                                    cursor={paginationMeta.cursor}/>}
            </div>

            <DeleteRowModal isOpen={isOpen}
                            toggleModal={() => toggleModal(!isOpen)}
                            deleteRow={() => {
                                deleteRow(deletedRowId);
                                toggleModal(false);
                            }}/>
        </div>
    );
}
