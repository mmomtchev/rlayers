# rlayers - React Components for OpenLayers 6+

[![License: LGPL v3](https://img.shields.io/github/license/mmomtchev/rlayers)](https://github.com/mmomtchev/rlayers/blob/master/LICENSE)
[![Node.js CI](https://github.com/mmomtchev/rlayers/workflows/Node.js%20CI/badge.svg)](https://github.com/mmomtchev/rlayers/actions?query=workflow%3A%22Node.js+CI%22)
[![codecov](https://codecov.io/gh/mmomtchev/rlayers/branch/master/graph/badge.svg)](https://codecov.io/gh/mmomtchev/rlayers)


rlayers is an opinionated set of *React* components for *OpenLayers*.

It's design policy is:
* Fully Typescript-typed
* Do everything that faces the user the ***React* way** and not the *OpenLayers* way - `onClick` and `onPointerEnter`/`onPoinerLeave` handlers are typical examples
* If it does not face the user, it does not need to be *React* way - internally it uses inheritance, following the *OpenLayers* classes, over composition
* Simple things should be simple to do, performance optimizations should not get in the way unless needed
* If taking shortcuts when updating the components, always err on the safe side but do provide an override method that allows to come close to the raw OpenLayers performance
* Expose all the advanced *OpenLayers* features
* Try to be as much SSR-friendly as possible (this feature is currently in POC stage, see below)
* The current target is *OpenLayers* 6+
* Avoid dependencies when built except for *React* and OpenLayers (the examples have some dependencies) - currently the single one is [`lru-cache`](https://www.npmjs.com/package/lru-cache) at 8Kbytes

It has nothing to do with *react-openlayers* which stopped at *OpenLayers* 3. In fact, it is more inspired by *react-leaflet* than *react-openlayers*.

![© OpenStreetMap contributors](https://gist.githubusercontent.com/mmomtchev/e789dfa545b97c7ae97770f1b5606172/raw/79b486bcc8c45b069e3a8f552c82360de80febff/ref1.png)
![Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)](https://gist.githubusercontent.com/mmomtchev/e789dfa545b97c7ae97770f1b5606172/raw/79b486bcc8c45b069e3a8f552c82360de80febff/ref2.png)

## Installation

```bash
npm --save install rlayers ol react react-dom
```

*OpenLayers* and *React* are peer dependencies and should be installed separately.
*OpenLayers* is supported from version 6.0.0.
*React* is supported from version 16.8.0.

## Usage

rlayers is a set of reusable *React* components that can be nested in various ways to create map applications for the web through *React* composition in the true **spirit of *React***.
The components follow very closely the *OpenLayers* hierarchy with with some abstraction layers fused into one: the layers and the sources abstraction levels have been fused into one single level and the map and the view are also represented by a single component.

In order to avoid confusion between the *OpenLayers* classes and the *rlayers* classes which sometimes have the same names - all *rlayers* classes are prefixed with **R**. If a class begins with **R**, it is from *rlayers*, otherwise it is an *OpenLayers* class.

The most important element is the `<RMap>`. Every other element, except `<RStyle>`, requires a parent to function - an `<RLayer>` must be part of a map, an `<RFeature>` must be part of an `<RLayerVector>`, an `<RControl>` must also be part of a map. Nesting works by using *React* Contexts. Every nested element uses the context of its nearest parent.

Currently a context has an `RContextType` and can contain the following elements:
* `RContext.map` provided by a map, every other element, except an `RStyle` must have a map parent
* `RContext.layer` and `RContext.source` provided by all layers - not required for anything at the moment, but can be used to access the underlying *OpenLayers* objects
* `RContext.vectorlayer` and `RContext.vectorsource` provided by vector layers only - required for `<RFeature>`
* `RContext.location` and `RContext.feature` provided by a map feature - required for `<ROverlay>` and `<RPopup>`
* `RContext.style` provided by a style definition - the only one which can be outside of a map

#### Accessing the underlying *OpenLayers* objects and API

The underlying *OpenLayers* objects can be accessed in a number of different ways:
* Through the context objects by using `React.Context.Consumer` - [the custom controls example](https://mmomtchev.github.io/rlayers/#/controls) contains an example for using the *OpenLayers* `map` from `RContext`
* In an event handler, when it is a normal function and not an arrow lambda, `this` will contain the *rlayers* component and `this.context` will contain the context - [the geolocation example](https://mmomtchev.github.io/rlayers/#/geolocation) accesses `this.context.map` to adjust the view
* In all event handlers, *OpenLayers* will pass the target object in `event.target` and the map in `event.map` - [the popups example](https://mmomtchev.github.io/rlayers/#/popups) uses this method
* And finally, accessing arbitrary elements, even outside their contexts, is possible by using React references - `React.RefObject`s. [The high performance example](https://mmomtchev.github.io/rlayers/#/igc) contains an example of this. The underlying *OpenLayers* objects can be accessed through the `ol` property of every component. Additionaly, for `layer` objects, the underlying *OpenLayers* source can be accessed through `source`:
    ```ts
    const layerRef = React.createRef() as React.RefObject<RLayerVector>;
    ```
    Then after rendering:
    ```jsx
    <RLayerVector ref={layerRef} />
    ```
    `layerRef.current.ol` will contain the *OpenLayers* layer and `layerRef.current.source` will contain the source. This is the only way of accessing the object outside its context.

### Styles

Style definitions can be placed anywhere inside the DOM and can be referenced with a *React* reference. rlayers includes two special types for dealing with styles:
* `RStyleRef` which is an alias to `React.RefObject<RStyle>` is a *React* reference to an `<RStyle>` element. It can be transparently used everywhere where a classical *OpenLayers* `StyleLike` is required
* `RStyleLike` is the new union type that allows for `StyleLike` or a `RStyleRef`

A style placed inside a vector layer will be automatically applied to that vector layer.

A style can either be static or dynamic. A static style depends only on its properties. A dynamic style is a function that takes an *OpenLayers* `Feature` object as its input and returns a `Style`. A dynamic style creates a new object for every rendered feature, so this must be taken into account. A simple caching mechanism is also provided, based on a user-supplied hash function. It can greatly improve performance when the majority of the features use relatively few different styles.

You can refer to
* <https://mmomtchev.github.io/rlayers/#/features> for a basic example with static styles;
* <https://mmomtchev.github.io/rlayers/#/vectortiles> for a more complete example with dynamic styles;
* <https://mmomtchev.github.io/rlayers/#/cluster> for the use of caching.

Classical *OpenLayers* `StyleLike` objects are supported too, but this is not the ***React* way**. Still, if you need every last bit of performance, writing an optimized *OpenLayers* style function is the best solution.

### Simple step-by-step example

This the simple overlay example - <https://mmomtchev.github.io/rlayers/#/overlays>
```jsx
import React from 'react';
import {fromLonLat} from 'ol/proj';
import {Point} from 'ol/geom';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle} from 'rlayers';
import locationIcon from './svg/location.svg';
 
// Create a map, its size is set in the CSS class example-map
<RMap className='example-map' center={fromLonLat([2.364, 48.82])} zoom={11}>
    {/* Use an OpenStreetMap background */}
    <ROSM />
    {/* Create a single layer for holding vector features */}
    <RLayerVector zIndex={10}>
        {/* Create a style for rendering the features */}
        <RStyle.RStyle>
            {/* Consisting of a single icon, that is slightly offset
             *so that its center falls over the center of the feature */}
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

### Performance

React is a wonderful framework that makes it very easy to write complex web applications without having to manually handle all the interdependencies between the various components. This is the reason why it is called *React* - components automatically *React* to changes in other components. In the true spirit of *React*, *rlayers* prefers to err on the safe side - always updating when there is a chance that the component needs updating - making it easy on the beginner who wants simple interface while still allowing the experienced engineer to achieve the performance he needs. 

When high performance is required, particular care must be taken that the component properties do not change without a reason. This is especially true when the `pointermove` event is used. In these cases one should avoid using anonymous objects, arrays or functions as properties. 

Take for example this:
```jsx
<RFeature
    geometry={new Point(fromLonLat([2.295, 48.858])}
    onClick={(e: MapBrowserEvent) => process(e.target)}
/>
```
This is a feature that will be re-evaluated at every frame. Its geometry appears to be a constant, but it is in fact an anonymous object that is created at every frame - even if it always holds the same value. Passing a constant is one way around this, but the true *React way* is using the two tools *React* provides: `React.useMemo` and `React.useCallback`. They memoize the value and take care to always return a reference to the same object unless one of the listed dependencies is modified.

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
* [Clustering](https://mmomtchev.github.io/rlayers/#/cluster) runs the styling function every time the map is panned or zoomed
* [Drop a pin](https://mmomtchev.github.io/rlayers/#/pindrop) runs code on every `pointermove` that carefully avoids rerendering
* [Geo data](https://mmomtchev.github.io/rlayers/#/geodata) updates components at every `pointerenter`/`pointerleave`
* [The high performance example](https://mmomtchev.github.io/rlayers/#/igc) is a complex example that runs lots of code and updates components at every `pointermove`

## Examples

The examples can be found here:
<https://mmomtchev.github.io/rlayers/>

## Server-Side Rendering

Server-side rendering of map components is difficult - there is still no comprehensive solution. Besides the obvious complexities of rendering on canvas outside the browser, one of the major issues is that server-side rendering runs before the browser layout flowing - and thus must work independent of layout and resolution.

The best solution is to use a WMS-compatible server (such as Geoserver) and to serve prerendered maps over WMS - eventually replacing the initial image by a canvas.

An intermediate solution, which does not require extensive server-side investment (such as Geoserver), but is limited to static layout(s), is to prerender one (or one per screen size) image to be used as a temporary place-holder until the map is loading. In this case, at least some devices, will get an ugly looking map for the first few seconds.

Pushing the initial tiles is also an option:
* when combined with a WMS-server it could deliver pixel-perfect maps with on the first HTTP request
* without a WMS-server it could still avoid doing a large number of HTTP requests on the first load

Currently, server-side rendering of raster layers on fixed map sizes has reached POC status and an online demo is accessible at https://rlayers-ssr.meteo.guru/.
The code can be found in the `ssr` branch of this project. The `next.js` project can be found at <https://github.com/mmomtchev/rlayers-ssr-demo.git>. *This is still not a user-friendly, install-and-run project.* Take a look at `pages/index.js` if you want see how it is meant to be used.


## API

You can browse the full documentation at <https://mmomtchev.github.io/rlayers/api>

## License
[ISC](https://choosealicense.com/licenses/isc/)
