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
Object.defineProperty(exports, "__esModule", { value: true });
var Overlay_1 = require("./Overlay");
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.toggle = function (e) {
            _this.visible = !_this.visible;
            _this.setPosition();
        };
        _this.show = function (e) {
            var _a, _b;
            if (_this.showing)
                return;
            if (_this.hiding)
                window.clearTimeout(_this.hiding);
            _this.showing = window.setTimeout(function () {
                _this.visible = true;
                _this.setPosition();
                _this.hiding = _this.showing = undefined;
            }, (_b = (_a = _this.props.delay) === null || _a === void 0 ? void 0 : _a.show) !== null && _b !== void 0 ? _b : 250);
        };
        _this.hide = function (e) {
            var _a, _b;
            if (_this.hiding)
                return;
            if (_this.showing)
                window.clearTimeout(_this.showing);
            _this.hiding = window.setTimeout(function () {
                _this.visible = false;
                _this.setPosition();
                _this.hiding = _this.showing = undefined;
            }, (_b = (_a = _this.props.delay) === null || _a === void 0 ? void 0 : _a.hide) !== null && _b !== void 0 ? _b : 50);
        };
        _this.visible = false;
        return _this;
    }
    Popup.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.unregister();
    };
    Popup.prototype.setPosition = function () {
        this.ol.setPosition(this.visible ? this.context.location : undefined);
    };
    Popup.prototype.unregister = function () {
        this.context.feature.un('click', this.toggle);
        this.context.feature.un('pointerenter', this.show);
        this.context.feature.un('pointerleave', this.hide);
    };
    Popup.prototype.refresh = function () {
        this.ol.setElement(this.containerRef.current);
        this.unregister();
        switch (this.props.trigger) {
            default:
            case 'click':
                this.context.feature.on('click', this.toggle);
                break;
            case 'hover':
                this.context.feature.on('pointerenter', this.show);
                this.context.feature.on('pointerleave', this.hide);
                break;
        }
        this.setPosition();
    };
    return Popup;
}(Overlay_1.OverlayBase));
exports.default = Popup;
//# sourceMappingURL=Popup.js.map