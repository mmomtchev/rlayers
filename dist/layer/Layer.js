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
exports.LayerContext = void 0;
var react_1 = __importDefault(require("react"));
var Map_1 = require("../Map");
var Event_1 = require("../Event");
var debug_1 = __importDefault(require("../debug"));
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer(props, context) {
        return _super.call(this, props, context) || this;
    }
    Layer.prototype.refresh = function () {
        var e_1, _a;
        _super.prototype.refresh.call(this);
        try {
            for (var _b = __values([
                'visible',
                'opacity',
                'zIndex',
                'minResolution',
                'maxResolution',
                'minZoom',
                'maxZoom'
            ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                if (this.props[p] !== undefined) {
                    var m = p.charAt(0).toUpperCase() + p.substring(1);
                    if (this.props[p] !== this.ol['get' + m]())
                        this.ol['set' + m](this.props[p]);
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
        if (this.source && this.props.attributions)
            this.source.setAttributions(this.props.attributions);
        if (this.props.properties)
            this.ol.setProperties(this.props.properties);
    };
    Layer.prototype.componentDidMount = function () {
        debug_1.default('didMount', this);
        _super.prototype.componentDidMount.call(this);
        this.context.addLayer(this.ol);
    };
    Layer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.context.removeLayer(this.ol);
    };
    Layer.contextType = Map_1.MapContext;
    return Layer;
}(Event_1.ReactLayersBase));
exports.default = Layer;
exports.LayerContext = react_1.default.createContext(null);
//# sourceMappingURL=Layer.js.map