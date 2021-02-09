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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var layer_1 = require("ol/layer");
var source_1 = require("ol/source");
var LayerBaseVector_1 = __importDefault(require("./LayerBaseVector"));
var LayerHeatmap = (function (_super) {
    __extends(LayerHeatmap, _super);
    function LayerHeatmap(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.source = new source_1.Vector({
            features: _this.props.features,
            url: _this.props.url,
            format: _this.props.format
        });
        _this.ol = new layer_1.Heatmap(__assign({ source: _this.source }, props));
        _this.eventSources = [_this.ol, _this.source];
        _this.source.on('featuresloadend', _this.newFeature);
        _this.source.on('addfeature', _this.newFeature);
        _this.refresh();
        return _this;
    }
    LayerHeatmap.prototype.refresh = function (prev) {
        _super.prototype.refresh.call(this);
        if (!prev || prev.blur !== this.props.blur)
            this.ol.setBlur(this.props.blur);
        if (!prev || prev.radius !== this.props.radius)
            this.ol.setRadius(this.props.radius);
    };
    return LayerHeatmap;
}(LayerBaseVector_1.default));
exports.default = LayerHeatmap;
//# sourceMappingURL=LayerHeatmap.js.map