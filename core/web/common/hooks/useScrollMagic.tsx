import * as React from 'react';
import {useEffect} from 'react';
import {TweenMax, TimelineMax} from "gsap";

let controller: any;
let ScrollMagic: any;

if (typeof window !== `undefined`) {
    ScrollMagic = require("scrollmagic");
    const {ScrollMagicPluginGsap} = require("scrollmagic-plugin-gsap");
    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
    controller = new ScrollMagic.Controller();
}

export function useScrollMagic(ctreateScene: () => any) {
    useEffect(() => {
        if (controller) {
            console.log('useEffecr scroll')
            const scene = ctreateScene();
            controller.addScene(scene);
            return () => {
                controller.removeScene(scene);
            };
        }
    }, []);
}

export {ScrollMagic, controller};

