import * as React from 'react';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import LocaleTabsRenderer from '../../../../common/elements/locale-tabs-renderer.component';
import * as actions from '../store/actions/actions';
import * as selectors from '../store/reducers';
import {Property} from '../schema/models';
import Properties from './properties.component';

export default (props: any) => {
    const dispatch = useDispatch();

    const properties = useSelector(selectors.getProperties);
    const updateProperties = (properties: Property[]) => dispatch(actions.updateProperties(properties));
    useEffect(() => {
        dispatch(actions.getProperties())
    }, []);

    return <LocaleTabsRenderer
        locales={props.options.locales}
        renderLocaleTab={locale =>
            <Properties properties={properties}
                        locale={locale}
                        updateProperties={updateProperties}
                        {...props}
            />}/>;
}
