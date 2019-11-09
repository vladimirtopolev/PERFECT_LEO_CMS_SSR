import * as React from 'react';
import Column from './column.component';
import {useEffect, useState} from 'react';
import * as api from '../service/api';

export enum TaskStateEnum {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}

export interface Status {
    key: TaskStateEnum,
    label: string
}

const STATUS_MAP: Status[] = [
    {
        key: TaskStateEnum.TODO,
        label: 'Обработать'
    },
    {
        key: TaskStateEnum.IN_PROGRESS,
        label: 'В прогрессе'
    },
    {
        key: TaskStateEnum.COMPLETED,
        label: 'Выполнены'
    }
];

export default () => {
    const [messages, changeMessages] = useState([]);

    useEffect(() => {
        api.getClientMessages()
            .then(res => {
                console.log(res);
            });
    }, []);

    return (
        <div className="row">
            {STATUS_MAP.map(status => <Column status={status} tasks={[]} key={status.key}/>)}
        </div>
    );
}
