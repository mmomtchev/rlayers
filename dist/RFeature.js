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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ol_1 = require("ol");
var ol_2 = require("ol");
var extent_1 = require("ol/extent");
var context_1 = require("./context");
var REvent_1 = require("./REvent");
var RStyle_1 = __importDefault(require("./style/RStyle"));
var debug_1 = __importDefault(require("./debug"));
var RFeature = (function (_super) {
    __extends(RFeature, _super);
    function RFeature(props, context) {
        var _a, _b;
        var _this = _super.call(this, props, context) || this;
        if (!((_a = _this === null || _this === void 0 ? void 0 : _this.context) === null || _a === void 0 ? void 0 : _a.vectorlayer))
            throw new Error('An RFeature must be part of a vector layer');
        if (props.feature)
            _this.ol = props.feature;
        else
            _this.ol = new ol_2.Feature(__assign(__assign({}, ((_b = props.properties) !== null && _b !== void 0 ? _b : {})), { geometry: props.geometry, style: RStyle_1.default.getStyle(props.style) }));
        RFeature.initEventRelay(_this.context.map);
        _this.onchange = function () { return _this.forceUpdate(); };
        return _this;
    }
    RFeature.initEventRelay = function (map) {
        var e_1, _a;
        try {
            for (var _b = __values(RFeature.pointerEvents), _c = _b.next(); !_c.done; _c = _b.next()) {
                var ev = _c.value;
                map.on(ev, RFeature.eventRelay);
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
    RFeature.dispatchEvent = function (fr, event) {
        var _a;
        if (!fr.feature)
            return true;
        if (fr.feature.dispatchEvent)
            return fr.feature.dispatchEvent(event);
        if (!event.target)
            event.target = fr.feature;
        if ((_a = fr.layer) === null || _a === void 0 ? void 0 : _a.get('_on' + event.type))
            return fr.layer.get('_on' + event.type)(event);
        return true;
    };
    RFeature.eventRelay = function (e) {
        var e_2, _a, e_3, _b, e_4, _c, e_5, _d, e_6, _e;
        var triggered = [];
        e.map.forEachFeatureAtPixel(e.pixel, function (f, l) { return triggered.push({ feature: f, layer: l }) && false; }, {
            hitTolerance: RFeature.hitTolerance
        });
        if (e.dragging) {
            if (!RFeature.lastFeaturesDragged.length)
                RFeature.lastFeaturesDragged = __spread(triggered);
            var _loop_1 = function (fr) {
                if (!triggered.find(function (f) { return f.feature === fr.feature; }))
                    triggered.push(fr);
            };
            try {
                for (var _f = __values(RFeature.lastFeaturesDragged), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var fr = _g.value;
                    _loop_1(fr);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            try {
                for (var _h = __values(RFeature.lastFeaturesDragged), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var fr = _j.value;
                    RFeature.dispatchEvent(fr, new ol_1.MapBrowserEvent('pointerdragend', e.map, e.originalEvent));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                }
                finally { if (e_3) throw e_3.error; }
            }
            RFeature.lastFeaturesDragged = [];
        }
        if (e.type === 'pointermove') {
            var _loop_2 = function (fr) {
                if (!triggered.find(function (f) { return f.feature === fr.feature; })) {
                    RFeature.dispatchEvent(fr, new ol_1.MapBrowserEvent('pointerleave', e.map, e.originalEvent));
                    fr.feature = null;
                    fr.layer = null;
                }
            };
            try {
                for (var _k = __values(RFeature.lastFeaturesEntered), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var fr = _l.value;
                    _loop_2(fr);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                }
                finally { if (e_4) throw e_4.error; }
            }
            RFeature.lastFeaturesEntered = RFeature.lastFeaturesEntered.filter(function (fr) { return fr.feature; });
            var _loop_3 = function (fr) {
                if (!RFeature.lastFeaturesEntered.find(function (f) { return f.feature === fr.feature; })) {
                    RFeature.dispatchEvent(fr, new ol_1.MapBrowserEvent('pointerenter', e.map, e.originalEvent));
                    RFeature.lastFeaturesEntered.push(fr);
                }
            };
            try {
                for (var triggered_1 = __values(triggered), triggered_1_1 = triggered_1.next(); !triggered_1_1.done; triggered_1_1 = triggered_1.next()) {
                    var fr = triggered_1_1.value;
                    _loop_3(fr);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (triggered_1_1 && !triggered_1_1.done && (_d = triggered_1.return)) _d.call(triggered_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        try {
            for (var triggered_2 = __values(triggered), triggered_2_1 = triggered_2.next(); !triggered_2_1.done; triggered_2_1 = triggered_2.next()) {
                var fr = triggered_2_1.value;
                if (RFeature.dispatchEvent(fr, new ol_1.MapBrowserEvent(e.type, e.map, e.originalEvent)) ===
                    false)
                    return false;
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (triggered_2_1 && !triggered_2_1.done && (_e = triggered_2.return)) _e.call(triggered_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return true;
    };
    RFeature.prototype.refresh = function (prevProps) {
        _super.prototype.refresh.call(this, prevProps);
        if (this.props.properties !== (prevProps === null || prevProps === void 0 ? void 0 : prevProps.properties))
            this.ol.setProperties(this.props.properties);
        if (this.props.geometry !== (prevProps === null || prevProps === void 0 ? void 0 : prevProps.geometry))
            this.ol.setGeometry(this.props.geometry);
        if (this.props.style !== (prevProps === null || prevProps === void 0 ? void 0 : prevProps.style))
            this.ol.setStyle(RStyle_1.default.getStyle(this.props.style));
    };
    RFeature.prototype.componentDidMount = function () {
        debug_1.default('didMount', this.ol);
        _super.prototype.componentDidMount.call(this);
        this.ol.on('change', this.onchange);
        this.context.vectorsource.addFeature(this.ol);
    };
    RFeature.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.ol.un('change', this.onchange);
        this.context.vectorsource.removeFeature(this.ol);
    };
    RFeature.prototype.render = function () {
        var _a, _b;
        var extent = (_b = (_a = this.ol) === null || _a === void 0 ? void 0 : _a.getGeometry()) === null || _b === void 0 ? void 0 : _b.getExtent();
        var center = extent && extent_1.getCenter(extent);
        return (react_1.default.createElement(context_1.RContext.Provider, { value: {
                map: this.context.map,
                layer: this.context.vectorlayer,
                source: this.context.vectorsource,
                feature: this.ol,
                location: center
            } }, this.props.children));
    };
    RFeature.pointerEvents = ['click', 'pointerdrag', 'pointermove', 'singleclick', 'dblclick'];
    RFeature.lastFeaturesEntered = [];
    RFeature.lastFeaturesDragged = [];
    RFeature.hitTolerance = 10;
    return RFeature;
}(REvent_1.RlayersBase));
exports.default = RFeature;
//# sourceMappingURL=RFeature.js.map