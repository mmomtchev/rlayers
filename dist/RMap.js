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
                zoom: props.zoom,
                extent: props.extent,
                minResolution: props.minResolution,
                maxResolution: props.maxResolution,
                minZoom: props.minZoom,
                maxZoom: props.maxZoom
            })
        });
        return _this;
    }
    RMap.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.ol.setTarget(this.target.current);
    };
    RMap.prototype.refresh = function (prevProps) {
        var e_1, _a;
        _super.prototype.refresh.call(this);
        var view = this.ol.getView();
        try {
            for (var _b = __values(['minResolution', 'maxResolution', 'minZoom', 'maxZoom']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                var m = p.charAt(0).toUpperCase() + p.substring(1);
                if (this.props[p] !== undefined &&
                    view['set' + m] &&
                    this.props[p] !== view['get' + m]())
                    view['set' + m](this.props[p]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this.props.properties)
            this.ol.setProperties(this.props.properties);
    };
    RMap.prototype.render = function () {
        return (react_1.default.createElement("div", { className: this.props.className, style: { width: this.props.width, height: this.props.height }, ref: this.target },
            react_1.default.createElement(context_1.RMapContext.Provider, { value: this.ol }, this.props.children)));
    };
    return RMap;
}(REvent_1.ReactLayersBase));
exports.default = RMap;
//# sourceMappingURL=RMap.js.map