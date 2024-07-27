"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[9921],{4096:(e,n,o)=>{o.d(n,{A:()=>a});var t=o(1601),r=o.n(t),i=o(6314),l=o.n(i)()(r());l.push([e.id,':root,\n:host {\n  --ol-background-color: white;\n  --ol-accent-background-color: #F5F5F5;\n  --ol-subtle-background-color: rgba(128, 128, 128, 0.25);\n  --ol-partial-background-color: rgba(255, 255, 255, 0.75);\n  --ol-foreground-color: #333333;\n  --ol-subtle-foreground-color: #666666;\n  --ol-brand-color: #00AAFF;\n}\n\n.ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 1.5px solid var(--ol-background-color);\n  background-color: var(--ol-partial-background-color);\n}\n\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.ol-scale-line {\n  background: var(--ol-partial-background-color);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.ol-scale-line-inner {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  border-top: none;\n  color: var(--ol-foreground-color);\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n  transition: all 0.25s;\n}\n\n.ol-scale-bar {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n}\n\n.ol-scale-bar-inner {\n  display: flex;\n}\n\n.ol-scale-step-marker {\n  width: 1px;\n  height: 15px;\n  background-color: var(--ol-foreground-color);\n  float: right;\n  z-index: 10;\n}\n\n.ol-scale-step-text {\n  position: absolute;\n  bottom: -5px;\n  font-size: 10px;\n  z-index: 11;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-text {\n  position: absolute;\n  font-size: 12px;\n  text-align: center;\n  bottom: 25px;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-singlebar {\n  position: relative;\n  height: 10px;\n  z-index: 9;\n  box-sizing: border-box;\n  border: 1px solid var(--ol-foreground-color);\n}\n\n.ol-scale-singlebar-even {\n  background-color: var(--ol-subtle-foreground-color);\n}\n\n.ol-scale-singlebar-odd {\n  background-color: var(--ol-background-color);\n}\n\n.ol-unsupported {\n  display: none;\n}\n\n.ol-viewport,\n.ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.ol-viewport canvas {\n  all: unset;\n  overflow: hidden;\n}\n\n.ol-viewport {\n  touch-action: pan-x pan-y;\n}\n\n.ol-selectable {\n  -webkit-touch-callout: default;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  user-select: text;\n}\n\n.ol-grabbing {\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n.ol-grab {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab;\n}\n\n.ol-control {\n  position: absolute;\n  background-color: var(--ol-subtle-background-color);\n  border-radius: 4px;\n}\n\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  transition: opacity .25s linear, visibility 0s linear;\n}\n\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .25s linear, visibility 0s linear .25s;\n}\n\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: var(--ol-subtle-foreground-color);\n  font-weight: bold;\n  text-decoration: none;\n  font-size: inherit;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: var(--ol-background-color);\n  border: none;\n  border-radius: 2px;\n}\n\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.ol-compass {\n  display: block;\n  font-weight: normal;\n  will-change: transform;\n}\n\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.ol-control button:hover,\n.ol-control button:focus {\n  text-decoration: none;\n  outline: 1px solid var(--ol-subtle-foreground-color);\n  color: var(--ol-foreground-color);\n}\n\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: calc(100% - 1.3em);\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n}\n\n.ol-attribution a {\n  color: var(--ol-subtle-foreground-color);\n  text-decoration: none;\n}\n\n.ol-attribution ul {\n  margin: 0;\n  padding: 1px .5em;\n  color: var(--ol-foreground-color);\n  text-shadow: 0 0 2px var(--ol-background-color);\n  font-size: 12px;\n}\n\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n}\n\n.ol-attribution li:not(:last-child):after {\n  content: " ";\n}\n\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.ol-attribution button {\n  flex-shrink: 0;\n}\n\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.ol-attribution:not(.ol-collapsed) {\n  background: var(--ol-partial-background-color);\n}\n\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n}\n\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n\n.ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.ol-overviewmap .ol-overviewmap-map,\n.ol-overviewmap button {\n  display: block;\n}\n\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  height: 150px;\n  width: 150px;\n}\n\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n}\n\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-overviewmap:not(.ol-collapsed) {\n  background: var(--ol-subtle-background-color);\n}\n\n.ol-overviewmap-box {\n  border: 1.5px dotted var(--ol-subtle-foreground-color);\n}\n\n.ol-overviewmap .ol-overviewmap-box:hover {\n  cursor: move;\n}\n\n.ol-overviewmap .ol-viewport:hover {\n  cursor: pointer;\n}\n',""]);const a=l},5045:(e,n,o)=>{var t=o(5072),r=o.n(t),i=o(7825),l=o.n(i),a=o(7659),s=o.n(a),u=o(5056),c=o.n(u),d=o(540),p=o.n(d),b=o(1113),g=o.n(b),m=o(4096),f={};f.styleTagTransform=g(),f.setAttributes=c(),f.insert=s().bind(null,"head"),f.domAPI=l(),f.insertStyleElement=p(),r()(m.A,f),m.A&&m.A.locals&&m.A.locals},8217:(e,n,o)=>{o.d(n,{Ay:()=>m,Bs:()=>h,hX:()=>f,te:()=>x});var t=o(6717),r=o(4778),i=o(4294),l=o(1217),a=o(1064),s=o(503),u=o(6702),c=o(2871),d=o(4338),p=o(4087),b=o(3407),g=o(3402);const m=class{constructor(){this.dataProjection=void 0,this.defaultFeatureProjection=void 0,this.featureClass=t.A,this.supportedMediaTypes=null}getReadOptions(e,n){if(n){let o=n.dataProjection?(0,b.Jt)(n.dataProjection):this.readProjection(e);n.extent&&o&&"tile-pixels"===o.getUnits()&&(o=(0,b.Jt)(o),o.setWorldExtent(n.extent)),n={dataProjection:o,featureProjection:n.featureProjection}}return this.adaptOptions(n)}adaptOptions(e){return Object.assign({dataProjection:this.dataProjection,featureProjection:this.defaultFeatureProjection,featureClass:this.featureClass},e)}getType(){return(0,p.b0)()}readFeature(e,n){return(0,p.b0)()}readFeatures(e,n){return(0,p.b0)()}readGeometry(e,n){return(0,p.b0)()}readProjection(e){return(0,p.b0)()}writeFeature(e,n){return(0,p.b0)()}writeFeatures(e,n){return(0,p.b0)()}writeGeometry(e,n){return(0,p.b0)()}};function f(e,n,o){const t=o?(0,b.Jt)(o.featureProjection):null,r=o?(0,b.Jt)(o.dataProjection):null;let i=e;if(t&&r&&!(0,b.tI)(t,r)){n&&(i=e.clone());const o=n?t:r,l=n?r:t;"tile-pixels"===o.getUnits()?i.transform(o,l):i.applyTransform((0,b.RG)(o,l))}if(n&&o&&void 0!==o.decimals){const n=Math.pow(10,o.decimals),t=function(e){for(let o=0,t=e.length;o<t;++o)e[o]=Math.round(e[o]*n)/n;return e};i===e&&(i=e.clone()),i.applyTransform(t)}return i}const y={Point:i.A,LineString:l.A,Polygon:a.Ay,MultiPoint:s.A,MultiLineString:u.A,MultiPolygon:c.A};function h(e,n){const o=e.geometry;if(!o)return[];if(Array.isArray(o))return o.map((n=>h({...e,geometry:n}))).flat();const t="MultiPolygon"===o.type?"Polygon":o.type;if("GeometryCollection"===t||"Circle"===t)throw new Error("Unsupported geometry type: "+t);const i=o.layout.length;return f(new r.Ay(t,"Polygon"===t?function(e,n,o){return Array.isArray(n[0])?((0,g.mb)(e,0,n,o)||(e=e.slice(),(0,g.NK)(e,0,n,o)),e):((0,g.PA)(e,0,n,o)||(e=e.slice(),(0,g.ug)(e,0,n,o)),e)}(o.flatCoordinates,o.ends,i):o.flatCoordinates,o.ends?.flat(),i,e.properties||{},e.id).enableSimplifyTransformed(),!1,n)}function x(e,n){if(!e)return null;if(Array.isArray(e)){const o=e.map((e=>x(e,n)));return new d.A(o)}return f(new(0,y[e.type])(e.flatCoordinates,e.layout,e.ends),!1,n)}},1365:(e,n,o)=>{o.d(n,{A:()=>f});var t=o(6717),r=o(8217),i=o(4087);class l extends r.Ay{constructor(){super()}getType(){return"json"}readFeature(e,n){return this.readFeatureFromObject(a(e),this.getReadOptions(e,n))}readFeatures(e,n){return this.readFeaturesFromObject(a(e),this.getReadOptions(e,n))}readFeatureFromObject(e,n){return(0,i.b0)()}readFeaturesFromObject(e,n){return(0,i.b0)()}readGeometry(e,n){return this.readGeometryFromObject(a(e),this.getReadOptions(e,n))}readGeometryFromObject(e,n){return(0,i.b0)()}readProjection(e){return this.readProjectionFromObject(a(e))}readProjectionFromObject(e){return(0,i.b0)()}writeFeature(e,n){return JSON.stringify(this.writeFeatureObject(e,n))}writeFeatureObject(e,n){return(0,i.b0)()}writeFeatures(e,n){return JSON.stringify(this.writeFeaturesObject(e,n))}writeFeaturesObject(e,n){return(0,i.b0)()}writeGeometry(e,n){return JSON.stringify(this.writeGeometryObject(e,n))}writeGeometryObject(e,n){return(0,i.b0)()}}function a(e){if("string"==typeof e){return JSON.parse(e)||null}return null!==e?e:null}const s=l;var u=o(4778),c=o(2497),d=o(2096),p=o(3407),b=o(3530);function g(e,n){if(!e)return null;let o;switch(e.type){case"Point":o=function(e){const n=e.coordinates;return{type:"Point",flatCoordinates:n,layout:(0,d.p0)(n.length)}}(e);break;case"LineString":o=function(e){const n=e.coordinates,o=n.flat();return{type:"LineString",flatCoordinates:o,ends:[o.length],layout:(0,d.p0)(n[0]?.length||2)}}(e);break;case"Polygon":o=function(e){const n=e.coordinates,o=[],t=n[0]?.[0]?.length;return{type:"Polygon",flatCoordinates:o,ends:(0,c.KG)(o,0,n,t),layout:(0,d.p0)(t)}}(e);break;case"MultiPoint":o=function(e){const n=e.coordinates;return{type:"MultiPoint",flatCoordinates:n.flat(),layout:(0,d.p0)(n[0]?.length||2)}}(e);break;case"MultiLineString":o=function(e){const n=e.coordinates,o=n[0]?.[0]?.length||2,t=[];return{type:"MultiLineString",flatCoordinates:t,ends:(0,c.KG)(t,0,n,o),layout:(0,d.p0)(o)}}(e);break;case"MultiPolygon":o=function(e){const n=e.coordinates,o=[],t=n[0]?.[0]?.[0].length||2;return{type:"MultiPolygon",flatCoordinates:o,ends:(0,c.d6)(o,0,n,t),layout:(0,d.p0)(t)}}(e);break;case"GeometryCollection":o=function(e){const n=e.geometries.map((function(e){return g(e)}));return n}(e);break;default:throw new Error("Unsupported GeoJSON type: "+e.type)}return o}function m(e,n){const o=(e=(0,r.hX)(e,!0,n)).getType();let t;switch(o){case"Point":t=function(e){return{type:"Point",coordinates:e.getCoordinates()}}(e);break;case"LineString":t=function(e){return{type:"LineString",coordinates:e.getCoordinates()}}(e);break;case"Polygon":t=function(e,n){let o;return n&&(o=n.rightHanded),{type:"Polygon",coordinates:e.getCoordinates(o)}}(e,n);break;case"MultiPoint":t=function(e){return{type:"MultiPoint",coordinates:e.getCoordinates()}}(e);break;case"MultiLineString":t=function(e){return{type:"MultiLineString",coordinates:e.getCoordinates()}}(e);break;case"MultiPolygon":t=function(e,n){let o;return n&&(o=n.rightHanded),{type:"MultiPolygon",coordinates:e.getCoordinates(o)}}(e,n);break;case"GeometryCollection":t=function(e,n){delete(n=Object.assign({},n)).featureProjection;return{type:"GeometryCollection",geometries:e.getGeometriesArray().map((function(e){return m(e,n)}))}}(e,n);break;case"Circle":t={type:"GeometryCollection",geometries:[]};break;default:throw new Error("Unsupported geometry type: "+o)}return t}const f=class extends s{constructor(e){e=e||{},super(),this.dataProjection=(0,p.Jt)(e.dataProjection?e.dataProjection:"EPSG:4326"),e.featureProjection&&(this.defaultFeatureProjection=(0,p.Jt)(e.featureProjection)),e.featureClass&&(this.featureClass=e.featureClass),this.geometryName_=e.geometryName,this.extractGeometryName_=e.extractGeometryName,this.supportedMediaTypes=["application/geo+json","application/vnd.geo+json"]}readFeatureFromObject(e,n){let o=null;o="Feature"===e.type?e:{type:"Feature",geometry:e,properties:null};const i=g(o.geometry);if(this.featureClass===u.Ay)return(0,r.Bs)({geometry:i,id:o.id,properties:o.properties},n);const l=new t.A;return this.geometryName_?l.setGeometryName(this.geometryName_):this.extractGeometryName_&&o.geometry_name&&l.setGeometryName(o.geometry_name),l.setGeometry((0,r.te)(i,n)),"id"in o&&l.setId(o.id),o.properties&&l.setProperties(o.properties,!0),l}readFeaturesFromObject(e,n){let o=null;if("FeatureCollection"===e.type){o=[];const t=e.features;for(let e=0,r=t.length;e<r;++e){const r=this.readFeatureFromObject(t[e],n);r&&o.push(r)}}else o=[this.readFeatureFromObject(e,n)];return o.flat()}readGeometryFromObject(e,n){return function(e,n){const o=g(e);return(0,r.te)(o,n)}(e,n)}readProjectionFromObject(e){const n=e.crs;let o;if(n)if("name"==n.type)o=(0,p.Jt)(n.properties.name);else{if("EPSG"!==n.type)throw new Error("Unknown SRS type");o=(0,p.Jt)("EPSG:"+n.properties.code)}else o=this.dataProjection;return o}writeFeatureObject(e,n){n=this.adaptOptions(n);const o={type:"Feature",geometry:null,properties:null},t=e.getId();if(void 0!==t&&(o.id=t),!e.hasProperties())return o;const r=e.getProperties(),i=e.getGeometry();return i&&(o.geometry=m(i,n),delete r[e.getGeometryName()]),(0,b.p)(r)||(o.properties=r),o}writeFeaturesObject(e,n){n=this.adaptOptions(n);const o=[];for(let t=0,r=e.length;t<r;++t)o.push(this.writeFeatureObject(e[t],n));return{type:"FeatureCollection",features:o}}writeGeometryObject(e,n){return m(e,this.adaptOptions(n))}}}}]);