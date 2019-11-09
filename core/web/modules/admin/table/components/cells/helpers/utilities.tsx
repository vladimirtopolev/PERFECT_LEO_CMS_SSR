import * as _ from 'lodash';
import {Locale} from '../../../schema/models';

export const getValue = (value: any, locale?: Locale, defaultLocale?: Locale) => {
    return !locale
        ? value || ''
        // @ts-ignore
        : _.isObject(value) ? value[locale.key] || value[defaultLocale.key] || '' : value || ''
};

export const getValueAsArray = (value: any, locale: Locale, defaultLocale?: Locale) => {
    return !locale
        ? value || []
        // @ts-ignore
        : _.isObject(value) ? value[locale.key] || value[defaultLocale.key] || [] : value || []
};

