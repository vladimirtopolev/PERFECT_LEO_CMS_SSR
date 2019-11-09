import * as React from 'react';
import * as styles from './StatisticItem.component.styles.css';
import {useEffect, useRef} from 'react';
import {ScrollMagic, controller} from '../../../../../../../../core/web/common/hooks/useScrollMagic';
import {TimelineMax} from 'gsap';


export default ({measure, description}: { measure: string, description: string }) => {

    const containerRef = useRef();
    const lineRef = useRef();
    const measureRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
        const timeline = (new TimelineMax({ paused:true }))
            .fromTo(lineRef.current, 0.5, {left: '100%', opacity: 0}, {left: 0, opacity: 1}, 0)
            .fromTo(measureRef.current, 1, {left: '-100%', opacity: 0}, {left: 0, opacity: 1})
            .fromTo(descriptionRef.current, 1, {left: '-100%', opacity: 0}, {left: 0, opacity: 1}, '-=1');

        const scene = (new ScrollMagic.Scene({
            triggerElement: containerRef.current,
            triggerHook: 0.8,
            duration: '100%'
        }))
            .addTo(controller);


        scene.on('enter', () => {
            console.log('start')
            timeline.play();
        });

        scene.on('leave', () => {
            console.log('end')
            timeline.reverse();
        });

    }, []);

    return (
        <div className={styles.StatisticItem} ref={containerRef}>
            <div className={styles.StatisticItem__container}>
                <div className={styles.StatisticItem__line} ref={lineRef}></div>
                <p className={styles.StatisticItem__measure} ref={measureRef}>{measure}</p>
                <p className={styles.StatisticItem__description} ref={descriptionRef}>{description}</p>
            </div>
        </div>
    );
}
