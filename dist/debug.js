"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = typeof process === 'undefined' || typeof process.env.DEBUG === 'undefined'
    ? function () { return undefined; }
    : function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        return console.debug(arg);
    };
exports.default = debug;
//# sourceMappingURL=debug.js.map