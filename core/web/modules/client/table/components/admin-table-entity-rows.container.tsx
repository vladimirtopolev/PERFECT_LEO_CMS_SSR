import * as React from 'react';
import {useAdminTableRows} from '../../../../common/hooks/useAdminTableRows';

export default ({RowsRenderer, tableName}: any) => {
    const rows = useAdminTableRows(tableName);
    return <RowsRenderer rows={rows} tableName={tableName}/>;
};
