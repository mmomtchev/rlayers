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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var control_1 = require("ol/control");
require("./layers.css");
var context_1 = require("../context");
var RControlBase_1 = __importDefault(require("./RControlBase"));
var RLayers = (function (_super) {
    __extends(RLayers, _super);
    function RLayers(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.onchange = function () { return _this.forceUpdate(); };
        _this.clickCollapse = function () {
            _this.setState({ collapsed: !_this.state.collapsed });
        };
        _this.targetRef = react_1.default.createRef();
        _this.state = { collapsed: true, visible: [true] };
        return _this;
    }
    RLayers.prototype.componentDidMount = function () {
        this.ol = new control_1.Control(this.toOLProps(this.props));
        _super.prototype.componentDidMount.call(this);
        this.context.on('change', this.onchange);
        this.forceUpdate();
    };
    RLayers.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.context.un('change', this.onchange);
    };
    RLayers.prototype.toOLProps = function (props) {
        var _a;
        return __assign(__assign({}, _super.prototype.toOLProps.call(this, props)), { element: (_a = this.targetRef) === null || _a === void 0 ? void 0 : _a.current });
    };
    RLayers.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var visible = react_1.default.Children.map(this.props.children, function (child, i) {
            var _a;
            if (react_1.default.isValidElement(child)) {
                return (_a = _this.state.visible[i]) !== null && _a !== void 0 ? _a : false;
            }
        });
        var labels = react_1.default.Children.map(this.props.children, function (child) {
            var _a, _b;
            if (react_1.default.isValidElement(child)) {
                return (_b = (_a = child.props.properties) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : 'no label';
            }
        });
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: ['ol-control', (_a = this.props.className) !== null && _a !== void 0 ? _a : 'ol-layers-control'].join(' '), ref: this.targetRef },
                react_1.default.createElement("span", { onClick: this.clickCollapse }, (_b = this.props.element) !== null && _b !== void 0 ? _b : react_1.default.createElement("button", null, "=")),
                this.state.collapsed ? null : (react_1.default.createElement("div", null, labels.map(function (l, i) { return (react_1.default.createElement("div", { key: i },
                    react_1.default.createElement("input", { type: 'radio', id: i.toString(), name: l, value: i.toString(), checked: visible[i], onChange: function () {
                            for (var v in visible) {
                                visible[v] = false;
                            }
                            visible[i] = true;
                            _this.setState({ visible: __spread(visible), collapsed: true });
                        } }),
                    react_1.default.createElement("label", { htmlFor: i.toString() }, l))); })))),
            react_1.default.Children.map(this.props.children, function (child, i) {
                if (react_1.default.isValidElement(child)) {
                    return react_1.default.cloneElement(child, { visible: visible[i] });
                }
                return child;
            })));
    };
    RLayers.contextType = context_1.RMapContext;
    return RLayers;
}(RControlBase_1.default));
exports.default = RLayers;
//# sourceMappingURL=RLayers.js.map