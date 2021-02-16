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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var context_1 = require("../context");
var debug_1 = __importDefault(require("../debug"));
var RBase = (function (_super) {
    __extends(RBase, _super);
    function RBase(props, context) {
        var _this = _super.call(this, props, context) || this;
        if (!_this.context)
            throw new Error('A style property must be part of a style');
        _this.ol = _this.create(props);
        return _this;
    }
    RBase.prototype.create = function (props) {
        throw new Error('RBase is an abstract class');
    };
    RBase.prototype.refresh = function (prevProps) {
        var e_1, _a;
        debug_1.default('refreshStyle', this);
        try {
            for (var _b = __values(this.classProps), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                var m = p.charAt(0).toUpperCase() + p.substring(1);
                if ((prevProps && prevProps[p]) !== this.props[p]) {
                    if (this.ol['set' + m]) {
                        this.ol['set' + m](this.props[p]);
                    }
                    else {
                        throw new Error('Underlying OpenLayers object does not support updating of ' + p);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    RBase.prototype.set = function (ol) {
        return;
    };
    RBase.prototype.componentDidMount = function () {
        this.set(this.ol);
    };
    RBase.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if (prevProps !== this.props)
            this.refresh(prevProps);
    };
    RBase.prototype.componentWillUnmount = function () {
        this.set(null);
    };
    RBase.prototype.render = function () {
        return null;
    };
    RBase.contextType = context_1.RContext;
    RBase.classProps = [];
    return RBase;
}(react_1.default.PureComponent));
exports.default = RBase;
//# sourceMappingURL=RBase.js.map