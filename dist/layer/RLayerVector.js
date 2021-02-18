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
var layer_1 = require("ol/layer");
var source_1 = require("ol/source");
var RLayerBaseVector_1 = __importDefault(require("./RLayerBaseVector"));
var RStyle_1 = __importDefault(require("../style/RStyle"));
var RLayerVector = (function (_super) {
    __extends(RLayerVector, _super);
    function RLayerVector(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.source = new source_1.Vector({
            features: _this.props.features,
            url: _this.props.url,
            format: _this.props.format,
            loader: _this.props.loader
        });
        _this.ol = new layer_1.Vector({ style: RStyle_1.default.getStyle(_this.props.style), source: _this.source });
        _this.eventSources = [_this.ol, _this.source];
        _this.source.on('featuresloadend', _this.newFeature);
        _this.source.on('addfeature', _this.newFeature);
        _this.attachEventHandlers();
        return _this;
    }
    RLayerVector.prototype.refresh = function (prevProps) {
        _super.prototype.refresh.call(this, prevProps);
        if ((prevProps === null || prevProps === void 0 ? void 0 : prevProps.url) !== this.props.url)
            this.source.setUrl(this.props.url);
    };
    return RLayerVector;
}(RLayerBaseVector_1.default));
exports.default = RLayerVector;
//# sourceMappingURL=RLayerVector.js.map