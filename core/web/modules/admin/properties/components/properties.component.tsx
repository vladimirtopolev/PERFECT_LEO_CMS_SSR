import * as React from 'react';
import {useEffect, useState, Fragment} from 'react';
import * as _ from 'lodash';
import cn from 'classnames';
import {Property} from '../schema/models';
import {Locale} from '../../../../common/types/locale';
import Value from '../../table/components/cells/value.component';

import * as styles from './properties.component.styles.css';
import {TableModuleOptions} from '../routes';

interface PropertiesProps {
    properties: Property[],
    locale: Locale,
    updateProperties: ( properies: Property[])=> void,
    options: TableModuleOptions
}

interface GroupedProperties {
    [K: string]: Property[]
}

export default ({properties, options, updateProperties, locale}: PropertiesProps) => {
    const [isEditMode, toggleEditMode] = useState(false);
    const [propertiesInMemory, changePropertiesInMemory] = useState<Property[]>(properties);

    useEffect(() => {
        changePropertiesInMemory(properties);
    }, [properties]);

    const createChangeValueEvent = (propertyId: string) => {
        return (value: any, locale?: Locale) => {
            const newProperties =
                propertiesInMemory
                    .map(property => {
                        if (property._id !== propertyId) {
                            return property;
                        }
                        const newValue = locale
                            ? _.isObject(property.value)
                                ? {...property.value, [locale.key]: value}
                                : options.locales.reduce((memo, locale) => ({...memo, [locale.key]: value}), {})
                            : value;
                        return {...property, value: newValue};
                    });
            console.log(newProperties);
            changePropertiesInMemory(newProperties);
        };
    };

    const groupedProperties = propertiesInMemory.reduce<GroupedProperties>((memo: GroupedProperties, property) => {
        const group = property.group || property.name;
        return {...memo, [group]: (memo[group] || []).concat(property)};
    }, {});

    const toolbar =
        <Fragment>
            {!isEditMode && <button className="button" onClick={() => toggleEditMode(true)}>Редактировать</button>}
            {isEditMode &&
            <button className="button" onClick={() => toggleEditMode(false)}>Назад без сохранения</button>}
            {isEditMode &&
            <button className="button" onClick={() => {
                updateProperties(propertiesInMemory);
                toggleEditMode(false);
            }}>Сохранить изменения</button>}
        </Fragment>;

    return (
        <div className={styles.Properties}>
            <div className={styles.Properties__toolbar}>
                {toolbar}
            </div>
            {Object.keys(groupedProperties).map(group => {
                const groupProperties = groupedProperties[group];
                return (
                    <div className={styles.Group} key={group}>
                        {groupProperties.length > 1
                        && <div className={styles.Group__title}>{groupProperties[0].titleGroup}</div>}
                        <div className={styles.Group__content}>
                            {groupProperties.map(property => (
                                <div className={cn(styles.Property, {
                                    [styles.Property_asGroup]: groupProperties.length === 1
                                })} key={property._id}>
                                    <div className={styles.Property__title}>{property.name}</div>
                                    <div className={styles.Property__content}>
                                        <Value type={property.type}
                                               defaultLocale={options.defaultLocale}
                                               value={property.value}
                                               notLocalized={property.notLocalized}
                                               isEditMode={isEditMode}
                                               changeValue={createChangeValueEvent(property._id)}
                                               locale={locale}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
            <div className={styles.Properties__toolbar}>
                {toolbar}
            </div>
        </div>
    );
}
