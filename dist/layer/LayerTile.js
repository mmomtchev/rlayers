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
Object.defineProperty(exports, "__esModule", { value: true });
var layer_1 = require("ol/layer");
var source_1 = require("ol/source");
var __1 = require("..");
var LayerTile = (function (_super) {
    __extends(LayerTile, _super);
    function LayerTile(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.source = new source_1.XYZ({ url: _this.props.url, projection: _this.props.projection });
        _this.ol = new layer_1.Tile({ source: _this.source });
        return _this;
    }
    LayerTile.prototype.refresh = function () {
        var _a;
        _super.prototype.refresh.call(this);
        if (this.props.url && ((_a = this.source) === null || _a === void 0 ? void 0 : _a.getUrls()[0]) !== this.props.url)
            this.source.setUrl(this.props.url);
    };
    return LayerTile;
}(__1.Layer));
exports.default = LayerTile;
//# sourceMappingURL=LayerTile.js.map