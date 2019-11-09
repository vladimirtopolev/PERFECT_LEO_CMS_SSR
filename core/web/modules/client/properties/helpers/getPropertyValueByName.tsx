import {Property} from '../../../../modules/admin/properties/schema/models';
import {Locale} from '../../../../common/types/locale';

export default (properties: Property[], propertyName: string, locale?: Locale) => {
    const property = (properties || []).find(prop => prop.internalName === propertyName);
    return property
        ? locale
            ? property.value[locale.key]  || ''
            : property.value || ''
        : '';
}
