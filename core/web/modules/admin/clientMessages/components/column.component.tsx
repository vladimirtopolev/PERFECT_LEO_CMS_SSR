import * as React from 'react';
import {Status} from './messageDashboard.container';

interface ColumnProps {
    status: Status,
    tasks: []
}
export default ({status, tasks}:ColumnProps) => {
    return (
        <div className="col">
            {status.label}
        </div>
    );
}
