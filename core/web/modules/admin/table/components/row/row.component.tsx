import * as React from 'react';
import * as _ from 'lodash';
import {useState, useEffect, Fragment} from 'react';
import {Locale} from '../../../../../common/types/locale';
import {Header, Row, TableMeta} from '../../schema/models';

import * as styles from './row.component.styles.css';
import Cell from '../cells/cell.component';

export interface RowProps {
    headers: Header[],
    row: Row,
    goBack: () => void,
    saveOrUpdateTableRow: (row: Row) => void,
    options?: any,
    locale: Locale
}

const getRow = (headers: Header[], row: Row): Row => {
    return row || {
        _id: undefined,
        cells: headers
            ? headers.map(header => ({
                _id: undefined,
                header,
                value: ''
            }))
            : []
    };
};

export default ({row, headers, goBack, options, locale, saveOrUpdateTableRow}: RowProps) => {
    const [isEditMode, changeEditMode] = useState<boolean>(false);
    const [rowInMemory, changeRowInMemory] = useState<Row>(getRow(headers, row));

    useEffect(() => {
        changeRowInMemory(getRow(headers, row));
    }, [headers, row]);

    const changeCell = (headerId: string, value: any, locale?: Locale) => {
        changeRowInMemory({
            ...row,
            cells: rowInMemory.cells.map(cell => {
                if (cell.header._id !== headerId) {
                    return cell;
                }
                const newValue = locale
                    ? _.isObject(cell.value)
                        ? {...cell.value, [locale.key]: value}
                        : options.locales.reduce((memo:any, locale: Locale) => ({...memo, [locale.key]: value}), {})
                    : value;
                return {...cell, value: newValue};
            })
        });
    };

    const saveRow = () => {
        saveOrUpdateTableRow(rowInMemory);
        goBack();
    };

    return (
        <div className={styles.Row}>
            {isEditMode
                ? <button className={styles.Row__backBtn}
                          onClick={() => changeEditMode(false)}>
                    К режиму просмотра
                </button>
                : <button className={styles.Row__backBtn}
                          onClick={goBack}>
                    Назад без сохранения
                </button>
            }
            <div className={styles.Row__container}>
                {headers.map(header => {
                    const cell = rowInMemory && rowInMemory.cells.find(c => c.header._id === header._id);
                    return (
                        <div key={header._id}
                             className={styles.Cell}>
                            <div className={styles.Cell__title}>{header.name}</div>
                            <div className={styles.Cell__value}>
                                {cell &&
                                <Cell cell={cell}
                                      defaultLocale={options.defaultLocale}
                                      isEditMode={isEditMode}
                                      changeCell={changeCell}
                                      notLocalized={header.notLocalized}
                                      locale={locale}/>}
                            </div>
                        </div>
                    );
                })}
                <div className={styles.Row__toolbar}>
                    {isEditMode
                        ? <button onClick={saveRow}
                                  className="button">
                            Сохранить
                        </button>
                        :
                        <Fragment>
                            <button onClick={() => changeEditMode(!isEditMode)}
                                    className="button">
                                В режим редактирования
                            </button>
                            <button onClick={saveRow}
                                    className="button">
                                Сохранить
                            </button>
                        </Fragment>
                    }
                </div>
            </div>

        </div>
    );
}
