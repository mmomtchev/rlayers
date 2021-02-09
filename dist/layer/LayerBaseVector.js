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
exports.VectorContext = void 0;
var react_1 = __importDefault(require("react"));
var __1 = require("..");
exports.VectorContext = react_1.default.createContext(null);
var LayerBaseVector = (function (_super) {
    __extends(LayerBaseVector, _super);
    function LayerBaseVector(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.newFeature = function (e) {
            if (e.feature)
                _this.attachNewFeatureHandlers([e.feature]);
            if (e.features)
                _this.attachNewFeatureHandlers(e.features);
        };
        _this.eventRelay = function (e) {
            var e_1, _a;
            try {
                for (var _b = __values(['Click', 'PointerMove', 'PointerEnter', 'PointerLeave']), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var ev = _c.value;
                    if (e.type === ev.toLowerCase() && _this.props['on' + ev])
                        return _this.props['on' + ev](e) !== false;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        };
        __1.Feature.initEventRelay(_this.context);
        return _this;
    }
    LayerBaseVector.prototype.attachNewFeatureHandlers = function (features) {
        var e_2, _a, e_3, _b;
        try {
            for (var _c = __values(['Click', 'PointerMove', 'PointerEnter', 'PointerLeave']), _d = _c.next(); !_d.done; _d = _c.next()) {
                var ev = _d.value;
                try {
                    for (var features_1 = (e_3 = void 0, __values(features)), features_1_1 = features_1.next(); !features_1_1.done; features_1_1 = features_1.next()) {
                        var f = features_1_1.value;
                        f.on(ev.toLowerCase(), this.eventRelay);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (features_1_1 && !features_1_1.done && (_b = features_1.return)) _b.call(features_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
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
    LayerBaseVector.prototype.attachExistingFeatureHandlers = function (prevProps) {
        var e_4, _a, e_5, _b;
        try {
            for (var _c = __values(['Click', 'PointerMove', 'PointerEnter', 'PointerLeave']), _d = _c.next(); !_d.done; _d = _c.next()) {
                var ev = _d.value;
                if (!prevProps || this.props['on' + ev] !== prevProps['on' + ev])
                    try {
                        for (var _e = (e_5 = void 0, __values(this.source.getFeatures())), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var f = _f.value;
                            f.on(ev.toLowerCase(), this.eventRelay);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    LayerBaseVector.prototype.componentWillUnmount = function () {
        var e_6, _a;
        var _this = this;
        var _loop_1 = function (ev) {
            this_1.source.forEachFeature(function (f) {
                f.un(ev.toLowerCase(), _this.eventRelay);
                return false;
            });
        };
        var this_1 = this;
        try {
            for (var _b = __values(['Click', 'PointerMove', 'PointerEnter', 'PointerLeave']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var ev = _c.value;
                _loop_1(ev);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    LayerBaseVector.prototype.refresh = function (prevProps) {
        _super.prototype.refresh.call(this);
        this.attachExistingFeatureHandlers(prevProps);
        if (!prevProps || prevProps.style !== this.props.style)
            this.ol.setStyle(this.props.style);
    };
    LayerBaseVector.prototype.render = function () {
        return (react_1.default.createElement(exports.VectorContext.Provider, { value: { map: this.context, layer: this.ol, source: this.source } }, this.props.children));
    };
    return LayerBaseVector;
}(__1.Layer));
exports.default = LayerBaseVector;
//# sourceMappingURL=LayerBaseVector.js.map