"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = typeof process === 'undefined' || typeof process.env.DEBUG === 'undefined'
    ? function () { return undefined; }
    : console.debug.bind(window.console);
exports.default = debug;
//# sourceMappingURL=debug.js.map