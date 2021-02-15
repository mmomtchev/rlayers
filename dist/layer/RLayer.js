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
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context");
var REvent_1 = require("../REvent");
var RLayer = (function (_super) {
    __extends(RLayer, _super);
    function RLayer(props, context) {
        var _this = _super.call(this, props, context) || this;
        if (!_this.context || !_this.context.addLayer)
            throw new Error('A layer must be part of a map');
        return _this;
    }
    RLayer.prototype.refresh = function (prevProps) {
        var e_1, _a;
        _super.prototype.refresh.call(this, prevProps);
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
    RLayer.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.context.addLayer(this.ol);
    };
    RLayer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.context.removeLayer(this.ol);
    };
    RLayer.contextType = context_1.RMapContext;
    return RLayer;
}(REvent_1.RlayersBase));
exports.default = RLayer;
//# sourceMappingURL=RLayer.js.map