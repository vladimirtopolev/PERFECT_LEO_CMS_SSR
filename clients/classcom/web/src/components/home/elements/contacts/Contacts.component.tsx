import * as React from 'react';
import * as styles from './Contacts.component.styles.css';
import Title from '../Title.component';

export default () => {
    return (
        <div className={styles.Contacts}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className={styles.ContactsForm}>
                            <Title title={'Оставить заявку'}/>
                            <form>
                                <input type="text" className={styles.ContactsForm__input}
                                       placeholder="Имя"/>
                                <input type="text" className={styles.ContactsForm__input}
                                       placeholder="Номер телефона"/>
                                <input type="text" className={styles.ContactsForm__input}
                                       placeholder="Адрес электронной почты"/>
                                <textarea placeholder="Комментарий"
                                          rows={5}
                                          className={styles.ContactsForm__input}/>
                                <button className={styles.ContactsForm__btn}>Оставить заявку</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={styles.ContactsInfo}>
                            <div className={styles.ContactsInfo__container}>
                                <p className={styles.ContactsInfo__title}>Контакты</p>
                                <div className={styles.ContactsInfo__content}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className={styles.ContactsGroup}>
                                                <div className={styles.ContactsGroup__title}>
                                                    Тел/факс:
                                                </div>
                                                <div className={styles.ContactsGroup__item}>
                                                    +375 29 899 52 70
                                                </div>
                                                <div className={styles.ContactsGroup__item}>
                                                    +375 29 899 52 70
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className={styles.ContactsGroup}>
                                                <div className={styles.ContactsGroup__title}>
                                                    E-mail:
                                                </div>
                                                <div className={styles.ContactsGroup__item}>
                                                    office@classcom.by
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className={styles.ContactsGroup}>
                                                <div className={styles.ContactsGroup__title}>
                                                    Адрес:
                                                </div>
                                                <div className={styles.ContactsGroup__item}>
                                                    г.Минск,
                                                    ул. Шаранговича, 19
                                                </div>
                                                <div className={styles.ContactsGroup__item}>
                                                    офис 211
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
