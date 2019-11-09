import * as React from 'react';
import {useState, createContext} from 'react';
import {Locale} from '../common/types/locale';
import LocalizedStringsFactory, {LocalizedStrings} from 'react-localization';

export interface Dictionary {
    [locale: string]: { [k: string]: string }
}



export class LocaleManager {
    constructor(
        public supportedLocales: Locale[],
        public defaultLocale: Locale,
        public dictionary: Dictionary) {
    }
}

export interface WithLanguageContextRenderProps {
    children: JSX.Element
}

export interface LanguageContextState {
    locale: Locale,
    changeLocale: (locale: Locale) => void,
    dictionary: LocalizedStrings<any>;
}

export const LanguageContext = createContext<LanguageContextState>(undefined);

export function WithLanguageContextRendererFactory(localeManager: LocaleManager) {
    const dictionaryInstance = new LocalizedStringsFactory(localeManager.dictionary);

    return ({children}: WithLanguageContextRenderProps) => {
        const [locale, changeLocale] = useState<Locale>(localeManager.defaultLocale);
        return (
            <LanguageContext.Provider value={{
                locale,
                changeLocale: (locale: Locale) => {
                    dictionaryInstance.setLanguage(locale.key);
                    changeLocale(locale);
                },
                dictionary: dictionaryInstance
            }}>
                {children}
            </LanguageContext.Provider>
        );
    };
}




