"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactLayersBase = void 0;
var react_1 = __importDefault(require("react"));
var debug_1 = __importDefault(require("./debug"));
var ReactLayersBase = (function (_super) {
    __extends(ReactLayersBase, _super);
    function ReactLayersBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactLayersBase.prototype.olEventName = function (ev) {
        return ev.substring(2).toLowerCase();
    };
    ReactLayersBase.prototype.refresh = function () {
        var e_1, _a;
        try {
            for (var _b = __values(Object.keys(this.props)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                if (p.startsWith('on')) {
                    if (this.handlers === undefined)
                        this.handlers = {};
                    if (this.handlers[p] !== undefined && this.handlers[p] !== this.props[p]) {
                        debug_1.default('removing previously installed handler', this, p, this.handlers[p], this.props[p]);
                        this.ol.un(this.olEventName(p), this.handlers[p]);
                        this.handlers[p] = undefined;
                    }
                    if (this.handlers[p] === undefined) {
                        debug_1.default('installing handler', this, p, this.props[p]);
                        this.ol.on(this.olEventName(p), this.props[p]);
                        this.handlers[p] = this.props[p];
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ReactLayersBase.prototype.componentDidMount = function () {
        this.refresh();
    };
    ReactLayersBase.prototype.componentDidUpdate = function (prevProps, prev, snap) {
        if (this.props !== prevProps) {
            debug_1.default('willRefresh', this, prevProps, this.props);
            this.refresh();
        }
        else
            debug_1.default('skipRefresh', this, this.props);
    };
    ReactLayersBase.prototype.componentWillUnmount = function () {
        var e_2, _a;
        var _b;
        debug_1.default('willUnmount', this, this.handlers);
        try {
            for (var _c = __values(Object.keys((_b = this.handlers) !== null && _b !== void 0 ? _b : {})), _d = _c.next(); !_d.done; _d = _c.next()) {
                var h = _d.value;
                debug_1.default('cleaning up handler', this, h, this.handlers[h]);
                if (this.handlers[h])
                    this.ol.un(this.olEventName(h), this.handlers[h]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    ReactLayersBase.prototype.render = function () {
        return null;
    };
    return ReactLayersBase;
}(react_1.default.PureComponent));
exports.ReactLayersBase = ReactLayersBase;
//# sourceMappingURL=Event.js.map