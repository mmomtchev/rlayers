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
var Layer_1 = __importDefault(require("./Layer"));
var OSM = (function (_super) {
    __extends(OSM, _super);
    function OSM(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.source = new source_1.OSM();
        _this.ol = new layer_1.Tile({ source: _this.source });
        return _this;
    }
    OSM.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this.ol.setProperties({ label: 'OpenStreetMap' });
    };
    return OSM;
}(Layer_1.default));
exports.default = OSM;
//# sourceMappingURL=OSM.js.map