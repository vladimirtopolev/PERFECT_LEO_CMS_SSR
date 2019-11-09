import * as React from 'react';
import * as styles from './NewItem.component.styles.css';
import {useEffect, useRef} from 'react';
import {ScrollMagic, controller} from '../../../../../../../../core/web/common/hooks/useScrollMagic';
import {TimelineMax} from 'gsap';

export default ({image, title, date}: { image: any, title: string, date: string }) => {
    const containerRef = useRef();

    useEffect(() => {

        const tl = (new TimelineMax({paused: true}))
            .fromTo(containerRef.current, 1, {y: '100%', opacity: 0}, {y: '0%', opacity: 1});

       const scene =  new ScrollMagic.Scene({
            triggerElement: containerRef.current,
            triggerHook: 1
        })
            .addTo(controller);

       scene.on('enter', () => {
           tl.play()
       });

       scene.on('leave', () => {
           tl.reverse();
       })
    });

    return (
        <div className={styles.New} ref={containerRef}>
            <div className={styles.New__imgContainer}>
                <img src={image} className={styles.New__img}/>
            </div>
            <div className={styles.New__description}>
                <a href="" className={styles.New__title}>{title}</a>
                <div className={styles.New__date}>
                    {date}
                </div>

            </div>
        </div>
    );
}
