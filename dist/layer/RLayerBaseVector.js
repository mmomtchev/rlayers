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
var react_1 = __importDefault(require("react"));
var context_1 = require("../context");
var RLayer_1 = __importDefault(require("./RLayer"));
var RFeature_1 = __importDefault(require("../RFeature"));
var RStyle_1 = __importDefault(require("../style/RStyle"));
var RLayerBaseVector = (function (_super) {
    __extends(RLayerBaseVector, _super);
    function RLayerBaseVector(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.newFeature = function (e) {
            if (e.feature)
                _this.attachFeatureHandlers([e.feature]);
            if (e.features)
                _this.attachFeatureHandlers(e.features);
        };
        _this.eventRelay = function (e) {
            if (_this.props['on' + RLayerBaseVector.relayedEvents[e.type]])
                return _this.props['on' + RLayerBaseVector.relayedEvents[e.type]](e) !== false;
            return true;
        };
        RFeature_1.default.initEventRelay(_this.context);
        return _this;
    }
    RLayerBaseVector.prototype.attachFeatureHandlers = function (features, prevProps) {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = __values(Object.values(RLayerBaseVector.relayedEvents)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var ev = _d.value;
                if ((!prevProps || this.props['on' + ev] !== prevProps['on' + ev]) &&
                    this.props['on' + ev])
                    try {
                        for (var features_1 = (e_2 = void 0, __values(features)), features_1_1 = features_1.next(); !features_1_1.done; features_1_1 = features_1.next()) {
                            var f = features_1_1.value;
                            f.on(ev.toLowerCase(), this.eventRelay);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (features_1_1 && !features_1_1.done && (_b = features_1.return)) _b.call(features_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    RLayerBaseVector.prototype.componentWillUnmount = function () {
        var e_3, _a;
        var _this = this;
        var _loop_1 = function (ev) {
            this_1.source.forEachFeature(function (f) {
                f.un(ev.toLowerCase(), _this.eventRelay);
                return false;
            });
        };
        var this_1 = this;
        try {
            for (var _b = __values(Object.values(RLayerBaseVector.relayedEvents)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var ev = _c.value;
                _loop_1(ev);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    RLayerBaseVector.prototype.refresh = function (prevProps) {
        _super.prototype.refresh.call(this);
        this.attachFeatureHandlers(this.source.getFeatures(), prevProps);
        if (!prevProps || prevProps.style !== this.props.style)
            this.ol.setStyle(RStyle_1.default.getStyle(this.props.style));
    };
    RLayerBaseVector.prototype.render = function () {
        return (react_1.default.createElement(context_1.RVectorContext.Provider, { value: { map: this.context, layer: this.ol, source: this.source } }, this.props.children));
    };
    RLayerBaseVector.relayedEvents = {
        click: 'Click',
        pointermove: 'PointerMove',
        pointerenter: 'PointerEnter',
        pointerleave: 'PointerLeave'
    };
    return RLayerBaseVector;
}(RLayer_1.default));
exports.default = RLayerBaseVector;
//# sourceMappingURL=RLayerBaseVector.js.map