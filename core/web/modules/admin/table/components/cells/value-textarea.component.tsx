import * as React from 'react';
import {ValueRenderProps} from './value.component';
import Editor from '../../../../../common/elements/editor.component';
import {getValue} from './helpers/utilities';

const TeaxtareaValue = ({value, isEditMode, changeValue, locale}: ValueRenderProps) => {
    const localizedValue = getValue(value, locale);
    return isEditMode
        ? <Editor value={localizedValue} onChange={(value => changeValue(value, locale))}/>
        : <div dangerouslySetInnerHTML={{__html: localizedValue}}/>;
};

export default TeaxtareaValue;
