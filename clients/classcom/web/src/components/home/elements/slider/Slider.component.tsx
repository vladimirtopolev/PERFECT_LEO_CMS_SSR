import * as React from 'react';
import * as styles from './Slider.component.styles.css';
import Slider, {Settings} from 'react-slick';
import {useEffect, useRef, useState} from 'react';
import {TimelineMax} from 'gsap';
import cn from 'classnames';
import {ScrollMagic, controller} from '../../../../../../../../core/web/common/hooks/useScrollMagic';

const sliderArrowRenderer = ({isNext}: { isNext: boolean }) => {
    return (props: any) => (
        <div className={cn(styles.Slider__button, {
            [styles.Slider__next]: isNext,
            [styles.Slider__prev]: !isNext
        })}
             onClick={props.onClick}>
            <i className={cn('fas', {
                'fa-chevron-right': isNext,
                'fa-chevron-left': !isNext
            })}/>
        </div>
    );
};

const NextArrow = sliderArrowRenderer({isNext: true});
const PrevArrow = sliderArrowRenderer({isNext: false});

var settings: Settings = {
    dots: false,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: styles.Slider__container
};

const Slide = ({slide, isActive, i}: { slide: { text: string, background: string }, isActive: boolean, i: number }) => {
    const containerRef = useRef();
    const textContainerRef = useRef();
    const lineRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        if (isActive) {
            (new TimelineMax())
                .fromTo(textContainerRef.current, 1, {left: 100, opacity: 0}, {left: 0, opacity: 1}, 0)
                .fromTo(lineRef.current, 1, {top: '-100%', opacity: 0}, {top: 0, opacity: 1})
                .fromTo(textRef.current, 1, {top: '100%', opacity: 0}, {top: 0, opacity: 1}, 0);
        }
    }, [isActive]);


    return (
        <div className={styles.Slide}
             style={{backgroundImage: slide.background}}>
            <div className="container" ref={containerRef}>
                <div className={styles.Slide__textContainer} ref={textContainerRef}>
                    <div className={styles.Slide__line} ref={lineRef}></div>
                    <div className={styles.Slide__text} ref={textRef}>
                        {slide.text}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default () => {
    const patchcordRef = useRef();
    const containerRef = useRef();

    useEffect(() => {
        var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

        const tl = (new TimelineMax())
            .fromTo(patchcordRef.current, 1, {y: '0%'}, {y: `50%`});

        new ScrollMagic.Scene({ triggerHook: 0, duration: '100%'})
            .setTween(tl)
            .addTo(controller);

    });

    const [activeSlide, changeActiveSlide] = useState<number>(null);

    const slides = [
        {
            background: `url(${require('../../../../../sources/slide01.jpg')})`,
            text: 'Обслуживание противопожарной автоматики'
        },
        {
            background: `url(${require('../../../../../sources/slide02.jpg')})`,
            text: 'Обслуживание противопожарной автоматики'
        }
    ];


    return (
        <div className={styles.Slider} ref={containerRef}>
            <Slider {...settings}
                    onInit={() => {
                        changeActiveSlide(0);
                    }}
                    beforeChange={(oldIndex, newIndex) => {
                        changeActiveSlide(newIndex);
                    }}>
                {slides.map((slide, i) => {
                    return (
                        <div key={i}>
                            <Slide slide={slides[i]} isActive={i === activeSlide} i={i}/>
                        </div>
                    );
                })}
            </Slider>

            <div className={styles.Patchcord} ref={patchcordRef}>
                <img alt='patchcord' src={require('../../../../../sources/patchcord.png')}/>
            </div>
        </div>
    );
}


