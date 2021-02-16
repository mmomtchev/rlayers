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
var RBase_1 = __importDefault(require("./RBase"));
var RFill = (function (_super) {
    __extends(RFill, _super);
    function RFill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RFill.prototype.create = function (props) {
        this.classProps = RFill.classProps;
        return new style_1.Fill(props);
    };
    RFill.prototype.set = function (ol) {
        if (this.context.style.setFill)
            return this.context.style.setFill(ol);
        throw new Error('Parent element does not support a fill');
    };
    RFill.classProps = ['color'];
    return RFill;
}(RBase_1.default));
exports.default = RFill;
//# sourceMappingURL=RFill.js.map