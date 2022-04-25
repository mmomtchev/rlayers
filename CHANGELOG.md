# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] WIP
 * Support React 18
 * Support OpenLayers 6.14.1

### [1.3.2] 2022-03-26

 * Support OpenLayers 6.14
 * Fix [#37], build directly in package root

### [1.3.1] 2022-02-27

 * Support OpenLayers 6.13
 * Add `RLayerVectorImage` supporting OpenLayers `VectorImage` layers

## [1.3.0] 2022-01-28

 * Support OpenLayers 6.12
 * Initial WebGL support
 * Fix [#27], do not lose the event handlers when updating properties that require replacing the underlying *OpenLayers* object, impacts the interactions and `RFeature` with `feature=` property

### [1.2.1] 2022-01-04

 * Restrict OpenLayers to 6.6 to 6.9.99 for the rlayers 1.2 branch, OpenLayers 6.10 requires rlayers 1.3
 * Fix [#20], renderBuffer parameter ignored

## [1.2.0] 2021-12-16

* Have strict types for `this` and `event.target` whenever possible in the event handlers
* Support replacing the bound *OpenLayers* feature object when updating an `RFeature`
* Fix wrong `this` object in `RLayerWMTS.onSourceReady`
* Implement collapsing via React property setting for `RAttribution` and `ROverview`, waiting on <https://github.com/openlayers/openlayers/issues/13050> for a two-way external control

### [1.1.1] 2021-11-01

* Fix published package

## [1.1.0] 2021-10-29

* Drop support for *OpenLayers* <6.6
* Switch to the built-in TypeScript bindings in *OpenLayers* >=6.6
* Add basic WMS/TileWMS support
* Support `zIndex` in `RStyle`
* Fix [#13]: Dynamic rendering in `RStyleArray`
* Fix [#14]: Set the projection in `RLayerTileWMS`
* Fix [#15]: Properly unmount vector layers

### [1.0.4] 2021-07-10

* Fix [#3]: Path to the example css for the layers control
* Fix [#4]: More tsc `strict: true` mode compatibility fixes for React 17

### [1.0.3] 2021-06-24

* Fix [#2]: Support importing from tsc with `strict: true`

### [1.0.2] 2021-06-02

* Fix [#1]: Crash when removing `<RFeature>` from `<RLayerVector>`, reported by [@jonas-peeters](https://github.com/jonas-peeters)

### [1.0.1] 2021-04-09

* Solve a version conflict in the NPM registry

# [1.0.0] 2021-04-09

* First release