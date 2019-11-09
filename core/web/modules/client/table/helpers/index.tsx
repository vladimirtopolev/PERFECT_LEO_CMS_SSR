import {Locale, Row} from '../../../admin/table/schema/models';

export const getCellValueByInternalName = (row: Row, internalName: string, locale?: Locale) => {
    if (!row || !row.cells){
        return '';
    }
    const cell = row.cells.find(cell => cell.header.internalName === internalName);
    return locale
        ? cell && cell.value && cell.value[locale.key] || ''
        : cell && cell.value || '';
};
