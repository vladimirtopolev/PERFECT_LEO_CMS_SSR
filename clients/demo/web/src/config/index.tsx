import {Locale} from '../../../../../core/web/common/types/locale';
import {NavbarLink} from '../../../../../core/web/common/types/navbarLink';

export const LOCALES: Locale[] = [
    {
        key: 'ru',
        lang: 'ru_RU',
        name: 'RU',
        title: 'Русский'
    },
    {
        key: 'en',
        lang: 'en_US',
        name: 'EN',
        title: 'Английский'
    }
];

export const ADMIN_NAVIGATION_LINKS: NavbarLink[] = [
    {
        iconClassName: 'fas fa-info-circle link__icon',
        title: 'Общая информация',
        href: '/admin/properties/dashboard'
    },
    {
        iconClassName: 'fas fa-tools link__icon',
        title: 'Оборудование',
        href: '#',
        links: [
            {
                iconClassName: 'fa fa-table link__icon',
                title: 'Строительство стендов',
                href: `/admin/tables/buildingStands`
            },
            {
                iconClassName: 'fa fa-table link__icon',
                title: 'Наполнение стендов',
                href: `/admin/tables/fullingStands`
            },
            {
                iconClassName: 'fa fa-table link__icon',
                title: 'Оформление стендов',
                href: `/admin/tables/fullingStands`
            },
            {
                iconClassName: 'fa fa-table link__icon',
                title: 'Энергоснабжение, освещение',
                href: `/admin/tables/fullingStands`
            },
            {
                iconClassName: 'fa fa-table link__icon',
                title: 'Презентации, семинары',
                href: `/admin/tables/fullingStands`
            }
        ]
    },
    {
        iconClassName: 'fa fa-table link__icon',
        title: 'Таблицы',
        href: '#',
        links: [
            {
                iconClassName: 'fa fa-table link__icon',
                title: 'Новости',
                href: `/admin/tables/news`
            },
            {
                iconClassName: 'fa fa-table link__icon',
                title: 'Партнеры',
                href: `/admin/tables/partners`
            }
        ]
    },
    {
        iconClassName: 'fas fa-phone link__icon',
        title: 'Заказанные звонки',
        href: '#',
        links: [
            {
                iconClassName: 'fa fa-table link__icon',
                title: 'Панель управления',
                href: `/admin/orderCalls/dashboard`
            },
            {
                iconClassName: 'fa fa-table link__icon',
                title: 'Заархивированные звонки',
                href: `/admin/orderCalls`
            }
        ]
    }
    /*
    {
        iconClassName: 'fas fa-chart-pie link__icon',
        title: 'Аналитика',
        href: '/admin/analitics'
    },*/
];

export interface ClientNavbarLink {
    title: string,
    href: string
}

export const CLIENT_NAVIGATION_LINKS: ClientNavbarLink[] = [
    {
        title: 'stands',
        href: '/portfolio'
    },
    {
        title: 'equipments',
        href: '/equipments/buildingStands'
    },
    {
        title: 'news',
        href: '/news'
    },
    {
        title: 'contacts',
        href: '/contact'
    }
];



