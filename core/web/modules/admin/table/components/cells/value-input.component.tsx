import * as React from 'react';
import {ValueRenderProps} from './value.component';
import {ChangeEvent} from 'react';
import {getValue} from './helpers/utilities';

const InputValue = ({value, isEditMode, changeValue, locale, notLocalized, defaultLocale}: ValueRenderProps) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeValue(e.target.value, !notLocalized ? locale : undefined);
    };

    const localizedValue = getValue(value, !notLocalized ? locale : undefined);
    return !isEditMode || (notLocalized && defaultLocale.key !== locale.key)
        ? localizedValue
        : <input type="text" value={localizedValue} onChange={onChange} className="input"/>
};

export default InputValue;
