import {round} from "../helpers/integer";
import type {IEasing, IEasingEmitterScheme, IEasingFormula} from "../types";
import {Signal} from "@protorians/core";

export class Ease implements IEasing {
    signal = new Signal.Stack<IEasingEmitterScheme>()

    constructor(
        public readonly name: string,
        public readonly cubicBezier: string,
        public readonly formula: IEasingFormula
    ) {
    }

    compute(x: number): number {
        const value = this.formula(x);
        this.signal.dispatch('change', value);
        return (value);
    }

}

export class Easing {
    /**
     * @see https://easings.net/#easeInSine
     */
    static get inSine() {
        return (new Ease(
            'easeInSine',
            'cubic-bezier(0.12, 0, 0.39, 0)',
            x => 1 - (Math.cos((x * Math.PI) / 2))
        ));
    }

    /**
     * @see https://easings.net/#easeOutSine
     */
    static get outSine() {
        return (new Ease(
            'easeOutSine',
            'cubic-bezier(0.37, 0, 0.63, 1)',
            x => round(Math.sin((x * Math.PI) / 2))
        ));
    }

    /**
     * @see https://easings.net/#easeInOutSine
     */
    static get inOutSine() {
        return (new Ease(
            'easeInOutSine',
            'cubic-bezier(0.11, 0, 0.5, 0)',
            x => -1 * round((Math.cos(Math.PI * x) - 1) / 2)
        ));
    }

    /**
     * @see https://easings.net/#easeInQuad
     */
    static get inQuad() {
        return (new Ease(
            'easeInQuad',
            'cubic-bezier(0.11, 0, 0.5, 0)',
            x => round(x * x)
        ));
    }

    /**
     * @see https://easings.net/#easeOutQuad
     */
    static get outQuad() {
        return (new Ease(
            'easeOutQuad',
            'cubic-bezier(0.5, 1, 0.89, 1)',
            x => 1 - round((1 - x) * (1 - x))
        ));
    }

    /**
     * @see https://easings.net/#easeInOutQuad
     */
    static get inOutQuad() {
        return (new Ease(
            'easeInOutQuad',
            'cubic-bezier(0.45, 0, 0.55, 1)',
            x => x < 0.5 ? 2 * x * x : 1 - round(Math.pow(-2 * x + 2, 2) / 2)
        ));
    }

    /**
     * @see https://easings.net/#easeInCubic
     */
    static get inCubic() {
        return (new Ease('easeInCubic', 'cubic-bezier(0.32, 0, 0.67, 0)', x => x * x * x));
    }

    /**
     * @see https://easings.net/#easeOutCubic
     */
    static get outCubic() {
        return (new Ease('easeOutCubic', 'cubic-bezier(0.33, 1, 0.68, 1)', x => 1 - Math.pow(1 - x, 3)));
    }

    /**
     * @see https://easings.net/#easeInOutCubic
     */
    static get inOutCubic() {
        return (new Ease('easeInOutCubic', 'cubic-bezier(0.65, 0, 0.35, 1)', x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2));
    }

    /**
     * @see https://easings.net/#easeInQuart
     */
    static get inQuart() {
        return (new Ease('easeInQuart', 'cubic-bezier(0.5, 0, 0.75, 0)', x => x * x * x * x));
    }

    /**
     * @see https://easings.net/#easeOutQuart
     */
    static get outQuart() {
        return (new Ease('easeOutQuart', 'cubic-bezier(0.25, 1, 0.5, 1)', x => 1 - Math.pow(1 - x, 4)));
    }

    /**
     * @see https://easings.net/#easeInOutQuart
     */
    static get inOutQuart() {
        return (new Ease('easeInOutQuart', 'cubic-bezier(0.76, 0, 0.24, 1)', x => x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2));
    }

    /**
     * @see https://easings.net/#easeInQuint
     */
    static get inQuint() {
        return (new Ease('easeInQuint', 'cubic-bezier(0.64, 0, 0.78, 0)', x => x * x * x * x * x));
    }

    /**
     * @see https://easings.net/#easeOutQuint
     */
    static get outQuint() {
        return (new Ease('easeOutQuint', 'cubic-bezier(0.22, 1, 0.36, 1)', x => 1 - Math.pow(1 - x, 5)));
    }

    /**
     * @see https://easings.net/#easeInOutQuint
     */
    static get inOutQuint() {
        return (new Ease('easeInOutQuint', 'cubic-bezier(0.83, 0, 0.17, 1)', x => x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2));
    }

