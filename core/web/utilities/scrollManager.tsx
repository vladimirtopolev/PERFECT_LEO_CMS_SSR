type ScrollEvent = (number: number, ev: Event)=> void;

class Scroll {
    events: ScrollEvent[];
    breakpointsIn: any;
    breakpointsOut: any;

    constructor() {
        this.events = [];
        this.breakpointsIn = [];
        this.breakpointsOut = [];
        if (typeof window !== 'undefined'){
            window.addEventListener('scroll', this.handleScroll.bind(this));
        }

    }

     addEvent(event:ScrollEvent) {
        this.events.push(event);
    }

    /*
    addBreakPointIn(top, event) {
        this.breakpointsIn.push({
            top,
            event
        });
    }

    deleteBreakPointIn(event) {
        this.breakpointsIn = this.breakpointsIn.filter(breakpoint => breakpoint.event !== event);
    }

    addBreakPointOut(top, event) {
        this.breakpointsOut.push({
            top,
            event
        });
    }
*/
    handleScroll(ev: Event) {
        const doc = document.documentElement;
        const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        this.events.forEach(event => event(top, ev));
    }
}

export default new Scroll();
