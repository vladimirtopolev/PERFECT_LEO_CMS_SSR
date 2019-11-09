import * as React from 'react';
import * as styles from './spinner.component.styles.css';
import cn from 'classnames';

interface SpinnerProps {
    className?: string
}
export default ({className}:SpinnerProps) => (
    <div className={cn(className || '',styles.Spinner)}>
        <div className={styles.Spinner__spinner}/>
    </div>
)
