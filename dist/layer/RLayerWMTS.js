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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var layer_1 = require("ol/layer");
var WMTS_1 = __importStar(require("ol/source/WMTS"));
var WMTSCapabilities_1 = __importDefault(require("ol/format/WMTSCapabilities"));
var RLayerRaster_1 = __importDefault(require("./RLayerRaster"));
var debug_1 = __importDefault(require("../debug"));
var RLayerWMTS = (function (_super) {
    __extends(RLayerWMTS, _super);
    function RLayerWMTS(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.ol = new layer_1.Tile({ source: _this.source });
        _this.parser = new WMTSCapabilities_1.default();
        _this.createSource();
        return _this;
    }
    RLayerWMTS.prototype.createSource = function () {
        var _this = this;
        debug_1.default('createSource', this);
        return fetch(this.props.url)
            .then(function (r) { return r.text(); })
            .then(function (text) {
            var caps = _this.parser.read(text);
            var options = WMTS_1.optionsFromCapabilities(caps, {
                layer: _this.props.layer
            });
            if (_this.props.attributions)
                options.attributions = _this.props.attributions;
            options.crossOrigin = '';
            if (_this.props.projection)
                options.projection = _this.props.projection;
            options.wrapX = false;
            _this.source = new WMTS_1.default(options);
            _this.ol.setSource(_this.source);
            _this.eventSources = [_this.ol, _this.source];
            if (_this.props.onSourceReady)
                _this.props.onSourceReady(options);
            return _this.source;
        })
            .catch(function (e) {
            console.error('failed loading WMTS capabilites', e);
            _this.source = undefined;
            return null;
        });
    };
    RLayerWMTS.prototype.refresh = function (prevProps) {
        var _this = this;
        this.createSource().then(function () { return _super.prototype.refresh.call(_this, prevProps); });
    };
    return RLayerWMTS;
}(RLayerRaster_1.default));
exports.default = RLayerWMTS;
//# sourceMappingURL=RLayerWMTS.js.map