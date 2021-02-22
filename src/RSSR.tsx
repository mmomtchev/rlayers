import React from 'react';
import ReactDOM from 'react-dom';
import jsdom, {JSDOM} from 'jsdom';
//import {XMLHttpRequest} from 'xmlhttprequest';
import {createCanvas} from 'canvas';

import RMap from './RMap';
import {RContext, RContextType} from './context';
import RenderEvent from 'ol/render/Event';

// Most of this is various jsdom polyfills and interceptors
type appendChildFn = <T extends Node>(newChild: T) => T;
type getComputedStyleFn = (elt: Element, pseudoElt: string) => CSSStyleDeclaration;
type createElementFn = (el: string, tags?: ElementCreationOptions) => HTMLElement;

window.document.createElement = ((orig: createElementFn) => {
    return function createElement(el, tags) {
        return orig.call(this, el, tags);
    };
})(window.document.createElement);

window.Node.prototype.appendChild = ((orig: appendChildFn) => {
    return function appendChild(newChild) {
        return orig.call(this, newChild);
    };
})(window.Node.prototype.appendChild);

Object.defineProperty(window.HTMLElement.prototype, 'offsetHeight', {
    get: function offsetHeight() {
        if (this.style.height && this.style.height.match(/^[0-9]+px/))
            return parseInt(this.style.height);
        return 0;
    }
});
Object.defineProperty(window.HTMLElement.prototype, 'offsetWidth', {
    get: function offsetWidth() {
        if (this.style.width && this.style.width.match(/^[0-9]+px/))
            return parseInt(this.style.width);
        return 0;
    }
});

window.getComputedStyle = ((orig: getComputedStyleFn) => {
    return function getComputedStyle(elt, pseudoElt) {
        const style = orig.call(this, elt, pseudoElt);
        for (const p of [
            'borderLeftWidth',
            'paddingLeft',
            'paddingRight',
            'borderRightWidth',
            'borderTopWidth',
            'paddingTop',
            'paddingBottom',
            'borderBottomWidth'
        ])
            if (!style[p]) style[p] = '0px';
        return style;
    };
})(window.getComputedStyle);

window.requestAnimationFrame = (fn) => {
    const hr = performance.now();
    return (setTimeout(() => fn(hr), 0) as unknown) as number;
};
window.cancelAnimationFrame = (id: number) => clearTimeout(id);

//window.XMLHttpRequest = XMLHttpRequest;

export interface RSSRProps {
    placeholderImage: string;
}

export default function RSSRender(comp: JSX.Element): Promise<RSSRProps> {
    const target = document.createElement('div');
    return new Promise((resolve, reject) => {
        let image: string;
        const context: RContextType = {
            ssr: {
                mapRenderComplete: () => {
                    if (!image) reject('Server-side rendering failed');
                    if (context.ssr.maps.length > 1) reject('Multiple maps not supported yet');
                    resolve(image);
                },
                layerPostRender: (e: RenderEvent) => {
                    image = e.context.canvas.toDataURL();
                },
                layers: [],
                maps: []
            }
        };
        ReactDOM.render(<RContext.Provider value={context}>{comp}</RContext.Provider>, target);
    }).then((image: string) => ({placeholderImage: image} as RSSRProps));
}
