# react-layers

[![License: LGPL v3](https://img.shields.io/github/license/mmomtchev/react-layers)](https://github.com/mmomtchev/react-layers/blob/master/LICENSE)
[![Node.js CI](https://github.com/mmomtchev/react-layers/workflows/Node.js%20CI/badge.svg)](https://github.com/mmomtchev/react-layers/actions?query=workflow%3A%22Node.js+CI%22)
[![codecov](https://codecov.io/gh/mmomtchev/react-layers/branch/master/graph/badge.svg)](https://codecov.io/gh/mmomtchev/react-layers)


react-layers is an opinionated set of React components for *OpenLayers*.

It's design policy is:
* Fully Typescript-typed
* Do everything that faces the user the React way and not the *OpenLayers* way - `onClick` and `onPointerEnter`/`onPoinerLeave` handlers are typical examples
* If it does not face the user, it does not need to be React way - internally it uses inheritance, following the*OpenLayers* classes, over composition
* Simple things should be simple to do
* Expose all the advanced *OpenLayers* features - otherwise you are probably better with Leaflet
* Try to be as much SSR-friendly as possible (this is an upcoming feature, see more below)
* The current target is *OpenLayers* 6+
* zero-dependency when built except for React and OpenLayers (the examples have some dependencies)

It has nothing to do with *react-openlayers* which stopped at *OpenLayers* 3. In fact, it is more inspired by *react-leaflet* than *react-openlayers*.

## Installation

**(will be when it is published)**
```bash
npm --save install react-layers
npm --save install ol @types/ol # if you haven't already done so
npm --save install react react-dom  # if you haven't already done so
```

*OpenLayers* is a peer dependency - all *OpenLayers* 6+ versions should be supported.

## Usage

react-layers is a set of reusable React components that can be nested in various ways to create map applications for the web.
The components follow very closely the *OpenLayers* hierarchy with one notable exception: the layers and the sources abstraction levels have been fused in one.

Some care must be taken to avoid confusion between the *OpenLayers* classes and the react-layers classes which sometimes have the same names - this is probably something that will be solved before the initial release. Using separate namespaces is highly recommended.

The most important element is the <Map>. Every other element requires a parent to function - a <Layer> must be part of a map, a <Feature> must be part of a <LayerVector>, a <Control> must also be part of a map. Nesting works by using React Contexts. Every nested element uses the context of its nearest parent.

Currently there are 4 types of contexts:
* `MapContext` provided by a map, every other element must have a MapContext
* `LayerContext` provided by every layer, not required by anything at the moment
* `VectorLayerContext` provided by vector layers only - required for <Feature>
* `LocationContext` provided by a map feature - required for <Overlay> and <Popup>

The context objects can be accessed by using  `React.Context.Consumer` - [the custom controls example](https://mmomtchev.github.io/react-layers/#/controls) contains an example for using the *MapContext*. Accessing elements outside their contexts is possible by using `React.RefObject`s. [The high performance example](https://mmomtchev.github.io/react-layers/#/igc) contains an example of this. The underlying *OpenLayers* objects can be accessed through the `ol` property of every component. This is also something that could potentially change before the first release.

The examples can be found here:
<https://mmomtchev.github.io/react-layers/>

## Server-Side Rendering

Server-side rendering of map components is difficult - there is still no comprehensive solution. Besides the obvious complexities of rendering on canvas outside the browser, one of the major issues is that server-side rendering runs before the browser layout flowing - and thus must work independent of layout and resolution.

The best solution is to use a WMS-compatible server (such as Geoserver) and to serve prerendered maps over WMS - eventually replacing the initial image by a canvas.

An intermediate solution, which does not require extensive server-side investment (such as Geoserver), but is limited to static layout(s), is to prerender one (or one per screen size) image to be used as a temporary place-holder until the map is loading. In this case, at least some devices, will get an ugly looking map for the first few seconds.

Pushing the initial tiles is also an option:
* when combined with a WMS-server it could deliver pixel-perfect maps with on the first HTTP request
* without a WMS-server it could still avoid doing a large number of HTTP requests on the first load

## API

The API is not yet documented and it is still subject to change.

## License
[ISC](https://choosealicense.com/licenses/isc/)
