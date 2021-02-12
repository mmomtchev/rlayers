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
var DragBox_1 = __importDefault(require("ol/interaction/DragBox"));
var context_1 = require("../context");
var RPointer_1 = __importDefault(require("./RPointer"));
var RDragBox = (function (_super) {
    __extends(RDragBox, _super);
    function RDragBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RDragBox.prototype.createOL = function (props) {
        var _this = this;
        this.classProps = RDragBox.classProps;
        return new DragBox_1.default(Object.keys(props)
            .filter(function (p) { return _this.classProps.includes(p); })
            .reduce(function (ac, p) {
            var _a;
            return (__assign(__assign({}, ac), (_a = {}, _a[p] = props[p], _a)));
        }, {}));
    };
    RDragBox.prototype.refresh = function (prevProps) {
        _super.prototype.refresh.call(this, prevProps);
    };
    RDragBox.contextType = context_1.RMapContext;
    RDragBox.classProps = ['className', 'condition', 'minArea', 'boxEndCondition'];
    return RDragBox;
}(RPointer_1.default));
exports.default = RDragBox;
//# sourceMappingURL=RDragBox.js.map