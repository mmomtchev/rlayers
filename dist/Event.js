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
    ReactLayersBase.prototype.refresh = function (prevProps) {
        var e_1, _a, e_2, _b, e_3, _c;
        var _d;
        var eventSources = (_d = this.eventSources) !== null && _d !== void 0 ? _d : [this.ol];
        try {
            for (var _e = __values(Object.keys(this.props)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var p = _f.value;
                if (p.startsWith('on')) {
                    if (this.handlers === undefined)
                        this.handlers = {};
                    if (this.handlers[p] !== undefined && this.handlers[p] !== this.props[p]) {
                        debug_1.default('removing previously installed handler', this, p, this.handlers[p], this.props[p]);
                        try {
                            for (var eventSources_1 = (e_2 = void 0, __values(eventSources)), eventSources_1_1 = eventSources_1.next(); !eventSources_1_1.done; eventSources_1_1 = eventSources_1.next()) {
                                var source = eventSources_1_1.value;
                                source.un(this.olEventName(p), this.handlers[p]);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (eventSources_1_1 && !eventSources_1_1.done && (_b = eventSources_1.return)) _b.call(eventSources_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        this.handlers[p] = undefined;
                    }
                    if (this.handlers[p] === undefined) {
                        debug_1.default('installing handler', this, p, this.props[p]);
                        try {
                            for (var eventSources_2 = (e_3 = void 0, __values(eventSources)), eventSources_2_1 = eventSources_2.next(); !eventSources_2_1.done; eventSources_2_1 = eventSources_2.next()) {
                                var source = eventSources_2_1.value;
                                source.on(this.olEventName(p), this.props[p]);
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (eventSources_2_1 && !eventSources_2_1.done && (_c = eventSources_2.return)) _c.call(eventSources_2);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        this.handlers[p] = this.props[p];
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ReactLayersBase.prototype.componentDidMount = function () {
        debug_1.default('didMount', this);
        this.refresh();
    };
    ReactLayersBase.prototype.propsDiff = function (prev) {
        var e_4, _a;
        if (this.props === null || prev === null) {
            if (this.props !== prev) {
                debug_1.default('null props differ', this.props, prev);
                return true;
            }
            return false;
        }
        try {
            for (var _b = __values(Object.keys(this.props)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var k = _c.value;
                if (this.props[k] !== prev[k]) {
                    debug_1.default('because of', k, this.props[k], prev[k]);
                    return true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return false;
    };
    ReactLayersBase.prototype.componentDidUpdate = function (prevProps, prev, snap) {
        if (this.props !== prevProps) {
            debug_1.default('willRefresh', this, prevProps, this.props);
            this.refresh(prevProps);
        }
    };
    ReactLayersBase.prototype.componentWillUnmount = function () {
        var e_5, _a, e_6, _b;
        var _c, _d;
        debug_1.default('willUnmount', this, this.handlers);
        var eventSources = (_c = this.eventSources) !== null && _c !== void 0 ? _c : [this.ol];
        try {
            for (var _e = __values(Object.keys((_d = this.handlers) !== null && _d !== void 0 ? _d : {})), _f = _e.next(); !_f.done; _f = _e.next()) {
                var h = _f.value;
                debug_1.default('cleaning up handler', this, h, this.handlers[h]);
                if (this.handlers[h])
                    try {
                        for (var eventSources_3 = (e_6 = void 0, __values(eventSources)), eventSources_3_1 = eventSources_3.next(); !eventSources_3_1.done; eventSources_3_1 = eventSources_3.next()) {
                            var source = eventSources_3_1.value;
                            source.un(this.olEventName(h), this.handlers[h]);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (eventSources_3_1 && !eventSources_3_1.done && (_b = eventSources_3.return)) _b.call(eventSources_3);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    ReactLayersBase.prototype.render = function () {
        return null;
    };
    return ReactLayersBase;
}(react_1.default.PureComponent));
exports.ReactLayersBase = ReactLayersBase;
//# sourceMappingURL=Event.js.map