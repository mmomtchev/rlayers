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
var LayerStamen = (function (_super) {
    __extends(LayerStamen, _super);
    function LayerStamen(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.source = new source_1.Stamen({ layer: _this.props.layer });
        _this.ol = new layer_1.Tile({ source: _this.source });
        return _this;
    }
    return LayerStamen;
}(__1.Layer));
exports.default = LayerStamen;
//# sourceMappingURL=LayerStamen.js.map