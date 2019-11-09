import * as React from 'react';
import * as styles from './Feedbacks.component.styles.css';
import Title from '../Title.component';
import {useEffect, useRef} from 'react';
import {ScrollMagic, controller} from '../../../../../../../../core/web/common/hooks/useScrollMagic';
import {TimelineMax} from 'gsap';

export default () => {

    const feedbacks = [
        {
            title: 'ОАО «Газпром», Мозырское подземное хранилище газа sdf fsdf',
            text: `
            <p>Исполнитель выполняет работы, используя новейшие технологии, эффективные и надежные методы. Сотрудничество между НП ООО «КлассКом» и Мозырским подземным хранилищем газа протекает плодотворно. Все работы выполняются в соответствии с современными технологическими требованиями и проводятся должным образом.</p>
            <p>На основании изложенного, мы подтверждаем, что НП ООО «КлассКом» является надежным и заслуживающем доверия партнёром, который способен качественно выполнять работы в области проектирования, монтажа и технического обслуживания средств и систем обеспечения охранной и пожарной безопасности.</p>
             `
        },
        {
            title: 'Министерство финансов Республики Беларусь',
            text: `
            <p>Компанией НПООО «Класском» начиная с 2002 г. выполнялись и выполняются работы по установке систем охранно-пожарной безопасно¬сти на объектах МФ Республики Беларусь.</p>
            <p>Все объекты смонтированы качественно и сданы в срок в эксплуата¬цию районному отделу «Охрана». Как показало сотрудничество в данной области с компанией НПООО «Класском», предприятие обладает большим научно- техническим потенциалом, имеет в штате большой набор специалистов профессионалов и может смонтировать систему безопасности любой сложности.</p>
            <p>Учитывая возможности компании, ее надежность мы продолжаем вести работы по сотрудничеству в этом направлении.</p>
            `
        }
    ];
    return (
        <div className={styles.Feedbacks}>
            <div className="container">
                <Title title={'Отзывы'} color={'#ffffff'}/>
                <div className="row">
                    {feedbacks.map((feedback, i) => {
                        return (
                            <div className="col-md-6" key={i}>
                                <Feedback {...feedback} index={i}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

const Feedback = ({title, text, index}: { title: string, text: string, index: number }) => {

    const containerRef = useRef();

    useEffect(() => {

        const tl = (new TimelineMax({paused: true}))
            .fromTo(containerRef.current, 1, {
                x: index===0 ? '-100%' : '100%',
                opacity: 0
            }, {
                x: '0%',
                opacity: 1
            });

        const scene = (new ScrollMagic.Scene({
            triggerElement: containerRef.current,
            triggerHook: 1
        }))
            .addTo(controller);

        scene.on('enter', () => {
            tl.play();
        });

        scene.on('leave', () => {
            tl.reverse();
        });
    }, []);

    return (
        <div className={styles.Feedback} ref={containerRef} style={{position: 'relative'}}>
            <p className={styles.Feedback__title}>{title}</p>
            <div className={styles.Feedback__text}
                 dangerouslySetInnerHTML={{__html: text}}/>
        </div>
    );
};
