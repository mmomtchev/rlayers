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
var react_1 = __importDefault(require("react"));
var style_1 = require("ol/style");
var context_1 = require("../context");
var RImage_1 = __importDefault(require("./RImage"));
var RRegularShape = (function (_super) {
    __extends(RRegularShape, _super);
    function RRegularShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RRegularShape.prototype.create = function (props) {
        this.classProps = RRegularShape.classProps.concat(RImage_1.default.classProps);
        return new style_1.RegularShape(props);
    };
    RRegularShape.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(context_1.RStyleContext.Provider, { value: this.ol }, this.props.children)));
    };
    RRegularShape.classProps = ['radius1', 'radius2', 'points'];
    return RRegularShape;
}(RImage_1.default));
exports.default = RRegularShape;
//# sourceMappingURL=RRegularShape.js.map