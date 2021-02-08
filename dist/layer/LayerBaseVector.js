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
        _this.onchange = function () {
            _this.attachFeatureHandlers();
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
    LayerBaseVector.prototype.attachFeatureHandlers = function (prevProps) {
        var e_2, _a;
        var _this = this;
        var _loop_1 = function (ev) {
            if (!prevProps || this_1.props['on' + ev] !== prevProps['on' + ev])
                this_1.source.forEachFeature(function (f) { return f.on(ev.toLowerCase(), _this.eventRelay) && false; });
        };
        var this_1 = this;
        try {
            for (var _b = __values(['Click', 'PointerMove', 'PointerEnter', 'PointerLeave']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var ev = _c.value;
                _loop_1(ev);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    LayerBaseVector.prototype.refresh = function (prevProps) {
        _super.prototype.refresh.call(this);
        this.attachFeatureHandlers(prevProps);
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