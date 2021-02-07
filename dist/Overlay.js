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
exports.OverlayBase = void 0;
var react_1 = __importDefault(require("react"));
var ol_1 = require("ol");
var Feature_1 = require("./Feature");
var Event_1 = require("./Event");
var OverlayBase = (function (_super) {
    __extends(OverlayBase, _super);
    function OverlayBase(props, context) {
        var _a;
        var _this = _super.call(this, props, context) || this;
        _this.ol = new ol_1.Overlay({
            autoPan: (_a = props.autoPan) !== null && _a !== void 0 ? _a : true,
            autoPanAnimation: props.autoPanAnimation
        });
        _this.containerRef = react_1.default.createRef();
        return _this;
    }
    OverlayBase.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this.ol.setElement(this.containerRef.current);
        this.ol.setPosition(this.context.location);
    };
    OverlayBase.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.context.map.addOverlay(this.ol);
    };
    OverlayBase.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.context.map.removeOverlay(this.ol);
    };
    OverlayBase.prototype.render = function () {
        this.ol.setPosition(this.context.location);
        return (react_1.default.createElement("div", { ref: this.containerRef, className: this.props.className }, this.props.children));
    };
    OverlayBase.contextType = Feature_1.LocationContext;
    return OverlayBase;
}(Event_1.ReactLayersBase));
exports.OverlayBase = OverlayBase;
var Overlay = (function (_super) {
    __extends(Overlay, _super);
    function Overlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Overlay;
}(OverlayBase));
exports.default = Overlay;
//# sourceMappingURL=Overlay.js.map