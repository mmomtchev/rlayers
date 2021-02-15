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
var style_1 = require("ol/style");
var RImage_1 = __importDefault(require("./RImage"));
var RIcon = (function (_super) {
    __extends(RIcon, _super);
    function RIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RIcon.prototype.create = function (props) {
        this.classProps = RIcon.classProps;
        return new style_1.Icon(props);
    };
    RIcon.classProps = RImage_1.default.classProps.concat([
        'anchor',
        'anchorXUnits',
        'anchorYUnits',
        'color',
        'crossOrigin',
        'img',
        'offset',
        'offsetOrigin',
        'size',
        'imgSize',
        'src'
    ]);
    return RIcon;
}(RImage_1.default));
exports.default = RIcon;
//# sourceMappingURL=RIcon.js.map