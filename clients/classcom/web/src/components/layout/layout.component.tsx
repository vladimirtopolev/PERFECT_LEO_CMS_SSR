import * as React from 'react';
import Header from './elements/header.component';
import {Fragment} from 'react';
import {useState} from 'react';

import './layout.component.css';
import {useProperties} from '../../../../../../core/web/common/hooks/useProperties';

interface LayoutProps {
    children: JSX.Element
}

export default ({children}: LayoutProps) => {
    const [scrollWrapper, changeScrollWrapper] = useState(true);
    const toggleScrollWrapper = (newState?: any) => {
        console.log('jkhsajdhas')
        changeScrollWrapper(newState === undefined ? !scrollWrapper : newState);
    };

    return (
        <Fragment>
            <Header toggleScrollWrapper={toggleScrollWrapper}/>
            <div className="wrapper" style={{overflowY: scrollWrapper ? 'visible' : 'hidden'}}>
                <div className="content">
                    {children}
                </div>
            </div>
        </Fragment>
    );
};
