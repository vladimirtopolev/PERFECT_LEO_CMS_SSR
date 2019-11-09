import * as React from 'react';
import * as styles from './News.component.styles.css';
import {useEffect, useRef} from 'react';
import {controller, ScrollMagic} from '../../../../../../../../core/web/common/hooks/useScrollMagic';
import {TimelineMax} from 'gsap';
import NewItem from './NewItem.component';
import Title from '../Title.component';

export default () => {
    const containerRef = useRef();
    const containerBgRef = useRef();

    useEffect(() => {

        const tl = (new TimelineMax())
            .fromTo(containerBgRef.current, 1, {y: '-100%'}, {y: '0%'});

        new ScrollMagic.Scene({
            triggerElement: containerRef.current,
            triggerHook: 1,
            duration: `200%`
        })
            .setTween(tl)
            .addTo(controller);
    }, []);

    const news = [
        {
            image: require('../../../../../sources/new01.jpg'),
            title: 'Выставка-форум "Инженерно-техническая безопасность"',
            date: '12 марта 2018'
        },
        {
            image: require('../../../../../sources/new01.jpg'),
            title: 'С Новым Годом!',
            date: '12 марта 2018'
        },
        {
            image: require('../../../../../sources/new01.jpg'),
            title: 'Выставка-форум "Инженерно-техническая безопасность"',
            date: '12 марта 2018'
        }
    ];


    return (
        <div className={styles.News} ref={containerRef}>
            <div className={styles.News__bg} ref={containerBgRef}></div>
            <div className={styles.News__container}>
                <div className="container">
                    <Title title={'Новости'}/>
                    <div className="row">
                        {news.map((newItem , i)=> {
                            return (
                                <div className="col-md-4" key={i} style={{paddingBottom: '20px'}}>
                                    <NewItem {...newItem}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
