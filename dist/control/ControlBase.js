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
var Map_1 = require("../Map");
var Event_1 = require("../Event");
var ControlBase = (function (_super) {
    __extends(ControlBase, _super);
    function ControlBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlBase.prototype.toOLProps = function (props) {
        var _a;
        return {
            target: (_a = props.target) === null || _a === void 0 ? void 0 : _a.current
        };
    };
    ControlBase.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this.ol.setProperties(this.toOLProps(this.props));
    };
    ControlBase.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.context.addControl(this.ol);
    };
    ControlBase.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.context.removeControl(this.ol);
    };
    ControlBase.contextType = Map_1.MapContext;
    return ControlBase;
}(Event_1.ReactLayersBase));
exports.default = ControlBase;
//# sourceMappingURL=ControlBase.js.map