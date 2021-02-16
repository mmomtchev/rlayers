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
exports.createRStyle = exports.useRStyle = void 0;
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var Style_1 = __importDefault(require("ol/style/Style"));
var context_1 = require("../context");
var REvent_1 = require("../REvent");
var useRStyle = function () { return react_1.default.useRef(); };
exports.useRStyle = useRStyle;
var createRStyle = function () { return react_1.default.createRef(); };
exports.createRStyle = createRStyle;
var RStyle = (function (_super) {
    __extends(RStyle, _super);
    function RStyle(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.style = function (f) {
            if (_this.ol !== _this.style)
                return _this.ol;
            var style = new Style_1.default({});
            var render = (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(context_1.RStyleContext.Provider, { value: style }, _this.props.render(f))));
            react_dom_1.default.render(render, document.createElement('div'));
            return style;
        };
        if (props.render)
            _this.ol = _this.style;
        else
            _this.ol = new Style_1.default({});
        return _this;
    }
    RStyle.prototype.refresh = function (prevProps) {
        var _a, _b, _c, _d;
        _super.prototype.refresh.call(this, prevProps);
        if ((_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.setStyle)
            (_d = (_c = this.context) === null || _c === void 0 ? void 0 : _c.layer) === null || _d === void 0 ? void 0 : _d.setStyle(this.ol);
    };
    RStyle.prototype.render = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(context_1.RStyleContext.Provider, { value: this.ol }, this.props.render ? null : this.props.children)));
    };
    RStyle.getStyle = function (style) {
        if (style === null || style === undefined)
            return style;
        if (typeof style.style === 'function')
            return function (f) { return style.style(f); };
        if (Object.keys(style).includes('current'))
            return function (f) { return style.current.style(f); };
        return style;
    };
    RStyle.getStyleStatic = function (style) {
        if (style === null || style === undefined)
            return style;
        var asRStyle;
        if (typeof style.style === 'function')
            asRStyle = style;
        if (Object.keys(style).includes('current'))
            asRStyle = style.current;
        if (asRStyle) {
            if (asRStyle.ol !== undefined && typeof asRStyle.ol !== 'function')
                return asRStyle.ol;
            throw new TypeError('RStyle is dynamic and cannot be converted to Style');
        }
        return style;
    };
    RStyle.contextType = context_1.RVectorContext;
    return RStyle;
}(REvent_1.RlayersBase));
exports.default = RStyle;
//# sourceMappingURL=RStyle.js.map