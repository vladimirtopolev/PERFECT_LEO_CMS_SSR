import * as React from 'react';
import InputValue from './value-input.component';
import SingleImageCell from './value-single-image.component';
import TextareaValue from './value-textarea.component';
import DateValue from './value-date.component';
import {Locale} from '../../schema/models';

export interface ValueRenderProps {
    value: any,
    isEditMode?: boolean,
    changeValue?: (value: any, locale?: Locale) => void,
    locale: Locale,
    defaultLocale:Locale,
    properties?: any,
    notLocalized?: boolean,
    isTableValue?:boolean
}
export interface ValueProps extends ValueRenderProps{
    type: string
}

export default ({type, ...rest}: ValueProps) => {
    switch (type) {
        case 'DATE':
            return <DateValue {...rest}/>;
        case 'INPUT':
            return <InputValue  {...rest}/>;
        case 'IMAGE':
            return <SingleImageCell {...rest} isSingleImage={true}/>;
        case 'TEXTAREA':
            return <TextareaValue {...rest}/>;
        case 'IMAGE_GALLERY':
            return <SingleImageCell {...rest}/>
        default:
            throw Error(`Invalid header type ${type}`);
    }
}
