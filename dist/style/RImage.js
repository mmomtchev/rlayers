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
var RBase_1 = __importDefault(require("./RBase"));
var RImage = (function (_super) {
    __extends(RImage, _super);
    function RImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RImage.prototype.create = function (props) {
        throw new Error('RImage is an abstract class');
    };
    RImage.prototype.set = function (ol) {
        if (!this.context.style.setImage)
            throw new Error('Parent element does not support an image');
        this.context.style.setImage(ol);
    };
    RImage.classProps = ['opacity', 'rotateWithView', 'rotation', 'scale', 'displacement'];
    return RImage;
}(RBase_1.default));
exports.default = RImage;
//# sourceMappingURL=RImage.js.map