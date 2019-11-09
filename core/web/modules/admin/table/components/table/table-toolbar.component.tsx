import * as React from 'react';
import * as styles from './table.component.styles.css';
import * as toolbarStyles from './table-toolbar.component.styles.css';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import {Locale, TableMeta} from '../../schema/models';
import {ChangeEvent} from 'react';

interface TableToolProps {
    view: string,
    changeView: (view: string) => void,
    domainPath: string,
    tableMeta: TableMeta,
    locale: Locale,
    limit: number,
    changeLimit: (limit: number) => void
}

const ITEMS_PER_PAGE = [1, 5, 10, 25, 50, 100];

export default ({view, changeView, domainPath, tableMeta, locale, limit, changeLimit}: TableToolProps) => {
    const handled = limit && -1;
    return (
        <div className={toolbarStyles.TableToolbar}>
            <Link to={`${domainPath}/${tableMeta.name}/rows/${locale.key}/new`}
                  className={styles.button}>
                Добавить запись
            </Link>
            <div className={styles.buttonGroup}>
                <button onClick={() => changeView('table')}
                        className={cn(styles.buttonGroup__button,
                            {[styles.buttonGroup__button_active]: view === 'table'})}>
                    <i className="fas fa-table"/>
                </button>
                <button onClick={() => changeView('list')}
                        className={cn(styles.buttonGroup__button,
                            {[styles.buttonGroup__button_active]: view !== 'table'})}>
                    <i className="fas fa-bars"/>
                </button>
            </div>
            <div className={toolbarStyles.SelectorItemsPerPage}>
                Показать
                <select className={toolbarStyles.SelectorItemsPerPage__selector}
                        value={limit}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            changeLimit(+e.target.value);
                        }}>
                    {ITEMS_PER_PAGE.map((val, i) => (
                        <option key={i} value={val}>{val === -1 ? `Не ограничено` : val}</option>
                    ))}
                </select>
                записей
            </div>
        </div>
    );
}
