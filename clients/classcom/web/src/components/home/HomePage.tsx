import * as React from 'react';
import {useProperties} from '../../../../../../core/web/common/hooks/useProperties';
import getPropertyValueByName
    from '../../../../../../core/web/modules/client/properties/helpers/getPropertyValueByName';
import {Store} from 'redux';
import {getProperties} from '../../../../../../core/web/modules/client/properties/actions/actions';
import {useContext} from 'react';
import {LanguageContext} from '../../../../../../core/web/utilities/localeManager';
import Layout from '../layout/layout.component';

import Slider from './elements/slider/Slider.component';
import Statistics from './elements/statistics/Statistics.component';
import AboutCompany from './elements/aboutCompany/AboutCompany.component';
import News from './elements/news/News.component'
import Feedbacks from './elements/feedbacks/Feedbacks.component';
import Contacts from './elements/contacts/Contacts.component'

const HomePage = () => {
    const properties = useProperties();
    const {locale} = useContext(LanguageContext);

    const company = getPropertyValueByName(properties, 'company', locale);
    return (
        <Layout>
            <>
                <Slider/>
                <Statistics/>
                <News/>
                <Contacts/>
                <Feedbacks/>
                <div style={{height: '100vh'}}></div>
            </>
        </Layout>
    );
};

const loadData = (store: Store) => {
    // @ts-ignore
    return store.dispatch(getProperties());
};

export default {
    component: HomePage,
    loadData
};
