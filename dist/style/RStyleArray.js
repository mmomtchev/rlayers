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
var react_dom_1 = __importDefault(require("react-dom"));
var RStyle_1 = __importDefault(require("./RStyle"));
var RStyleArray = (function (_super) {
    __extends(RStyleArray, _super);
    function RStyleArray(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.style = function (f) {
            if (_this.props.render) {
                var element = _this.props.render(f);
                var render = (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.Children.map(element.props.children, function (child, i) {
                    if (!_this.childRefs[i])
                        _this.childRefs[i] = react_1.default.createRef();
                    if (react_1.default.isValidElement(child) && child.type === RStyle_1.default) {
                        return react_1.default.cloneElement(child, {
                            ref: _this.childRefs[i]
                        });
                    }
                    throw new TypeError('An RStyleArray should contain only RStyle elements');
                })));
                react_dom_1.default.render(render, document.createElement('div'));
                _this.ol = _this.childRefs.map(function (child) { return RStyle_1.default.getStyleStatic(child); });
            }
            return _this.ol;
        };
        _this.childRefs = [];
        return _this;
    }
    RStyleArray.prototype.refresh = function (prevProps) {
        _super.prototype.refresh.call(this);
        if (!this.props.render)
            this.ol = this.childRefs.map(function (child) { return RStyle_1.default.getStyleStatic(child); });
    };
    RStyleArray.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.Children.map(this.props.children, function (child, i) {
            if (react_1.default.isValidElement(child) && child.type === RStyle_1.default) {
                if (!_this.childRefs[i])
                    _this.childRefs[i] = react_1.default.createRef();
                return react_1.default.cloneElement(child, { ref: _this.childRefs[i] });
            }
            throw new TypeError('An RStyleArray should contain only RStyle elements');
        })));
    };
    return RStyleArray;
}(RStyle_1.default));
exports.default = RStyleArray;
//# sourceMappingURL=RStyleArray.js.map