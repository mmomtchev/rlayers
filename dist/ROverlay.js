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
var REvent_1 = require("./REvent");
var ROverlayBase = (function (_super) {
    __extends(ROverlayBase, _super);
    function ROverlayBase(props, context) {
        var _a;
        var _this = _super.call(this, props, context) || this;
        if (!((_a = _this.context) === null || _a === void 0 ? void 0 : _a.location))
            throw new Error('An overlay must be part of a location provider (ie RFeature)');
        _this.ol = new ol_1.Overlay({
            autoPan: props.autoPan,
            autoPanAnimation: props.autoPanAnimation
        });
        _this.containerRef = react_1.default.createRef();
        return _this;
    }
    ROverlayBase.prototype.setPosition = function () {
        var _a;
        this.ol.setPosition(this.context.location);
        if (this.props.autoPosition && ((_a = this.containerRef) === null || _a === void 0 ? void 0 : _a.current)) {
            this.containerRef.current.style.position = 'absolute';
            var pixel = this.context.map.getPixelFromCoordinate(this.context.location);
            var size = this.context.map.getSize();
            if (pixel[0] > size[0] / 2) {
                this.containerRef.current.style.left = null;
                this.containerRef.current.style.right = '0px';
            }
            else {
                this.containerRef.current.style.left = '0px';
                this.containerRef.current.style.right = null;
            }
            if (pixel[1] > size[1] / 2) {
                this.containerRef.current.style.top = null;
                this.containerRef.current.style.bottom = '0px';
            }
            else {
                this.containerRef.current.style.top = '0px';
                this.containerRef.current.style.bottom = null;
            }
        }
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
    return ROverlayBase;
}(REvent_1.RlayersBase));
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