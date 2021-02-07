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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorContext = void 0;
var react_1 = __importDefault(require("react"));
var layer_1 = require("ol/layer");
var source_1 = require("ol/source");
var __1 = require("..");
var debug_1 = __importDefault(require("../debug"));
exports.VectorContext = react_1.default.createContext(null);
var LayerVector = (function (_super) {
    __extends(LayerVector, _super);
    function LayerVector(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.onchange = function () { return _this.refresh(); };
        _this.eventRelay = function (e) {
            if (e.type === 'click' && _this.props.onClick)
                return _this.props.onClick(e) !== false;
            if (e.type === 'pointerenter' && _this.props.onPointerEnter)
                return _this.props.onPointerEnter(e) !== false;
            if (e.type === 'pointerleave' && _this.props.onPointerLeave)
                return _this.props.onPointerLeave(e) !== false;
            return true;
        };
        _this.source = new source_1.Vector({
            features: _this.props.features,
            url: _this.props.url,
            format: _this.props.format
        });
        _this.ol = new layer_1.Vector({ style: _this.props.style, source: _this.source });
        __1.Feature.initEventRelay(_this.context);
        _this.ol.on('change', _this.onchange);
        return _this;
    }
    LayerVector.prototype.refresh = function () {
        var _this = this;
        debug_1.default('refresh', this.source, this.source.getFeatures().length);
        _super.prototype.refresh.call(this);
        if (this.props.onClick)
            this.source.forEachFeature(function (f) { return f.on('click', _this.eventRelay) && false; });
        if (this.props.onPointerEnter)
            this.source.forEachFeature(function (f) { return f.on('pointerenter', _this.eventRelay) && false; });
        if (this.props.onPointerLeave)
            this.source.forEachFeature(function (f) { return f.on('pointerleave', _this.eventRelay) && false; });
    };
    LayerVector.prototype.render = function () {
        return (react_1.default.createElement(exports.VectorContext.Provider, { value: { map: this.context, layer: this.ol } }, this.props.children));
    };
    return LayerVector;
}(__1.Layer));
exports.default = LayerVector;
//# sourceMappingURL=LayerVector.js.map