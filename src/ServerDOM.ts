import React from 'react';
import ReactDOM from 'react-dom';
import jsdom, {JSDOM} from 'jsdom';
//import {XMLHttpRequest} from 'xmlhttprequest';
import {createCanvas} from 'canvas';
import {performance} from 'perf_hooks';

URL.createObjectURL = () => null;

const resourceLoader = new jsdom.ResourceLoader();
export const window = new JSDOM('', {resources: resourceLoader}).window;
export const document = window.document;

console.log('SERVER DOM INIT');
if (!Object.getOwnPropertyDescriptor(global, 'window'))
    Object.defineProperty(global, 'window', {value: window});
if (!Object.getOwnPropertyDescriptor(global, 'document'))
    Object.defineProperty(global, 'document', {value: document});

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
