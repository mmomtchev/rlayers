# rlayers - React Components for OpenLayers 6+

![logo](https://raw.githubusercontent.com/mmomtchev/rlayers/master/rlayers-logo.svg)

[![License: ISC](https://img.shields.io/github/license/mmomtchev/rlayers)](https://github.com/mmomtchev/rlayers/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/rlayers)](https://www.npmjs.com/package/rlayers)
[![Node.js CI](https://github.com/mmomtchev/rlayers/workflows/Node.js%20CI/badge.svg)](https://github.com/mmomtchev/rlayers/actions?query=workflow%3A%22Node.js+CI%22)
[![codecov](https://codecov.io/gh/mmomtchev/rlayers/branch/master/graph/badge.svg)](https://codecov.io/gh/mmomtchev/rlayers)
[![downloads](https://img.shields.io/npm/dm/rlayers)](https://www.npmjs.com/package/rlayers)

![© OpenStreetMap contributors](https://gist.githubusercontent.com/mmomtchev/e789dfa545b97c7ae97770f1b5606172/raw/79b486bcc8c45b069e3a8f552c82360de80febff/ref1.png)
![Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)](https://gist.githubusercontent.com/mmomtchev/e789dfa545b97c7ae97770f1b5606172/raw/79b486bcc8c45b069e3a8f552c82360de80febff/ref2.png)

_rlayers_ is an opinionated set of _React_ components for _OpenLayers_.

It's design policy is:

-   Fully Typescript-typed
-   Do everything that faces the user the **_React_ way** and not the _OpenLayers_ way - `onClick` and `onPointerEnter`/`onPoinerLeave` handlers are typical examples
-   If it does not face the user, it does not need to be _React_ way - internally it uses inheritance, following the _OpenLayers_ classes, over composition
-   Simple things should be simple to do, performance optimizations should not get in the way unless needed
-   If taking shortcuts when updating the components, always err on the safe side but do provide an override method that allows to come close to the raw OpenLayers performance
-   Expose all the advanced _OpenLayers_ features
-   Try to be as much SSR-friendly as possible (this feature is currently in POC stage, see below)
-   The current target is _OpenLayers_ 6+
-   Avoid dependencies when built except for _React_ and OpenLayers (the examples have some dependencies) - currently the single one is [`lru-cache`](https://www.npmjs.com/package/lru-cache) at 8Kbytes

## Long term support of this project

The birth of this project is related to a huge extortion in the geography community linked to a sexual harassment affair covered up by the French Judiciary. It is maintained as a free service to the geography community so that it can remain as a remainder to a number of companies - including Camptocamp, ESRI, Mapbox and Makina Corpus - that the most noble way to claim size bragging rights is to produce good software. You can safely use this framework in your projects, be assured that it will be maintained very well and for many years to come. It's companion project on the server-side is [`gdal-async`](https://github.com/mmomtchev/node-gdal-async).

## Alternatives

**<- Light-Weight --- Feature-Rich ->**

[pigeon-maps](https://pigeon-maps.js.org/) - [react-leaflet](https://react-leaflet.js.org/) - [rlayers](https://mmomtchev.github.io/rlayers/)

Among the completely free and open source alternatives for creating maps with _React_, on a scale going from the most light-weight to the most feature-rich solution, _rlayers_ is the right-most one.

It offers the full power _OpenLayers_ - dynamic reprojections, comprehensive event handlers, a very rich set of supported formats, interfaces and layer types and a very good performance for very complex maps. This comes at the price of a quite significant total bundle size.

## Installation

```bash
npm --save install rlayers ol react react-dom
```

### Compatibility Matrix

_OpenLayers_ and _React_ are peer dependencies and should be installed separately.

_React_ is supported from version 16.8.0.

---

| rlayers          | Unit-tested _OpenLayers_ versions                                                                   | Unit-tested _React_ versions                |
| ---------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| 1.0 (_obsolete_) | 6.0                                                                                                 | 16.8, 16.14, 17.0.2                         |
| 1.1 (_obsolete_) | 6.6, 6.7, 6.8, 6.9                                                                                  | 16.8, 16.14, 17.0.2                         |
| 1.2 (_obsolete_) | 6.6, 6.7, 6.8, 6.9                                                                                  | 16.8, 16.14, 17.0.2                         |
| 1.3 (_obsolete_) | 6.10, 6.11, 6.12, 6.13, 6.14, 6.14.1                                                                | 16.8, 16.14, 17.0.2, 18.0.0                 |
| 1.4 (_obsolete_) | 6.10, 6.11, 6.12, 6.13, 6.14, 6.14.1, 6.15, 6.15.1, 7.0.0, 7.1.0, 7.2.0, 7.2.2, 7.3.0               | 16.8, 16.14, 17.0.2, 18.0.0, 18.1.0, 18.2.0 |
| 1.5              | 6.10, 6.11, 6.12, 6.13, 6.14, 6.14.1, 6.15, 6.15.1, 7.0.0, 7.1.0, 7.2.0, 7.2.2, 7.3.0, 7.4.0        | 16.8, 16.14, 17.0.2, 18.0.0, 18.1.0, 18.2.0 |
| 2.0 `(@latest)`  | 6.10, 6.11, 6.12, 6.13, 6.14, 6.14.1, 6.15, 6.15.1, 7.0.0, 7.1.0, 7.2.0, 7.2.2, 7.3.0, 7.4.0, 7.5.1 | 16.8, 16.14, 17.0.2, 18.0.0, 18.1.0, 18.2.0 |

---

When using dynamic styles with React 18, you may get a warning in the console in debug mode: https://github.com/mmomtchev/rlayers/issues/40. You can safely ignore it as has no functional consequences - React 18, including the concurrent renderer, is fully supported.

## Usage

_rlayers_ is a set of reusable _React_ components that can be nested in various ways to create map applications for the web through _React_ composition in the true **spirit of _React_**.
The components are based on a simplified model of the _OpenLayers_ classes: for example the layers and the sources abstraction levels have been fused into one single level and the map and the view are also represented by a single component.

In order to avoid confusion between the _OpenLayers_ classes and the _rlayers_ classes which sometimes have the same names - all _rlayers_ classes are prefixed with **R**. If a class begins with **R**, it is from _rlayers_, otherwise it is an _OpenLayers_ class.

The most important element is the `<RMap>`. Every other element, except `<RStyle>`, requires a parent to function - an `<RLayer>` must be part of a map, an `<RFeature>` must be part of an `<RLayerVector>`, an `<RControl>` must also be part of a map.

### Simple step-by-step example

This is the simple overlay example - <https://mmomtchev.github.io/rlayers/#/overlays>

```jsx
import React from 'react';
import {fromLonLat} from 'ol/proj';
import {Point} from 'ol/geom';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle} from 'rlayers';
import locationIcon from './svg/location.svg';

// Create a map, its size is set in the CSS class example-map
<RMap className='example-map' initial={{center: fromLonLat([2.364, 48.82]), zoom: 11}}>
    {/* Use an OpenStreetMap background */}
    <ROSM />
    {/* Create a single layer for holding vector features */}
    <RLayerVector zIndex={10}>
        {/* Create a style for rendering the features */}
        <RStyle.RStyle>
            {/* Consisting of a single icon, that is slightly offset
             * so that its center falls over the center of the feature */}
            <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
        </RStyle.RStyle>
        {/* Create a single feature in the vector layer */}
        <RFeature
            {/* Its geometry is a point geometry over the monument */}
            geometry={new Point(fromLonLat([2.295, 48.8737]))}
            {/* Bind an onClick handler */}
            onClick={(e) =>
                {/* e.map is the underlying OpenLayers map - we call getView().fit()
                to pan/zoom the map over the monument with a small animation */}
                e.map.getView().fit(e.target.getGeometry().getExtent(), {
                    duration: 250,
                    maxZoom: 15
                })
            }
        >
            {/* The icon is an SVG image that represents the feature on the map
            while an overlay allows us to add a normal HTML element over the feature */}
            <ROverlay className='example-overlay'>
                Arc de Triomphe
                <br />
                <em>&#11017; click to zoom</em>
            </ROverlay>
        </RFeature>
    </RLayerVector>
</RMap>
```

Check [examples/static_pages.html](https://github.com/mmomtchev/rlayers/tree/master/examples/static_page.html) for a fully self-contained static HTML page using _rlayers_.

You can also check the GPLed [XC-DB](https://github.com/mmomtchev/xc-db.git) for a larger and more complex project entirely implemented using React, Redux and rlayers.

#### Contexts

Composition works by using _React_ Contexts. Every nested element uses the context of its nearest parent.

The underlying OpenLayers objects can be accessed using the `useOL()` hook - check the [`Geolocation`](https://mmomtchev.github.io/rlayers/#/geolocation) example to see how.

Currently `useOL()` has an `RContextType` and can contain the following elements:

-   `map` provided by a map, every other element, except an `RStyle` must have a map parent
-   `layer` and `source` provided by all layers - not required for anything at the moment, but can be used to access the underlying _OpenLayers_ objects
-   `vectorlayer` and `vectorsource` provided by vector layers only - required for `<RFeature>`
-   `vectortilelayer` provided by vector tile layers only
-   `location` and `feature` provided by a map feature - required for `<ROverlay>` and `<RPopup>`
-   `style` provided by a style definition - the only one which can be outside of a map

Additionally, `useRLayersComponent()` allows retrieving the containing _rlayers_ component.

#### Accessing the underlying _OpenLayers_ objects and API

The underlying _OpenLayers_ objects can be accessed in a number of different ways:

-   Through the context objects by using `React.Context.Consumer`
-   In an event handler that is a normal function and not an arrow lambda, `this` will contain the _rlayers_ component and `this.context` will contain the context - this is an alternative to using `useOL()`
-   In all event handlers, _OpenLayers_ will pass the target object in `event.target` and the map in `event.map` - [the popups example](https://mmomtchev.github.io/rlayers/#/popups) uses this method
-   And finally, accessing arbitrary elements, even outside their contexts, is possible by using React references - `React.RefObject`s. [The high performance example](https://mmomtchev.github.io/rlayers/#/igc) contains an example of this. The underlying _OpenLayers_ objects can be accessed through the `ol` property of every component. Additionaly, for `layer` objects, the underlying _OpenLayers_ source can be accessed through `source`:
    ```ts
    const layerRef = React.createRef() as React.RefObject<RLayerVector>;
    ```
    Then after rendering:
    ```jsx
    <RLayerVector ref={layerRef} />
    ```
    `layerRef.current.ol` will contain the _OpenLayers_ layer and `layerRef.current.source` will contain the source. This is the only way of accessing the object outside its context.

### Styles

Style definitions can be placed anywhere inside the DOM and can be referenced with a _React_ reference. rlayers includes two special types for dealing with styles:

-   `RStyleRef` which is an alias to `React.RefObject<RStyle>` is a _React_ reference to an `<RStyle>` element. It can be transparently used everywhere where a classical _OpenLayers_ `StyleLike` is required
-   `RStyleLike` is the new union type that allows for `StyleLike` or a `RStyleRef`

A style placed inside a vector layer will be automatically applied to that vector layer.

A style can either be static or dynamic. A static style depends only on its properties. A dynamic style is a function that takes an _OpenLayers_ `Feature` object as its input and returns a `Style`. A dynamic style creates a new object for every rendered feature, so this must be taken into account. A simple caching mechanism is also provided, based on a user-supplied hash function. It can greatly improve performance when the majority of the features use relatively few different styles.

You can refer to

-   <https://mmomtchev.github.io/rlayers/#/features> for a basic example with static styles;
-   <https://mmomtchev.github.io/rlayers/#/vectortiles> for a more complete example with dynamic styles;
-   <https://mmomtchev.github.io/rlayers/#/cluster> for the use of caching.

Classical _OpenLayers_ `StyleLike` objects are supported too, but this is not the **_React_ way**. Still, if you need every last bit of performance, writing an optimized _OpenLayers_ style function is the best solution.

### Performance

React is a wonderful framework that makes it very easy to write complex web applications without having to manually handle all the interdependencies between the various components. This is the reason why it is called _React_ - components automatically _React_ to changes in other components. In the true spirit of _React_, _rlayers_ prefers to err on the safe side - always updating when there is a chance that the component needs updating - making it easy on the beginner who wants simple interface while still allowing the experienced engineer to achieve the performance he needs.

When high performance is required, particular care must be taken that the component properties do not change without a reason. This is especially true when the `pointermove` event is used. In these cases one should avoid using anonymous objects, arrays or functions as properties.

Take for example this:

```jsx
<RFeature
    geometry={new Point(fromLonLat([2.295, 48.858])}
    onClick={(e: MapBrowserEvent) => process(e.target)}
/>
```

This is a feature that will be re-evaluated at every frame. Its geometry appears to be a constant, but it is in fact an anonymous object that is created at every frame - even if it always holds the same value. Passing a constant is one way around this, but the true _React way_ is using the two tools _React_ provides: `React.useMemo` and `React.useCallback`. They memoize the value and take care to always return a reference to the same object unless one of the listed dependencies is modified.

This is a much better performing code that won't rerender the feature component:

```jsx
<RFeature
    geometry={React.useMemo(new Point(fromLonLat([2.295, 48.858]), [/* no deps */])}
    onClick={React.useCallback((e: MapBrowserEvent) => process(e.target), [/* no deps */])}
/>
```

Anonymous objects, arrays and **especially lambdas** in the properties of a component are prime candidates for memoization. Sometimes, you can also memoize whole components or groups of components - for a very significant performance boost.

Generally, if you are binding code to the `pointermove` event and your performance is not good enough, this is the first thing you should be looking at - which components update at every `pointermove` and why.

These 3 examples run code on various high-frequency events, take a look at them:

-   [Clustering](https://mmomtchev.github.io/rlayers/#/cluster) runs the styling function every time the map is panned or zoomed
-   [Drop a pin](https://mmomtchev.github.io/rlayers/#/pindrop) runs code on every `pointermove` that carefully avoids rerendering
-   [Geo data](https://mmomtchev.github.io/rlayers/#/geodata) updates components at every `pointerenter`/`pointerleave`
-   [The high performance example](https://mmomtchev.github.io/rlayers/#/igc) is a complex example that runs lots of code and updates components at every `pointermove`

Also, when searching for features listening on `pointermove`/`pointerenter`/`pointerleave` events, _rlayers_ 2.0.0 and later, is able to eliminate very early feature layers that do not contain features listenening for those events. If your map contains a large number of features, and only a handful of these use `pointermove` events - try to group them in a separate layer.

## Examples

The examples can be found here:
<https://mmomtchev.github.io/rlayers/>

## Next.js

When using with Next.js, you have to install `next-transpile-modules`:

```shell
npm install --save next-transpile-modules
```

And then create the following `next.config.js`:

```js
const withTranspile = require('next-transpile-modules')(['ol', 'rlayers']);
module.exports = withTranspile({experimental: {esmExternals: 'loose'}});
```

It is known to work with Next.js 10 to Next.js 13. You can check [`rlayers-npm-tests`](https://github.com/mmomtchev/rlayers-npm-tests) repository for examples for working configurations.

### Server-Side Rendering

Server-side rendering of map components is difficult - there is still no comprehensive solution. Besides the obvious complexities of rendering on canvas outside the browser, one of the major issues is that server-side rendering runs before the browser layout flowing - and thus must work independent of layout and resolution.

The best solution is to use a WMS-compatible server (such as Geoserver) and to serve prerendered maps over WMS - eventually replacing the initial image by a canvas.

An intermediate solution, which does not require extensive server-side investment (such as Geoserver), but is limited to static layout(s), is to prerender one (or one per screen size) image to be used as a temporary place-holder until the map is loading. In this case, at least some devices, will get an ugly looking map for the first few seconds.

Pushing the initial tiles is also an option:

-   when combined with a WMS-server it could deliver pixel-perfect maps with on the first HTTP request
-   without a WMS-server it could still avoid doing a large number of HTTP requests on the first load

Currently, server-side rendering of raster layers on fixed map sizes has reached POC status and an online demo is accessible at https://rlayers-ssr.meteo.guru/.
The code can be found in the `ssr` branch of this project. The `next.js` project can be found at <https://github.com/mmomtchev/rlayers-ssr-demo.git>. _This is still not a user-friendly, install-and-run project._ Take a look at `pages/index.js` if you want see how it is meant to be used.

As of March 2022, SSR support is stale and I am not working on it anymore.

## API

You can browse the full documentation at <https://mmomtchev.github.io/rlayers/api>.

## License

[ISC](https://choosealicense.com/licenses/isc/)
