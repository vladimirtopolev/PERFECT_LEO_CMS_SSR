import * as React from 'react';
import {Link} from 'react-router-dom';
import concatQueryParamsToUrl from '../../../../../utilities/concatQueryParamsToUrl';
import {Locale} from '../../../../../common/types/locale';
import * as styles from './table-paginator-renderer.component.styles.css';
import cn from 'classnames';

type TablePaginatorRendererProps = {
    baseUrl: string,
    locale: Locale,
    limit: number,
    cursor: number,
    totalCount: number,
    maxPagesToSee?: number
}

export default (props: TablePaginatorRendererProps) => {
    const {limit, cursor, totalCount, baseUrl, locale} = props;

    const totalPages = limit !== 0 ? Math.ceil(totalCount / limit) : 0;
    return (
        <div className={styles.Paginator}>
            <ul className={styles.Paginator__container}>
                {Array.from({length: totalPages})
                    .map((v, i) => (
                        <li className={styles.Paginator__item}>
                            <Link
                                to={concatQueryParamsToUrl(baseUrl, {
                                    limit,
                                    cursor: i * limit,
                                    locale: locale.key
                                })}
                                className={cn(styles.Paginator__link, {
                                    [styles.Paginator__link_active] : cursor*limit === i
                                })}
                            >{i + 1}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
