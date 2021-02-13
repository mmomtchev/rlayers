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
var RStyleBase_1 = __importDefault(require("./RStyleBase"));
var RStroke = (function (_super) {
    __extends(RStroke, _super);
    function RStroke() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RStroke.prototype.create = function (props) {
        this.classProps = RStroke.classProps;
        return new style_1.Stroke(props);
    };
    RStroke.prototype.set = function (ol) {
        if (this.context.setStroke)
            return this.context.setStroke(ol);
        throw new Error('Parent element does not support a stroke');
    };
    RStroke.classProps = ['color', 'width', 'lineCap', 'lineJoin'];
    return RStroke;
}(RStyleBase_1.default));
exports.default = RStroke;
//# sourceMappingURL=RStroke.js.map