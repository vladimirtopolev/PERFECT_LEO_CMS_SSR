import * as React from 'react';
import Spinner from '../elements/spinner.component';

interface WithSpinnerRenderPropsComponentProps {
    isLoading: boolean,
    children: () => JSX.Element
}

export default ({isLoading, children}: WithSpinnerRenderPropsComponentProps) =>
    isLoading
        ? <Spinner/>
        : children();

