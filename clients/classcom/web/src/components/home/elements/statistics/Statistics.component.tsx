import * as React from 'React';
import * as styles from './Statistics.component.styles.css';
import {useRef} from 'react';
import StatisticItem from './StatisticItem.component';

export default () => {
    const statistics = [
        {
            measure: '17 лет',
            description: 'на рынке'
        },
        {
            measure: '100+',
            description: 'реализованных проектов'
        },
        {
            measure: '5 лет',
            description: 'средний стаж инженеров'
        },
        {
            measure: '3 дня',
            description: 'в среднем на релизацию проекта'
        }
    ];

    const containerLinks = Array.from({length: 4})
        .map(i => useRef<HTMLDivElement>());

    return (
        <div className={styles.Statistics}>
            <div className="container">
                <div className="row">
                    {statistics.map(stat => {
                        return (
                            <div className="col-md-6 col-lg-3">
                                <StatisticItem {...stat}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
