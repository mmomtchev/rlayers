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
var context_1 = require("../context");
var RImage_1 = __importDefault(require("./RImage"));
var RRegularBase = (function (_super) {
    __extends(RRegularBase, _super);
    function RRegularBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RRegularBase.prototype.create = function (props) {
        throw new Error('RImage is an abstract class');
    };
    RRegularBase.prototype.setStroke = function (s) {
        this.stroke = s;
        this.ol = this.create(this.props);
        _super.prototype.set.call(this, this.ol);
    };
    RRegularBase.prototype.setFill = function (f) {
        this.fill = f;
        this.ol = this.create(this.props);
        _super.prototype.set.call(this, this.ol);
    };
    RRegularBase.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(context_1.RStyleContext.Provider, { value: this }, this.props.children)));
    };
    RRegularBase.classProps = RImage_1.default.classProps.concat(['radius']);
    return RRegularBase;
}(RImage_1.default));
exports.default = RRegularBase;
//# sourceMappingURL=RRegularBase.js.map