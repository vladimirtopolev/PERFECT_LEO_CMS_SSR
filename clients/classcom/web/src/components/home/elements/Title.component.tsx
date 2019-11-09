import * as React from 'react';
import {useEffect, useRef} from 'react';
import {ScrollMagic, controller} from '../../../../../../../core/web/common/hooks/useScrollMagic';
import * as styles from './Title.component.styles.css';
import {TimelineMax} from 'gsap';

export default ({title, color = 'rgb(33, 37, 41)'}: { title: string , color? :string}) => {
    const containerRef = useRef();
    const lineRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        const tl = (new TimelineMax({paused: true}))
            .fromTo(lineRef.current, 0.5, {y: '100%'}, {y: '0%'})
            .fromTo(textRef.current, 1, {x: '-100%'}, {x: '0%'}, '-=0.5');


        const scene = (new ScrollMagic.Scene({
            triggerElement: containerRef.current,
            triggerHook: 0.8,
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
        <div className={styles.Title} ref={containerRef}>
            <div className={styles.Title__line} ref={lineRef}/>
            <div className={styles.Title__text} ref={textRef} style={{color}}>
                {title}
            </div>
        </div>
    );
}
