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
var Pointer_1 = __importDefault(require("ol/interaction/Pointer"));
var context_1 = require("../context");
var REvent_1 = require("../REvent");
var debug_1 = __importDefault(require("../debug"));
var RPointer = (function (_super) {
    __extends(RPointer, _super);
    function RPointer(props, context) {
        var _this = _super.call(this, props, context) || this;
        if (!_this.context || !_this.context.addInteraction)
            throw new Error('An interaction must be part of a map');
        _this.ol = _this.createOL(props);
        return _this;
    }
    RPointer.prototype.createOL = function (props) {
        this.classProps = RPointer.classProps;
        return new Pointer_1.default(props);
    };
    RPointer.prototype.refresh = function (prevProps) {
        var e_1, _a;
        try {
            for (var _b = __values(this.classProps), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                if (prevProps && prevProps[p] !== this.props[p]) {
                    debug_1.default('Replacing interaction', this, prevProps);
                    this.context.removeInteraction(this.ol);
                    this.ol = this.createOL(this.props);
                    this.context.addInteraction(this.ol);
                    break;
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
        _super.prototype.refresh.call(this);
    };
    RPointer.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.context.addInteraction(this.ol);
    };
    RPointer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.context.removeInteraction(this.ol);
    };
    RPointer.contextType = context_1.RMapContext;
    RPointer.classProps = ['handleDownEvent', 'handleDragEvent', 'handleMoveEvent', 'handleUpEvent'];
    return RPointer;
}(REvent_1.ReactLayersBase));
exports.default = RPointer;
//# sourceMappingURL=RPointer.js.map