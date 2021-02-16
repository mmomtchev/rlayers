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
var RLayerBaseVector_1 = __importDefault(require("./RLayerBaseVector"));
var RStyle_1 = __importDefault(require("../style/RStyle"));
var RLayerCluster = (function (_super) {
    __extends(RLayerCluster, _super);
    function RLayerCluster(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.cluster = new source_1.Vector({
            features: _this.props.features,
            url: _this.props.url,
            format: _this.props.format
        });
        _this.source = new source_1.Cluster({ source: _this.cluster, distance: _this.props.distance });
        _this.ol = new layer_1.Vector(__assign(__assign({}, props), { source: _this.source, style: RStyle_1.default.getStyle(props.style) }));
        _this.eventSources = [_this.ol, _this.source];
        _this.source.on('RFeaturesloadend', _this.newFeature);
        _this.source.on('addRFeature', _this.newFeature);
        _this.refresh();
        return _this;
    }
    RLayerCluster.prototype.refresh = function (prev) {
        _super.prototype.refresh.call(this);
        if ((prev === null || prev === void 0 ? void 0 : prev.distance) !== this.props.distance)
            this.source.setDistance(this.props.distance);
    };
    return RLayerCluster;
}(RLayerBaseVector_1.default));
exports.default = RLayerCluster;
//# sourceMappingURL=RLayerCluster.js.map