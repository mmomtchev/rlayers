"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[3220],{4096:(n,o,t)=>{t.d(o,{A:()=>i});var e=t(1601),r=t.n(e),l=t(6314),a=t.n(l)()(r());a.push([n.id,':root,\n:host {\n  --ol-background-color: white;\n  --ol-accent-background-color: #F5F5F5;\n  --ol-subtle-background-color: rgba(128, 128, 128, 0.25);\n  --ol-partial-background-color: rgba(255, 255, 255, 0.75);\n  --ol-foreground-color: #333333;\n  --ol-subtle-foreground-color: #666666;\n  --ol-brand-color: #00AAFF;\n}\n\n.ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 1.5px solid var(--ol-background-color);\n  background-color: var(--ol-partial-background-color);\n}\n\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.ol-scale-line {\n  background: var(--ol-partial-background-color);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.ol-scale-line-inner {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  border-top: none;\n  color: var(--ol-foreground-color);\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n  transition: all 0.25s;\n}\n\n.ol-scale-bar {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n}\n\n.ol-scale-bar-inner {\n  display: flex;\n}\n\n.ol-scale-step-marker {\n  width: 1px;\n  height: 15px;\n  background-color: var(--ol-foreground-color);\n  float: right;\n  z-index: 10;\n}\n\n.ol-scale-step-text {\n  position: absolute;\n  bottom: -5px;\n  font-size: 10px;\n  z-index: 11;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-text {\n  position: absolute;\n  font-size: 12px;\n  text-align: center;\n  bottom: 25px;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-singlebar {\n  position: relative;\n  height: 10px;\n  z-index: 9;\n  box-sizing: border-box;\n  border: 1px solid var(--ol-foreground-color);\n}\n\n.ol-scale-singlebar-even {\n  background-color: var(--ol-subtle-foreground-color);\n}\n\n.ol-scale-singlebar-odd {\n  background-color: var(--ol-background-color);\n}\n\n.ol-unsupported {\n  display: none;\n}\n\n.ol-viewport,\n.ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.ol-viewport canvas {\n  all: unset;\n  overflow: hidden;\n}\n\n.ol-viewport {\n  touch-action: pan-x pan-y;\n}\n\n.ol-selectable {\n  -webkit-touch-callout: default;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  user-select: text;\n}\n\n.ol-grabbing {\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n.ol-grab {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab;\n}\n\n.ol-control {\n  position: absolute;\n  background-color: var(--ol-subtle-background-color);\n  border-radius: 4px;\n}\n\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  transition: opacity .25s linear, visibility 0s linear;\n}\n\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .25s linear, visibility 0s linear .25s;\n}\n\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: var(--ol-subtle-foreground-color);\n  font-weight: bold;\n  text-decoration: none;\n  font-size: inherit;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: var(--ol-background-color);\n  border: none;\n  border-radius: 2px;\n}\n\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.ol-compass {\n  display: block;\n  font-weight: normal;\n  will-change: transform;\n}\n\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.ol-control button:hover,\n.ol-control button:focus {\n  text-decoration: none;\n  outline: 1px solid var(--ol-subtle-foreground-color);\n  color: var(--ol-foreground-color);\n}\n\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: calc(100% - 1.3em);\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n}\n\n.ol-attribution a {\n  color: var(--ol-subtle-foreground-color);\n  text-decoration: none;\n}\n\n.ol-attribution ul {\n  margin: 0;\n  padding: 1px .5em;\n  color: var(--ol-foreground-color);\n  text-shadow: 0 0 2px var(--ol-background-color);\n  font-size: 12px;\n}\n\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n}\n\n.ol-attribution li:not(:last-child):after {\n  content: " ";\n}\n\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.ol-attribution button {\n  flex-shrink: 0;\n}\n\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.ol-attribution:not(.ol-collapsed) {\n  background: var(--ol-partial-background-color);\n}\n\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n}\n\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n\n.ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.ol-overviewmap .ol-overviewmap-map,\n.ol-overviewmap button {\n  display: block;\n}\n\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  height: 150px;\n  width: 150px;\n}\n\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n}\n\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-overviewmap:not(.ol-collapsed) {\n  background: var(--ol-subtle-background-color);\n}\n\n.ol-overviewmap-box {\n  border: 1.5px dotted var(--ol-subtle-foreground-color);\n}\n\n.ol-overviewmap .ol-overviewmap-box:hover {\n  cursor: move;\n}\n\n.ol-overviewmap .ol-viewport:hover {\n  cursor: pointer;\n}\n',""]);const i=a},5045:(n,o,t)=>{var e=t(5072),r=t.n(e),l=t(7825),a=t.n(l),i=t(7659),s=t.n(i),u=t(5056),c=t.n(u),d=t(540),p=t.n(d),b=t(1113),g=t.n(b),m=t(4096),x={};x.styleTagTransform=g(),x.setAttributes=c(),x.insert=s().bind(null,"head"),x.domAPI=a(),x.insertStyleElement=p(),r()(m.A,x),m.A&&m.A.locals&&m.A.locals},8217:(n,o,t)=>{t.d(o,{Ay:()=>m,Bs:()=>v,hX:()=>x,te:()=>f});var e=t(6717),r=t(4778),l=t(4294),a=t(1217),i=t(1064),s=t(503),u=t(6702),c=t(2871),d=t(4338),p=t(4087),b=t(3407),g=t(3402);const m=class{constructor(){this.dataProjection=void 0,this.defaultFeatureProjection=void 0,this.featureClass=e.A,this.supportedMediaTypes=null}getReadOptions(n,o){if(o){let t=o.dataProjection?(0,b.Jt)(o.dataProjection):this.readProjection(n);o.extent&&t&&"tile-pixels"===t.getUnits()&&(t=(0,b.Jt)(t),t.setWorldExtent(o.extent)),o={dataProjection:t,featureProjection:o.featureProjection}}return this.adaptOptions(o)}adaptOptions(n){return Object.assign({dataProjection:this.dataProjection,featureProjection:this.defaultFeatureProjection,featureClass:this.featureClass},n)}getType(){return(0,p.b0)()}readFeature(n,o){return(0,p.b0)()}readFeatures(n,o){return(0,p.b0)()}readGeometry(n,o){return(0,p.b0)()}readProjection(n){return(0,p.b0)()}writeFeature(n,o){return(0,p.b0)()}writeFeatures(n,o){return(0,p.b0)()}writeGeometry(n,o){return(0,p.b0)()}};function x(n,o,t){const e=t?(0,b.Jt)(t.featureProjection):null,r=t?(0,b.Jt)(t.dataProjection):null;let l=n;if(e&&r&&!(0,b.tI)(e,r)){o&&(l=n.clone());const t=o?e:r,a=o?r:e;"tile-pixels"===t.getUnits()?l.transform(t,a):l.applyTransform((0,b.RG)(t,a))}if(o&&t&&void 0!==t.decimals){const o=Math.pow(10,t.decimals),e=function(n){for(let t=0,e=n.length;t<e;++t)n[t]=Math.round(n[t]*o)/o;return n};l===n&&(l=n.clone()),l.applyTransform(e)}return l}const h={Point:l.A,LineString:a.A,Polygon:i.Ay,MultiPoint:s.A,MultiLineString:u.A,MultiPolygon:c.A};function v(n,o){const t=n.geometry;if(!t)return[];if(Array.isArray(t))return t.map((o=>v({...n,geometry:o}))).flat();const e="MultiPolygon"===t.type?"Polygon":t.type;if("GeometryCollection"===e||"Circle"===e)throw new Error("Unsupported geometry type: "+e);const l=t.layout.length;return x(new r.Ay(e,"Polygon"===e?function(n,o,t){return Array.isArray(o[0])?((0,g.mb)(n,0,o,t)||(n=n.slice(),(0,g.NK)(n,0,o,t)),n):((0,g.PA)(n,0,o,t)||(n=n.slice(),(0,g.ug)(n,0,o,t)),n)}(t.flatCoordinates,t.ends,l):t.flatCoordinates,t.ends?.flat(),l,n.properties||{},n.id).enableSimplifyTransformed(),!1,o)}function f(n,o){if(!n)return null;if(Array.isArray(n)){const t=n.map((n=>f(n,o)));return new d.A(t)}return x(new(0,h[n.type])(n.flatCoordinates,n.layout,n.ends),!1,o)}},6888:(n,o,t)=>{t.d(o,{A:()=>i});var e=t(8217),r=t(4087);class l extends e.Ay{constructor(){super()}getType(){return"text"}readFeature(n,o){return this.readFeatureFromText(a(n),this.adaptOptions(o))}readFeatureFromText(n,o){return(0,r.b0)()}readFeatures(n,o){return this.readFeaturesFromText(a(n),this.adaptOptions(o))}readFeaturesFromText(n,o){return(0,r.b0)()}readGeometry(n,o){return this.readGeometryFromText(a(n),this.adaptOptions(o))}readGeometryFromText(n,o){return(0,r.b0)()}readProjection(n){return this.readProjectionFromText(a(n))}readProjectionFromText(n){return this.dataProjection}writeFeature(n,o){return this.writeFeatureText(n,this.adaptOptions(o))}writeFeatureText(n,o){return(0,r.b0)()}writeFeatures(n,o){return this.writeFeaturesText(n,this.adaptOptions(o))}writeFeaturesText(n,o){return(0,r.b0)()}writeGeometry(n,o){return this.writeGeometryText(n,this.adaptOptions(o))}writeGeometryText(n,o){return(0,r.b0)()}}function a(n){return"string"==typeof n?n:""}const i=l}}]);