# react-layers

react-layers is an opinionated set of React components for OpenLayers.

It's design policy is:
* Fully Typescript-typed
* Do everything that faces the user the React way and not the OpenLayers way - onClick and OnPointerEnter/OnPoinerLeave handlers are typical examples
* If it does not face the user, it does not need to be React way - it uses inheritance, following the OpenLayers classes, over composition
* Simple things should be simple to do
* Expose all the advanced OpenLayers features - otherwise you are probably better with Leaflet
* Try to be as much SSR-friendly as possible (this is an upcoming feature, see more below)
* The current target is OpenLayers 6+
* zero-dependency when built except for React and OpenLayers (the examples have some dependencies)

It has nothing to do with react-openlayers which stopped at OpenLayers 3. In fact, it is more inspired by react-leaflet than react-openlayers.

## Installation

**(will be when it is published)**
```bash
npm --save install react-layers
npm --save install ol @types/ol # if you haven't already done so
npm --save install react react-dom  # if you haven't already done so
```

OpenLayers is a peer dependency - all OpenLayers 6+ versions should be supported.

## Usage

You can start with the examples:
<https://mmomtchev.github.io/react-layers/>

## Server-side rendering

Servering-side rendering of map components is difficult - there is still no comprehensive solution. Besides the obvious complexities of rendering on canvas outside the browser, one of the major issues is that server-side rendering runs before the browser layout flowing - and thus must work independent of layout and resolution.

The only real solution is to use a WMS-compatible server (such as Geoserver) and to serve prerendered maps over WMS.

An intermediate solution, which does not require extensive server-side investment (such as Geoserver), but is limited to static layout(s), is to prerender one (or one per screen size) image to be used as a temporary place-holder until the map is loading. In this case, at least some devices, will get an ugly looking map for the first few seconds.

Pushing the initial tiles is also an option.

## API

The API is not yet documented and it is still subject to change.

## License
[ISC](https://choosealicense.com/licenses/isc/)