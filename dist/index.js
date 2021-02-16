"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPopup = exports.ROverlay = exports.RFeature = exports.RStyle = exports.RInteraction = exports.RControl = exports.RLayerVectorTile = exports.RLayerCluster = exports.RLayerHeatmap = exports.RLayerStamen = exports.RLayerTileJSON = exports.RLayerWMTS = exports.ROSM = exports.RLayerVector = exports.RLayerBaseVector = exports.RLayerTile = exports.RLayer = exports.RMap = exports.RStyleContext = exports.RLocationContext = exports.RVectorContext = exports.RLayerContext = exports.RMapContext = exports.RlayersBase = exports.VectorSourceEvent = exports.RenderEvent = exports.MapBrowserEvent = exports.MapEvent = void 0;
var ol_1 = require("ol");
Object.defineProperty(exports, "MapEvent", { enumerable: true, get: function () { return ol_1.MapEvent; } });
Object.defineProperty(exports, "MapBrowserEvent", { enumerable: true, get: function () { return ol_1.MapBrowserEvent; } });
var Event_1 = require("ol/render/Event");
Object.defineProperty(exports, "RenderEvent", { enumerable: true, get: function () { return __importDefault(Event_1).default; } });
var Vector_1 = require("ol/source/Vector");
Object.defineProperty(exports, "VectorSourceEvent", { enumerable: true, get: function () { return Vector_1.VectorSourceEvent; } });
var REvent_1 = require("./REvent");
Object.defineProperty(exports, "RlayersBase", { enumerable: true, get: function () { return REvent_1.RlayersBase; } });
var context_1 = require("./context");
Object.defineProperty(exports, "RMapContext", { enumerable: true, get: function () { return context_1.RMapContext; } });
Object.defineProperty(exports, "RLayerContext", { enumerable: true, get: function () { return context_1.RLayerContext; } });
Object.defineProperty(exports, "RVectorContext", { enumerable: true, get: function () { return context_1.RVectorContext; } });
Object.defineProperty(exports, "RLocationContext", { enumerable: true, get: function () { return context_1.RLocationContext; } });
Object.defineProperty(exports, "RStyleContext", { enumerable: true, get: function () { return context_1.RStyleContext; } });
var RMap_1 = require("./RMap");
Object.defineProperty(exports, "RMap", { enumerable: true, get: function () { return __importDefault(RMap_1).default; } });
var RLayer_1 = require("./layer/RLayer");
Object.defineProperty(exports, "RLayer", { enumerable: true, get: function () { return __importDefault(RLayer_1).default; } });
var RLayerTile_1 = require("./layer/RLayerTile");
Object.defineProperty(exports, "RLayerTile", { enumerable: true, get: function () { return __importDefault(RLayerTile_1).default; } });
var RLayerBaseVector_1 = require("./layer/RLayerBaseVector");
Object.defineProperty(exports, "RLayerBaseVector", { enumerable: true, get: function () { return __importDefault(RLayerBaseVector_1).default; } });
var RLayerVector_1 = require("./layer/RLayerVector");
Object.defineProperty(exports, "RLayerVector", { enumerable: true, get: function () { return __importDefault(RLayerVector_1).default; } });
var ROSM_1 = require("./layer/ROSM");
Object.defineProperty(exports, "ROSM", { enumerable: true, get: function () { return __importDefault(ROSM_1).default; } });
var RLayerWMTS_1 = require("./layer/RLayerWMTS");
Object.defineProperty(exports, "RLayerWMTS", { enumerable: true, get: function () { return __importDefault(RLayerWMTS_1).default; } });
var RLayerTileJSON_1 = require("./layer/RLayerTileJSON");
Object.defineProperty(exports, "RLayerTileJSON", { enumerable: true, get: function () { return __importDefault(RLayerTileJSON_1).default; } });
var RLayerStamen_1 = require("./layer/RLayerStamen");
Object.defineProperty(exports, "RLayerStamen", { enumerable: true, get: function () { return __importDefault(RLayerStamen_1).default; } });
var RLayerHeatmap_1 = require("./layer/RLayerHeatmap");
Object.defineProperty(exports, "RLayerHeatmap", { enumerable: true, get: function () { return __importDefault(RLayerHeatmap_1).default; } });
var RLayerCluster_1 = require("./layer/RLayerCluster");
Object.defineProperty(exports, "RLayerCluster", { enumerable: true, get: function () { return __importDefault(RLayerCluster_1).default; } });
var RLayerVectorTile_1 = require("./layer/RLayerVectorTile");
Object.defineProperty(exports, "RLayerVectorTile", { enumerable: true, get: function () { return __importDefault(RLayerVectorTile_1).default; } });
exports.RControl = __importStar(require("./control"));
exports.RInteraction = __importStar(require("./interaction"));
exports.RStyle = __importStar(require("./style"));
var RFeature_1 = require("./RFeature");
Object.defineProperty(exports, "RFeature", { enumerable: true, get: function () { return __importDefault(RFeature_1).default; } });
var ROverlay_1 = require("./ROverlay");
Object.defineProperty(exports, "ROverlay", { enumerable: true, get: function () { return __importDefault(ROverlay_1).default; } });
var RPopup_1 = require("./RPopup");
Object.defineProperty(exports, "RPopup", { enumerable: true, get: function () { return __importDefault(RPopup_1).default; } });
//# sourceMappingURL=index.js.map