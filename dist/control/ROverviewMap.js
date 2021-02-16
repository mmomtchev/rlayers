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
var react_1 = __importDefault(require("react"));
var control_1 = require("ol/control");
var context_1 = require("../context");
var RControlBase_1 = __importDefault(require("./RControlBase"));
var ROverviewMap = (function (_super) {
    __extends(ROverviewMap, _super);
    function ROverviewMap(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.ol = new control_1.OverviewMap(_this.toOLProps(props));
        return _this;
    }
    ROverviewMap.prototype.toOLProps = function (props) {
        return __assign(__assign({}, _super.prototype.toOLProps.call(this, props)), { className: props.className, collapsible: props.collapsible, collapsed: props.collapsed, label: props.label, collapseLabel: props.collapseLabel });
    };
    ROverviewMap.prototype.render = function () {
        return (react_1.default.createElement("div", { className: this.props.className, style: { width: this.props.width, height: this.props.height } },
            react_1.default.createElement(context_1.RContext.Provider, { value: { map: this.ol.getOverviewMap() } }, this.props.children)));
    };
    return ROverviewMap;
}(RControlBase_1.default));
exports.default = ROverviewMap;
//# sourceMappingURL=ROverviewMap.js.map