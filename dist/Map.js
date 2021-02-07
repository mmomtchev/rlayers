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
exports.MapContext = void 0;
var react_1 = __importDefault(require("react"));
var ol_1 = require("ol");
var Event_1 = require("./Event");
exports.MapContext = react_1.default.createContext(null);
var Map = (function (_super) {
    __extends(Map, _super);
    function Map(props) {
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
    Map.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.ol.setTarget(this.target.current);
    };
    Map.prototype.render = function () {
        return (react_1.default.createElement("div", { className: this.props.className, style: { width: this.props.width, height: this.props.height }, ref: this.target },
            react_1.default.createElement(exports.MapContext.Provider, { value: this.ol }, this.props.children)));
    };
    return Map;
}(Event_1.ReactLayersBase));
exports.default = Map;
//# sourceMappingURL=Map.js.map