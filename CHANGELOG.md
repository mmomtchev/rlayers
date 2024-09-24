# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

##

-   Fix [#280](https://github.com/mmomtchev/rlayers/issues/280), `<RContol.RCustom>` cannot be used as anchor for inserting new elements

## [3.2.0] 2024-09-24

-   Fixed `package-lock.json`
-   OpenLayers 10.2.0 support
-   Fix [#276](https://github.com/mmomtchev/rlayers/issues/276), extending `rlayers` example needs `ol-mapbox-style`

## [3.1.0] 2024-07-27

-   OpenLayers 10 support
-   Fix [#270](https://github.com/mmomtchev/rlayers/issues/270), dynamic `<RStyle>` elements with a `render` property do not always update properly

### [3.0.1] 2024-05-23

-   Drop React 16/17, React 18 is now required
-   For OpenLayers 9.2.3

# [3.0.0] 2024-05-22

-   Do not support multiple OpenLayers versions, link each `rlayers` to one OpenLayers minor version
-   Support light-weight `RenderFeature`s, these are opt-out for vector tile layers and opt-in for vector layers
-   Use the same level of typing as OpenLayers
-   For OpenLayers 9.2.2

### [2.3.2] 2024-05-22

-   Fix [#252](https://github.com/mmomtchev/rlayers/issues/252), stop event propagation when the event handler returns `false`
-   Add React 18.3 as a test target

### [2.3.1] 2024-03-24

-   Support OpenLayers 9.1.0
-   Fix [#220](https://github.com/mmomtchev/rlayers/issues/220), use correct event names for `RModify` in TypeScript

## [2.3.0] 2024-02-27

-   Support OpenLayers 9.0.0

## [2.2.0] 2023-11-20

-   Support OpenLayers 8.2.0
-   Support using TypeScript generics to specify the feature geometry type for vector layers

## [2.1.0] 2023-09-13

-   Support OpenLayers 8.0.0 and 8.1.0
-   Replace `RLayerStamen` with `RLayerStadia` which requires OpenLayers 8.0.0

# [2.0.0] 2023-08-16

-   Vastly improved event handling performance avoiding expensive `forEachFeatureAtPixel` on layers that do not have event handlers
-   Add the `useOL()` and `useRLayersComponent()` component hooks allowing to easily access the containing OpenLayers and _rlayers_ components
-   Layer event handlers are now independent of feature event handlers, if both the feature and its containing layer have declared an event handler, both will be called
-   Fix `onClick` handlers on `RLayerVectorTiles` layers
-   Use TypeScript `protected` and `private` to restrict methods that are not expected to be directly used from user code
-   Support all positioning options in `ROverlay`
-   Support OpenLayers 7.5.1

### [1.5.3] 2023-07-30

-   Fix [#169](https://github.com/mmomtchev/rlayers/issues/169), support TypeScript 5.x
-   Add `onFeaturesLoadStart` and `onFeaturesLoadError` events to all vector layers
-   Fix [#163](https://github.com/mmomtchev/rlayers/issues/163), DOMException when removing an `ROverlay`

### [1.5.2] 2023-06-11

-   Support OpenLayers 7.4.0

### [1.5.1] 2023-05-30

-   Declare `RLayerRasterMBTiles` and `RLayerVectorMBTiles` as public exports

## [1.5.0] 2023-05-30

-   Add remote `.mbtiles` support with [`ol-mbtiles`](https://github.com/mmomtchev/ol-mbtiles)
-   Add new _rlayers_-specific events to `RLayerWMTS` and `RLayerRasterMBTiles` to distinguish them from the OpenLayers `onSourceReady` events
-   Fix [#149](https://github.com/mmomtchev/rlayers/issues/149), `RLayerWMTS` `visible` property does not trigger a refresh
-   Add `onPointerLeave` handlers for vector tiles

### [1.4.9] 2023-03-28

-   Support OpenLayers 7.3.0
-   Allow using projections other than Web Mercator with `RVectorTile` (the vector tile projection must still match the view projection)
-   Fix [#133], certain layer properties do not update if they transition from a defined value to `undefined`
-   Fix [#144](https://github.com/mmomtchev/rlayers/issues/144), update WMTS layers only when the metadata is changed
-   Add a `RLayerGeoTIFF` custom component, resolves [#145](https://github.com/mmomtchev/rlayers/issues/145)

### [1.4.8] 2023-01-08

-   Support additional `<RMap>` properties, including disabling of the rotation
-   Fix [#109], interactions do not support JSX styles
-   Add event callbacks to `RDraw` and `RModify`
-   Allow setting of `wrapX` for vector layers
-   Fix [#121], reprojected tile layers do not automatically refresh when setting the URL

### [1.4.7] 2022-12-23

-   Support OpenLayers 7.2.2

### [1.4.6] 2022-12-23

-   Support OpenLayers 7.2.0
-   Add `RLayerImage` for displaying a static image as a map
-   Add `RBackground` for setting background properties of `RText`
-   Support all `Text` parameters in OpenLayers
-   Add `RGraticule` for displaying a graticule

### [1.4.5] 2022-10-26

-   Fix [#85], dynamic properties of `RText` are not updated
-   Fix [#89], support inline styles in `RLayerVectorTile`

### [1.4.4] 2022-09-26

-   Support OpenLayers 7.1.0
-   Fix [#80], error when compiling the layers control with TypeScript 4.8
-   Fix [#82], direct enumeration of features does not work with clustering

### [1.4.3] 2022-08-19

-   Support OpenLayers 7.0.0
-   Support React 18.2
-   Correctly use `&nbsp` as a default placeholder value for `RMousePosition`

### [1.4.2] 2022-07-29

-   Support OpenLayers 6.15 and 6.15.1

### [1.4.1] 2022-05-26

-   Allow direct import of `rlayers/control/layers.css`

## [1.4.0] 2022-05-26

-   Provide an alternative ES6 modules version of rlayers with a `package.json` exports map
-   Provide a CDN bundle version for direct inclusion in static pages
-   Render the examples in React 18 mode when available
-   New documentation subsystem based on `documentation.js` with `documentation-hipster`
-   Expose the interpolation option for `RLayerTile` and `RLayerTileWebGL` [#59]
-   Add `RMousePosition` control for `ol.control.MousePosition` [#60]
-   Add `RZoomToExtent` control for `ol.control.ZoomToExtent` [#61]
-   Always use `ProjectionLike` type for projections [#62]
-   Support setting and reading the resolution in `RView`

### [1.3.4] 2022-04-26

-   TypeScript compatibility with `@types/react@18.0.0`

### [1.3.3] 2022-04-26

-   Support React 18
-   Support OpenLayers 6.14.1

### [1.3.2] 2022-03-26

-   Support OpenLayers 6.14
-   Fix [#37], build directly in package root

### [1.3.1] 2022-02-27

-   Support OpenLayers 6.13
-   Add `RLayerVectorImage` supporting OpenLayers `VectorImage` layers

## [1.3.0] 2022-01-28

-   Support OpenLayers 6.12
-   Initial WebGL support
-   Fix [#27], do not lose the event handlers when updating properties that require replacing the underlying _OpenLayers_ object, impacts the interactions and `RFeature` with `feature=` property

### [1.2.1] 2022-01-04

-   Restrict OpenLayers to 6.6 to 6.9.99 for the rlayers 1.2 branch, OpenLayers 6.10 requires rlayers 1.3
-   Fix [#20], renderBuffer parameter ignored

## [1.2.0] 2021-12-16

-   Have strict types for `this` and `event.target` whenever possible in the event handlers
-   Support replacing the bound _OpenLayers_ feature object when updating an `RFeature`
-   Fix wrong `this` object in `RLayerWMTS.onSourceReady`
-   Implement collapsing via React property setting for `RAttribution` and `ROverview`, waiting on <https://github.com/openlayers/openlayers/issues/13050> for a two-way external control

### [1.1.1] 2021-11-01

-   Fix published package

## [1.1.0] 2021-10-29

-   Drop support for _OpenLayers_ <6.6
-   Switch to the built-in TypeScript bindings in _OpenLayers_ >=6.6
-   Add basic WMS/TileWMS support
-   Support `zIndex` in `RStyle`
-   Fix [#13]: Dynamic rendering in `RStyleArray`
-   Fix [#14]: Set the projection in `RLayerTileWMS`
-   Fix [#15]: Properly unmount vector layers

### [1.0.4] 2021-07-10

-   Fix [#3]: Path to the example css for the layers control
-   Fix [#4]: More tsc `strict: true` mode compatibility fixes for React 17

### [1.0.3] 2021-06-24

-   Fix [#2]: Support importing from tsc with `strict: true`

### [1.0.2] 2021-06-02

-   Fix [#1]: Crash when removing `<RFeature>` from `<RLayerVector>`, reported by [@jonas-peeters](https://github.com/jonas-peeters)

### [1.0.1] 2021-04-09

-   Solve a version conflict in the NPM registry

# [1.0.0] 2021-04-09

-   First release
