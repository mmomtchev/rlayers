"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[6025],{4096:(n,o,e)=>{e.d(o,{A:()=>i});var r=e(1601),t=e.n(r),l=e(6314),a=e.n(l)()(t());a.push([n.id,':root,\n:host {\n  --ol-background-color: white;\n  --ol-accent-background-color: #F5F5F5;\n  --ol-subtle-background-color: rgba(128, 128, 128, 0.25);\n  --ol-partial-background-color: rgba(255, 255, 255, 0.75);\n  --ol-foreground-color: #333333;\n  --ol-subtle-foreground-color: #666666;\n  --ol-brand-color: #00AAFF;\n}\n\n.ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 1.5px solid var(--ol-background-color);\n  background-color: var(--ol-partial-background-color);\n}\n\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.ol-scale-line {\n  background: var(--ol-partial-background-color);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.ol-scale-line-inner {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  border-top: none;\n  color: var(--ol-foreground-color);\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n  transition: all 0.25s;\n}\n\n.ol-scale-bar {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n}\n\n.ol-scale-bar-inner {\n  display: flex;\n}\n\n.ol-scale-step-marker {\n  width: 1px;\n  height: 15px;\n  background-color: var(--ol-foreground-color);\n  float: right;\n  z-index: 10;\n}\n\n.ol-scale-step-text {\n  position: absolute;\n  bottom: -5px;\n  font-size: 10px;\n  z-index: 11;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-text {\n  position: absolute;\n  font-size: 12px;\n  text-align: center;\n  bottom: 25px;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-singlebar {\n  position: relative;\n  height: 10px;\n  z-index: 9;\n  box-sizing: border-box;\n  border: 1px solid var(--ol-foreground-color);\n}\n\n.ol-scale-singlebar-even {\n  background-color: var(--ol-subtle-foreground-color);\n}\n\n.ol-scale-singlebar-odd {\n  background-color: var(--ol-background-color);\n}\n\n.ol-unsupported {\n  display: none;\n}\n\n.ol-viewport,\n.ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.ol-viewport canvas {\n  all: unset;\n  overflow: hidden;\n}\n\n.ol-viewport {\n  touch-action: pan-x pan-y;\n}\n\n.ol-selectable {\n  -webkit-touch-callout: default;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  user-select: text;\n}\n\n.ol-grabbing {\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n.ol-grab {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab;\n}\n\n.ol-control {\n  position: absolute;\n  background-color: var(--ol-subtle-background-color);\n  border-radius: 4px;\n}\n\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  transition: opacity .25s linear, visibility 0s linear;\n}\n\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .25s linear, visibility 0s linear .25s;\n}\n\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: var(--ol-subtle-foreground-color);\n  font-weight: bold;\n  text-decoration: none;\n  font-size: inherit;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: var(--ol-background-color);\n  border: none;\n  border-radius: 2px;\n}\n\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.ol-compass {\n  display: block;\n  font-weight: normal;\n  will-change: transform;\n}\n\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.ol-control button:hover,\n.ol-control button:focus {\n  text-decoration: none;\n  outline: 1px solid var(--ol-subtle-foreground-color);\n  color: var(--ol-foreground-color);\n}\n\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: calc(100% - 1.3em);\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n}\n\n.ol-attribution a {\n  color: var(--ol-subtle-foreground-color);\n  text-decoration: none;\n}\n\n.ol-attribution ul {\n  margin: 0;\n  padding: 1px .5em;\n  color: var(--ol-foreground-color);\n  text-shadow: 0 0 2px var(--ol-background-color);\n  font-size: 12px;\n}\n\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n}\n\n.ol-attribution li:not(:last-child):after {\n  content: " ";\n}\n\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.ol-attribution button {\n  flex-shrink: 0;\n}\n\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.ol-attribution:not(.ol-collapsed) {\n  background: var(--ol-partial-background-color);\n}\n\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n}\n\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n\n.ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.ol-overviewmap .ol-overviewmap-map,\n.ol-overviewmap button {\n  display: block;\n}\n\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  height: 150px;\n  width: 150px;\n}\n\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n}\n\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-overviewmap:not(.ol-collapsed) {\n  background: var(--ol-subtle-background-color);\n}\n\n.ol-overviewmap-box {\n  border: 1.5px dotted var(--ol-subtle-foreground-color);\n}\n\n.ol-overviewmap .ol-overviewmap-box:hover {\n  cursor: move;\n}\n\n.ol-overviewmap .ol-viewport:hover {\n  cursor: pointer;\n}\n',""]);const i=a},783:(n,o,e)=>{e.d(o,{A:()=>i});var r=e(1601),t=e.n(r),l=e(6314),a=e.n(l)()(t());a.push([n.id,".ol-layers-control {\n    right: 0.5em;\n    top: 2.5em;\n    background-color: rgba(255,255,255,0.6);\n}\n\n.ol-layers-control:hover {\n    background-color: rgba(255,255,255,0.9);\n}\n\n.ol-layers-control label {\n    margin-left: 0.25em;\n}\n\n.ol-layers-control>div {\n    padding: 0.25em;\n}\n\n.ol-layers-control>span>*:first-child {\n    margin-left: auto;\n}",""]);const i=a},5045:(n,o,e)=>{var r=e(5072),t=e.n(r),l=e(7825),a=e.n(l),i=e(7659),s=e.n(i),c=e(5056),p=e.n(c),m=e(540),u=e.n(m),d=e(1113),b=e.n(d),g=e(4096),x={};x.styleTagTransform=b(),x.setAttributes=p(),x.insert=s().bind(null,"head"),x.domAPI=a(),x.insertStyleElement=u(),t()(g.A,x),g.A&&g.A.locals&&g.A.locals},7601:(n,o,e)=>{var r=e(5072),t=e.n(r),l=e(7825),a=e.n(l),i=e(7659),s=e.n(i),c=e(5056),p=e.n(c),m=e(540),u=e.n(m),d=e(1113),b=e.n(d),g=e(783),x={};x.styleTagTransform=b(),x.setAttributes=p(),x.insert=s().bind(null,"head"),x.domAPI=a(),x.insertStyleElement=u(),t()(g.A,x),g.A&&g.A.locals&&g.A.locals},6025:(n,o,e)=>{e.r(o),e.d(o,{default:()=>p});var r=e(6540),t=e(6391),l=e(1365),a=e(7240),i=e(2381),s=(e(5045),e(7601),e(6717));const c=r.createElement("button",null,"☰");function p(){return r.createElement("div",null,r.createElement("p",null,"Use the layers controls in the upper right corner to switch the active layer"),r.createElement(a.f9,{className:"example-map",initial:{center:(0,t.Rb)([2.364,48.82]),zoom:7}},r.createElement(a.E6.bc,{element:c},r.createElement(a.ej,{properties:{label:"OpenStreetMap"}}),r.createElement(a.HS,{properties:{label:"OpenTopo"},url:"https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",attributions:"Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)"}),r.createElement(a.HS,{properties:{label:"Transport"},url:"http://tile.thunderforest.com/transport/{z}/{x}/{y}.png"}),r.createElement(i.A,{properties:{label:"Stadia Terrain Background"},layer:"stamen_terrain_background"}),r.createElement(a.QN,{properties:{label:"Mapbox TileJSON"},url:"https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1"}),r.createElement(a.Tw,{properties:{label:"Magellium OSM France Schools WMS"},url:"https://magosm.magellium.com/geoserver/ows",params:{LAYERS:"magosm:france_schools_point",FORMAT:"image/jpeg"}}),r.createElement(a.Ff,{properties:{label:"Switzerland ArcGIS TileWMS"},url:"https://wms.geo.admin.ch/",params:{LAYERS:"ch.swisstopo.pixelkarte-farbe-pk1000.noscale",FORMAT:"image/jpeg",serverType:"mapserver"}})),r.createElement(a.j9,{zIndex:5,format:new l.A({featureProjection:"EPSG:3857",featureClass:s.A}),url:"https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson"},r.createElement(a.cq.RStyle,null,r.createElement(a.cq.RStroke,{color:"#007bff",width:3}),r.createElement(a.cq.RFill,{color:"transparent"})))))}},2381:(n,o,e)=>{e.d(o,{A:()=>a});var r=e(945),t=e(5042),l=e(2662);class a extends l.A{constructor(n){var o;super(n),this.source=new t.A({layer:this.props.layer,apiKey:this.props.apiKey,retina:null!==(o=this.props.retina)&&void 0!==o&&o}),this.ol=new r.A({source:this.source}),this.eventSources=[this.ol,this.source]}}},5042:(n,o,e)=>{e.d(o,{A:()=>s});var r=e(7896),t=e(702);const l={stamen_terrain:{extension:"png"},stamen_terrain_background:{extension:"png"},stamen_terrain_labels:{extension:"png"},stamen_terrain_lines:{extension:"png"},stamen_toner_background:{extension:"png"},stamen_toner:{extension:"png"},stamen_toner_labels:{extension:"png"},stamen_toner_lines:{extension:"png"},stamen_toner_lite:{extension:"png"},stamen_watercolor:{extension:"jpg"},alidade_smooth:{extension:"png"},alidade_smooth_dark:{extension:"png"},alidade_satellite:{extension:"png"},outdoors:{extension:"png"},osm_bright:{extension:"png"}},a={stamen_terrain:{minZoom:0,maxZoom:18,retina:!0},stamen_toner:{minZoom:0,maxZoom:20,retina:!0},stamen_watercolor:{minZoom:1,maxZoom:18,retina:!1}};class i extends t.A{constructor(n){const o=n.layer.indexOf("-"),e=-1==o?n.layer:n.layer.slice(0,o),t=a[e]||{minZoom:0,maxZoom:20,retina:!0},i=l[n.layer],s=n.apiKey?"?api_key="+n.apiKey:"",c=t.retina&&n.retina?"@2x":"",p=void 0!==n.url?n.url:"https://tiles.stadiamaps.com/tiles/"+n.layer+"/{z}/{x}/{y}"+c+"."+i.extension+s,m=['&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>','&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>',r.o];n.layer.startsWith("stamen_")&&m.splice(1,0,'&copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a>'),super({attributions:m,cacheSize:n.cacheSize,crossOrigin:"anonymous",interpolate:n.interpolate,maxZoom:void 0!==n.maxZoom?n.maxZoom:t.maxZoom,minZoom:void 0!==n.minZoom?n.minZoom:t.minZoom,reprojectionErrorThreshold:n.reprojectionErrorThreshold,tileLoadFunction:n.tileLoadFunction,transition:n.transition,url:p,tilePixelRatio:c?2:1,wrapX:n.wrapX,zDirection:n.zDirection})}}const s=i}}]);