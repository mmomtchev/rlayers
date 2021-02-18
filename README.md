# rlayers

[![License: LGPL v3](https://img.shields.io/github/license/mmomtchev/rlayers)](https://github.com/mmomtchev/rlayers/blob/master/LICENSE)
[![Node.js CI](https://github.com/mmomtchev/rlayers/workflows/Node.js%20CI/badge.svg)](https://github.com/mmomtchev/rlayers/actions?query=workflow%3A%22Node.js+CI%22)
[![codecov](https://codecov.io/gh/mmomtchev/rlayers/branch/master/graph/badge.svg)](https://codecov.io/gh/mmomtchev/rlayers)


rlayers is an opinionated set of *React* components for *OpenLayers*.

It's design policy is:
* Fully Typescript-typed
* Do everything that faces the user the ***React* way** and not the *OpenLayers* way - `onClick` and `onPointerEnter`/`onPoinerLeave` handlers are typical examples
* If it does not face the user, it does not need to be *React* way - internally it uses inheritance, following the *OpenLayers* classes, over composition
* Simple things should be simple to do
* Expose all the advanced *OpenLayers* features - otherwise you are probably better with Leaflet
* Try to be as much SSR-friendly as possible (this is an upcoming feature, see more below)
* The current target is *OpenLayers* 6+
* zero-dependency when built except for *React* and OpenLayers (the examples have some dependencies)

It has nothing to do with *react-openlayers* which stopped at *OpenLayers* 3. In fact, it is more inspired by *react-leaflet* than *react-openlayers*.

![](https://media.tenor.com/images/917f26746c6d0fb761751d1c598cca8b/tenor.png)

## Installation

```bash
npm --save install rlayers
```

All *OpenLayers* 6+ versions should be supported.

## Usage

rlayers is a set of reusable *React* components that can be nested in various ways to create map applications for the web through *React* composition in the true **spirit of *React***.
The components follow very closely the *OpenLayers* hierarchy with with some abstraction layers fused into one: the layers and the sources abstraction levels have been fused into one single level and the map and the view are also represented by a single component.

In order to avoid confusion between the *OpenLayers* classes and the *rlayers* classes which sometimes have the same names - all *rlayers* classes are prefixed with **R**. If a class begins with **R**, it is from *rlayers*, otherwise it is an *OpenLayers* class.

The most important element is the `<RMap>`. Every other element, except `<RStyle>`, requires a parent to function - an `<RLayer>` must be part of a map, an `<RFeature>` must be part of an `<RLayerVector>`, an `<RControl>` must also be part of a map. Nesting works by using *React* Contexts. Every nested element uses the context of its nearest parent.

Currently a context can contain the following elements:
* `RContext.map` provided by a map, every other element must have a MapContext
* `RContext.vectorlayer` and `RContext.vectorsource` provided by vector layers only - required for `<RFeature>`
* `RContext.location` and `RContext.feature` provided by a map feature - required for `<ROverlay>` and `<RPopup>`
* `RContext.style` provided by a style definition - the only one which can be outside of a map

The context objects can be accessed by using  `*React*.Context.Consumer` - [the custom controls example](https://mmomtchev.github.io/rlayers/#/controls) contains an example for using the *OpenLayers* `map` from `RContext`. Accessing elements outside their contexts is possible by using `*React*.RefObject`s. [The high performance example](https://mmomtchev.github.io/rlayers/#/igc) contains an example of this. The underlying *OpenLayers* objects can be accessed through the `ol` property of every component. This is also something that could potentially change before the first release.

### Styles

Style definitions can be placed anywhere inside the DOM and can be referenced with a *React* reference. rlayers includes two special types for dealing with styles:
* `RStyleRef` which is an alias to `React.RefObject<RStyle>` is a *React* reference to an `<RStyle>` element. It can be transparently used everywhere where a classical *OpenLayers* `StyleLike` is required
* `RStyleLike` is the new union type that allows for `StyleLike` or a `RStyleRef`

A style placed inside a vector layer will be automatically applied to that vector layer.

A style can either be static or dynamic. A static style depends only on its properties. A dynamic style is a function that takes an *OpenLayers* `Feature` object as its input and returns a `Style`. A dynamic style creates a new object for every rendered feature, so this must be taken into account. A simple caching mechanism is also provided, based on a user-supplied hash function. It can greatly improve performance when the majority of the features use a small number of different styles.

You can refer to
* <https://mmomtchev.github.io/rlayers/#/features> for a basic example with static styles;
* <https://mmomtchev.github.io/rlayers/#/vectortiles> for a more complete example with dynamic styles;
* <https://mmomtchev.github.io/rlayers/#/cluster> for the use of caching.

Classical *OpenLayers* `StyleLike` objects are supported too, but this is not the ***React* way**. Still, if you need every last bit of performance, writing an optimized *OpenLayers* style function is the best solution.

### Step-by-step simple example

This the simple overlay example - <https://mmomtchev.github.io/rlayers/#/overlays>
```jsx
// Create a map, its size is set in the CSS class example-map
<RMap className='example-map' center={fromLonLat(coords.origin)} zoom={11}>
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
            geometry={new Point(fromLonLat(coords.ArcDeTriomphe))}
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

React is a wonderful framework that makes it very easy to write complex web applications without having to manually handle all the interdependencies between the various components. This is the reason why it is called *React* - components automatically *React* to changes in other components. In the true spirit of *React*, *rlayers* prefers to err on the safe side - always updating when there is a chance that the component needs updating - making it easy on the beginner and hard on the experienced engineer. So when one needs good performance, particular care must be taken that the various properties do not change without a reason. This is especially true when the `pointermove` event is used. In these cases one should avoid using anonymous objects, arrays or functions as properties. 

Take for example this:
```jsx
<RFeature
    geometry={new Point(fromLonLat([2.295, 48.858])}
    onClick={(e: MapBrowserEvent) => process(e.target)}
/>
```
This is a feature that will be re-evaluated at every frame. Its geometry appears to be a constant, but it is in fact an anonymous object that is created at every frame - even if it always holds the same value. Passing a constant is one way around this, but the true *React way* is using the two tools *React* provides: `React.useMemo` and `React.useCallback`. They memoize the value and take care to always return a reference to the same object unless one of the listed dependencies is modified.

This is a much better peforming code that won't rerender the feature component:
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

## API

You can browse the full documentation at <https://mmomtchev.github.io/rlayers/api>

## License
[ISC](https://choosealicense.com/licenses/isc/)
