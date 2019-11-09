import * as React from 'react';
import * as styles from './Header.component.styles.css';
import cn from 'classnames';
import Headroom from 'react-headroom';
import {SyntheticEvent, useEffect, useState} from 'react';

interface HeaderState {
    isSecondary?: boolean,
    toggleScrollWrapper: (newState?: any) => void
}
export default ({toggleScrollWrapper}:HeaderState) => {
    const [headerState, changeHeaderState] = useState({
        disablePinning: false,
        toggledMenu: false
    });


    const togglePinningHeader = (media: any) => {
        if (!media.matches) {
            //toggleScrollWrapper(true);
        }
        changeHeaderState({
            disablePinning: media.matches,
            toggledMenu: media.matches ? false : headerState.toggledMenu
        });
    };

    const toggleMenu = (e: SyntheticEvent) => {
        e.preventDefault();
        toggleScrollWrapper();
        changeHeaderState({
            ...headerState,
            toggledMenu: !headerState.toggledMenu
        });
    };

    let mediaQueryListener;
    useEffect(() => {
        mediaQueryListener = window.matchMedia("(max-width: 800px)");
        togglePinningHeader(mediaQueryListener);
        mediaQueryListener.addListener(togglePinningHeader);
    }, []);

    return (
        <Headroom pinStart={150}
                  wrapperStyle={{zIndex: 100}}
                  disable={headerState.disablePinning}>
            <div className={cn(styles.Header, {[styles.Header_open]: headerState.toggledMenu})}>
                <div className={cn('container', styles.Header__container)}>
                    <div className={styles.Header__logo}>
                        <img src={require('../../../../sources/classcom.png')}
                             alt='logo'
                             className={styles.Logo}
                        />
                        <div className={styles.Header__toggler}>
                            <button className={styles.Toggler}
                                    onClick={toggleMenu}>
                                <i className="fas fa-bars"/>
                            </button>
                        </div>
                    </div>
                    <div className={cn(styles.Header__hiddenContent)}>
                        <ul className={cn(styles.Header__navigation, styles.Navigation)}>
                            <li className={styles.Navigation__item}>
                                <a href="#" className={styles.Navigation__link}>О Компании</a>
                            </li>
                            <li className={styles.Navigation__item}>
                                <a href="#" className={styles.Navigation__link}>Новости</a>
                            </li>
                            <li className={styles.Navigation__item}>
                                <a href="#" className={styles.Navigation__link}>О Услуги</a>
                            </li>
                        </ul>
                        <div className={styles.Header__contact}>
                            <div className={styles.Contacts}>
                                <div className={styles.Contacts__label}>
                                    <div className={cn(styles.Contacts__icon, 'fa fa-phone')}></div>
                                </div>
                                <div className={styles.Contacts__items}>
                                    <p className={styles.Contacts__item}>+375 29 899 52 70</p>
                                    <p className={styles.Contacts__item}>+375 29 899 52 70</p>
                                    <p className={styles.Contacts__item}>topolev.vladimit@mail.ru</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Headroom>
    );
}
