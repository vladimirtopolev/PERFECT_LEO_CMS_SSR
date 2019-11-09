import isValidEmail from './helpers/emailValidator';
import {Locale} from '../types/locale';

const LOCALE_ERROR_MESSAGES: { [LOCALE_KEY: string]: { [FIELD_NAME: string]: string } } = {
    ru: {
        email: 'Неверный адрес электронной почты',
        required: 'Обязательное поле'
    },
    en: {
        email: 'Invalid email',
        required: 'Required field'
    }
};

type Validator = (value:string) => string;

export const validatorsFactory = (locale?: Locale, defaultLocale?: Locale) => {
    const chosenLocale = locale ? locale.key : defaultLocale.key;


    const composeValidators = (...validators: Validator[]): Validator => {
        return (value: string) => {
            let errorMsg;
            const isNotValid = validators.some((validator) => {
               errorMsg = validator(value);
               return errorMsg !== undefined;
            });
            return isNotValid ? errorMsg: undefined;
        }
    };

    const requiredFieldValidator: Validator = (value: string): string => {
        return (!value || !value.trim())
            ? LOCALE_ERROR_MESSAGES[chosenLocale]['required']
            : undefined;
    };

    const emailFieldValidator: Validator = (value) => {
        return !isValidEmail(value)
            ? LOCALE_ERROR_MESSAGES[chosenLocale]['email']
            : undefined;
    };

    return {
        composeValidators,
        requiredFieldValidator,
        emailFieldValidator,
    };
};
