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
var DragPan_1 = __importDefault(require("ol/interaction/DragPan"));
var RBase_1 = __importDefault(require("./RBase"));
var RDragPan = (function (_super) {
    __extends(RDragPan, _super);
    function RDragPan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RDragPan.prototype.createOL = function (props) {
        var _this = this;
        this.classProps = RDragPan.classProps;
        return new DragPan_1.default(Object.keys(props)
            .filter(function (p) { return _this.classProps.includes(p); })
            .reduce(function (ac, p) {
            var _a;
            return (__assign(__assign({}, ac), (_a = {}, _a[p] = props[p], _a)));
        }, {}));
    };
    RDragPan.classProps = ['condition', 'kinetic'];
    return RDragPan;
}(RBase_1.default));
exports.default = RDragPan;
//# sourceMappingURL=RDragPan.js.map