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
exports.ROverlayBase = void 0;
var react_1 = __importDefault(require("react"));
var ol_1 = require("ol");
var context_1 = require("./context");
var REvent_1 = require("./REvent");
var ROverlayBase = (function (_super) {
    __extends(ROverlayBase, _super);
    function ROverlayBase(props, context) {
        var _a;
        var _this = _super.call(this, props, context) || this;
        if (!_this.context || !_this.context.layer)
            throw new Error('An overlay must be part of a location provider (ie RFeature)');
        _this.ol = new ol_1.Overlay({
            autoPan: (_a = props.autoPan) !== null && _a !== void 0 ? _a : true,
            autoPanAnimation: props.autoPanAnimation
        });
        _this.containerRef = react_1.default.createRef();
        return _this;
    }
    ROverlayBase.prototype.setPosition = function () {
        this.ol.setPosition(this.context.location);
    };
    ROverlayBase.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this.ol.setElement(this.containerRef.current);
        this.setPosition();
    };
    ROverlayBase.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.context.map.addOverlay(this.ol);
    };
    ROverlayBase.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.context.map.removeOverlay(this.ol);
    };
    ROverlayBase.prototype.render = function () {
        this.setPosition();
        return (react_1.default.createElement("div", { ref: this.containerRef, className: this.props.className }, this.props.children));
    };
    ROverlayBase.contextType = context_1.RLocationContext;
    return ROverlayBase;
}(REvent_1.ReactLayersBase));
exports.ROverlayBase = ROverlayBase;
var ROverlay = (function (_super) {
    __extends(ROverlay, _super);
    function ROverlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ROverlay;
}(ROverlayBase));
exports.default = ROverlay;
//# sourceMappingURL=ROverlay.js.map