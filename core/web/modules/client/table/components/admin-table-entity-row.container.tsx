import * as React from 'react';
import useReactRouter from 'use-react-router';

import {useAdminTableRow} from '../../../../common/hooks/useAdminTableRow';

interface RouteParams {
    tableEntityRowId: string,
}

interface TableContainerProps {
    RowRenderer: any,
    tableName: string,
}

export default ({RowRenderer, tableName}: TableContainerProps) => {
    const {match} = useReactRouter<RouteParams>();
    const rowId = match.params.tableEntityRowId;

    const row = useAdminTableRow(tableName, rowId);

    return <RowRenderer row={row} tableName={tableName}/>
};

