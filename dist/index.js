"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popup = exports.Overlay = exports.Feature = exports.Control = exports.LayerCluster = exports.LayerHeatmap = exports.LayerStamen = exports.LayerWMTS = exports.OSM = exports.LayerVector = exports.VectorContext = exports.LayerBaseVector = exports.LayerTile = exports.LayerContext = exports.Layer = exports.MapContext = exports.Map = exports.ReactLayersBase = exports.VectorSourceEvent = exports.RenderEvent = exports.MapBrowserEvent = exports.MapEvent = void 0;
require("ol/ol.css");
var ol_1 = require("ol");
Object.defineProperty(exports, "MapEvent", { enumerable: true, get: function () { return ol_1.MapEvent; } });
Object.defineProperty(exports, "MapBrowserEvent", { enumerable: true, get: function () { return ol_1.MapBrowserEvent; } });
var Event_1 = require("ol/render/Event");
Object.defineProperty(exports, "RenderEvent", { enumerable: true, get: function () { return __importDefault(Event_1).default; } });
var Vector_1 = require("ol/source/Vector");
Object.defineProperty(exports, "VectorSourceEvent", { enumerable: true, get: function () { return Vector_1.VectorSourceEvent; } });
var Event_2 = require("./Event");
Object.defineProperty(exports, "ReactLayersBase", { enumerable: true, get: function () { return Event_2.ReactLayersBase; } });
var Map_1 = require("./Map");
Object.defineProperty(exports, "Map", { enumerable: true, get: function () { return __importDefault(Map_1).default; } });
Object.defineProperty(exports, "MapContext", { enumerable: true, get: function () { return Map_1.MapContext; } });
var Layer_1 = require("./layer/Layer");
Object.defineProperty(exports, "Layer", { enumerable: true, get: function () { return __importDefault(Layer_1).default; } });
Object.defineProperty(exports, "LayerContext", { enumerable: true, get: function () { return Layer_1.LayerContext; } });
var LayerTile_1 = require("./layer/LayerTile");
Object.defineProperty(exports, "LayerTile", { enumerable: true, get: function () { return __importDefault(LayerTile_1).default; } });
var LayerBaseVector_1 = require("./layer/LayerBaseVector");
Object.defineProperty(exports, "LayerBaseVector", { enumerable: true, get: function () { return __importDefault(LayerBaseVector_1).default; } });
Object.defineProperty(exports, "VectorContext", { enumerable: true, get: function () { return LayerBaseVector_1.VectorContext; } });
var LayerVector_1 = require("./layer/LayerVector");
Object.defineProperty(exports, "LayerVector", { enumerable: true, get: function () { return __importDefault(LayerVector_1).default; } });
var OSM_1 = require("./layer/OSM");
Object.defineProperty(exports, "OSM", { enumerable: true, get: function () { return __importDefault(OSM_1).default; } });
var LayerWMTS_1 = require("./layer/LayerWMTS");
Object.defineProperty(exports, "LayerWMTS", { enumerable: true, get: function () { return __importDefault(LayerWMTS_1).default; } });
var LayerStamen_1 = require("./layer/LayerStamen");
Object.defineProperty(exports, "LayerStamen", { enumerable: true, get: function () { return __importDefault(LayerStamen_1).default; } });
var LayerHeatmap_1 = require("./layer/LayerHeatmap");
Object.defineProperty(exports, "LayerHeatmap", { enumerable: true, get: function () { return __importDefault(LayerHeatmap_1).default; } });
var LayerCluster_1 = require("./layer/LayerCluster");
Object.defineProperty(exports, "LayerCluster", { enumerable: true, get: function () { return __importDefault(LayerCluster_1).default; } });
var ScaleLine_1 = __importDefault(require("./control/ScaleLine"));
var Attribution_1 = __importDefault(require("./control/Attribution"));
var Zoom_1 = __importDefault(require("./control/Zoom"));
var Rotate_1 = __importDefault(require("./control/Rotate"));
var Custom_1 = __importDefault(require("./control/Custom"));
var Layers_1 = __importDefault(require("./control/Layers"));
var OverviewMap_1 = __importDefault(require("./control/OverviewMap"));
exports.Control = {
    ScaleLine: ScaleLine_1.default,
    Attribution: Attribution_1.default,
    Zoom: Zoom_1.default,
    Rotate: Rotate_1.default,
    Layers: Layers_1.default,
    OverviewMap: OverviewMap_1.default,
    Custom: Custom_1.default
};
var Feature_1 = require("./Feature");
Object.defineProperty(exports, "Feature", { enumerable: true, get: function () { return __importDefault(Feature_1).default; } });
var Overlay_1 = require("./Overlay");
Object.defineProperty(exports, "Overlay", { enumerable: true, get: function () { return __importDefault(Overlay_1).default; } });
var Popup_1 = require("./Popup");
Object.defineProperty(exports, "Popup", { enumerable: true, get: function () { return __importDefault(Popup_1).default; } });
//# sourceMappingURL=index.js.map