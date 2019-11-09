import * as React from 'react';
import {useProperties} from '../../../../../../core/web/common/hooks/useProperties';
import getPropertyValueByName
    from '../../../../../../core/web/modules/client/properties/helpers/getPropertyValueByName';
import {Store} from 'redux';
import {getProperties} from '../../../../../../core/web/modules/client/properties/actions/actions';
import {useContext} from 'react';
import {LanguageContext} from '../../../../../../core/web/utilities/localeManager';

const HomePage = () => {
    const properties = useProperties();
    const {locale} = useContext(LanguageContext);

    const company = getPropertyValueByName(properties, 'company', locale);
    return (
        <div>
            <div>{company}</div>
            <button onClick={() => console.log('HSJKD')}>Button</button>
        </div>);
};

const loadData = (store: Store) => {
    // @ts-ignore
    return store.dispatch(getProperties())
};

export default {
    component: HomePage,
    loadData
};
