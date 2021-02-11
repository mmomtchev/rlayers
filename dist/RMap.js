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
var ol_1 = require("ol");
var context_1 = require("./context");
var REvent_1 = require("./REvent");
var RMap = (function (_super) {
    __extends(RMap, _super);
    function RMap(props) {
        var _this = _super.call(this, props) || this;
        _this.target = react_1.default.createRef();
        _this.ol = new ol_1.Map({
            controls: props.noDefaultControls ? [] : undefined,
            view: new ol_1.View({
                projection: props.projection,
                center: props.center,
                zoom: props.zoom
            })
        });
        return _this;
    }
    RMap.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.ol.setTarget(this.target.current);
    };
    RMap.prototype.render = function () {
        return (react_1.default.createElement("div", { className: this.props.className, style: { width: this.props.width, height: this.props.height }, ref: this.target },
            react_1.default.createElement(context_1.RMapContext.Provider, { value: this.ol }, this.props.children)));
    };
    return RMap;
}(REvent_1.ReactLayersBase));
exports.default = RMap;
//# sourceMappingURL=RMap.js.map