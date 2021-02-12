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
var RLayer_1 = __importDefault(require("./RLayer"));
var RFeature_1 = __importDefault(require("../RFeature"));
var RLayerVectorTile = (function (_super) {
    __extends(RLayerVectorTile, _super);
    function RLayerVectorTile(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.source = new source_1.VectorTile({
            url: _this.props.url,
            format: _this.props.format
        });
        _this.ol = new layer_1.VectorTile({ style: _this.props.style, source: _this.source });
        _this.eventSources = [_this.ol, _this.source];
        RFeature_1.default.initEventRelay(_this.context);
        return _this;
    }
    RLayerVectorTile.prototype.refresh = function (prevProps) {
        var _this = this;
        _super.prototype.refresh.call(this, prevProps);
        var handlers = Object.keys(this.props)
            .filter(function (ev) { return ev.startsWith('on'); })
            .reduce(function (ac, x) {
            var _a;
            return (__assign(__assign({}, ac), (_a = {}, _a['_' + x.toLowerCase()] = _this.props[x], _a)));
        }, {});
        this.ol.setProperties(handlers);
    };
    RLayerVectorTile.prototype.render = function () {
        return null;
    };
    return RLayerVectorTile;
}(RLayer_1.default));
exports.default = RLayerVectorTile;
//# sourceMappingURL=RLayerVectorTile.js.map