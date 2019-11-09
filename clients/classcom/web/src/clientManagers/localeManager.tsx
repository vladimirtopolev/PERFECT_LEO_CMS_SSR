import {LocaleManager, WithLanguageContextRendererFactory} from '../../../../../core/web/utilities/localeManager';
import dictionary from '../dictionary';
import {LOCALES} from '../config';

export const localManager = new LocaleManager(LOCALES, LOCALES[0], dictionary);
export const WithLanguageContext = WithLanguageContextRendererFactory(localManager);