    /**
     * @see https://easings.net/#easeInExpo
     */
    static get inExpo() {
        return (new Ease('easeInExpo', 'cubic-bezier(0.7, 0, 0.84, 0)', x => x === 0 ? 0 : Math.pow(2, 10 * x - 10)));
    }

    /**
     * @see https://easings.net/#easeOutExpo
     */
    static get outExpo() {
        return (new Ease('easeOutExpo', 'cubic-bezier(0.16, 1, 0.3, 1)', x => x === 1 ? 1 : 1 - Math.pow(2, -10 * x)));
    }

    /**
     * @see https://easings.net/#easeInOutExpo
     */
    static get inOutExpo() {
        return (new Ease('easeInOutExpo', 'cubic-bezier(0.87, 0, 0.13, 1)', x => x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                    : (2 - Math.pow(2, -20 * x + 10)) / 2));
    }

    /**
     * @see https://easings.net/#easeInCirc
     */
    static get inCirc() {
        return (new Ease('easeInCirc', 'cubic-bezier(0.55, 0, 1, 0.45)', x => 1 - Math.sqrt(1 - Math.pow(x, 2))));
    }

    /**
     * @see https://easings.net/#easeOutCirc
     */
    static get outCirc() {
        return (new Ease('easeOutCirc', 'cubic-bezier(0, 0.55, 0.45, 1)', x => Math.sqrt(1 - Math.pow(x - 1, 2))));
    }

    /**
     * @see https://easings.net/#easeInOutCirc
     */
    static get inOutCirc() {
        return (new Ease('easeInOutCirc', 'cubic-bezier(0.85, 0, 0.15, 1)', x => x < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2));
    }

    /**
     * @see https://easings.net/#easeInBack
     */
    static get inBack() {
        return (new Ease('easeInBack', 'cubic-bezier(0.36, 0, 0.66, -0.56)', x => {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return c3 * x * x * x - c1 * x * x;
        }));
    }

    /**
     * @see https://easings.net/#easeOutBack
     */
    static get outBack() {
        return (new Ease('easeOutBack', 'cubic-bezier(0.34, 1.56, 0.64, 1)', x => {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        }));
    }

    /**
     * @see https://easings.net/#easeInOutBack
     */
    static get inOutBack() {
        return (new Ease('easeInOutBack', 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', x => {
            const c1 = 1.70158;
            const c2 = c1 * 1.525;
            return x < 0.5
                ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
        }));
    }

    /**
     * @see https://easings.net/#easeInElastic
     */
    static get inElastic() {
        return (new Ease('easeInElastic', '', x => {
            const c4 = (2 * Math.PI) / 3;
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
        }));
    }

    /**
     * @see https://easings.net/#easeOutElastic
     */
    static get outElastic() {
        return (new Ease('easeOutElastic', '', x => {
            const c4 = (2 * Math.PI) / 3;
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        }));
    }

    /**
     * @see https://easings.net/#easeInOutElastic
     */
    static get inOutElastic() {
        return (new Ease('easeInOutElastic', '', x => {
            const c5 = (2 * Math.PI) / 4.5;
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5
                        ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                        : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
        }));
    }

    /**
     * @see https://easings.net/#easeInBounce
     */
    static get inBounce() {
        return (new Ease('easeInBounce', '', x => 1 - this.outBounce.compute(1 - x)));
    }

    /**
     * @see https://easings.net/#easeOutBounce
     */
    static get outBounce() {
        return (new Ease('easeOutBounce', '', x => {
            const n1 = 7.5625;
            const d1 = 2.75;
            if (x < 1 / d1) {
                return n1 * x * x;
            } else if (x < 2 / d1) {
                return n1 * (x -= 1.5 / d1) * x + 0.75;
            } else if (x < 2.5 / d1) {
                return n1 * (x -= 2.25 / d1) * x + 0.9375;
            } else {
                return n1 * (x -= 2.625 / d1) * x + 0.984375;
            }
        }));
    }

    /**
     * @see https://easings.net/#easeInOutBounce
     */
    static get inOutBounce() {
        return (new Ease('easeInOutBounce', '', x => x < 0.5
            ? (1 - this.outBounce.compute(1 - 2 * x)) / 2
            : (1 + this.outBounce.compute(2 * x - 1)) / 2));
    }
}
