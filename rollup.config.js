import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
    input: 'dist/index.js',
    output: {
        file: 'dist/cdn-bundle.js',
        format: 'iife',
        inlineDynamicImports: true,
        sourcemap: true,
        name: 'rlayers',
        compact: true,
        globals: {
            ol: 'ol',
            react: 'React',
            'react-dom': 'ReactDOM',
            'ol/events/Event': 'ol.events.Event',
            'ol/extent': 'ol.extent',
            'ol/render/Event': 'ol.render.Event',
            'ol/style': 'ol.style',
            'ol/style/Style': 'ol.style.Style',
            'ol/format/WMTSCapabilities': 'ol.format.WMTSCapabilities',
            'ol/layer': 'ol.layer',
            'ol/layer/Image': 'ol.layer.Image',
            'ol/layer/Tile': 'ol.layer.Tile',
            'ol/layer/Graticule': 'ol.layer.Graticule',
            'ol/source': 'ol.source',
            'ol/source/TileWMS': 'ol.source.TileWMS',
            'ol/source/ImageWMS': 'ol.source.ImageWMS',
            'ol/source/Vector': 'ol.source.Vector',
            'ol/source/WMTS': 'ol.source.WMTS',
            'ol/source/ImageStatic': 'ol.source.ImageStatic',
            'ol/control': 'ol.control',
            'ol/control/MousePosition': 'ol.control.MousePosition',
            'ol/control/ZoomToExtent': 'ol.control.ZoomToExtent',
            'ol/interaction/DragBox': 'ol.interaction.DragBox',
            'ol/interaction/Translate': 'ol.interaction.Translate',
            'ol/interaction/Draw': 'ol.interaction.Draw',
            'ol/interaction/Modify': 'ol.interaction.Modify',
            'ol/interaction/DoubleClickZoom': 'ol.interaction.DoubleClickZoom',
            'ol/interaction/DragPan': 'ol.interaction.DragPan',
            'ol/interaction/DragRotate': 'ol.interaction.DragRotate',
            'ol/interaction/DragZoom': 'ol.interaction.DragZoom',
            'ol/interaction/MouseWheelZoom': 'ol.interaction.MouseWheelZoom',
            'ol/interaction/PinchRotate': 'ol.interaction.PinchRotate',
            'ol/interaction/PinchZoom': 'ol.interaction.PinchZoom',
            'ol/interaction/KeyboardPan': 'ol.interaction.KeyboardPan',
            'ol/interaction/KeyboardZoom': 'ol.interaction.KeyboardZoom',
            'ol/Geolocation': 'ol.Geolocation'
        }
    },
    external: [/node_modules\/(?!lru-cache|yallist)/],
    plugins: [
        nodeResolve({
            preferBuiltins: false
        }),
        commonjs(),
        terser()
    ]
};
