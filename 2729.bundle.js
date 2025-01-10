"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[2729],{4096:(n,o,e)=>{e.d(o,{A:()=>i});var t=e(1601),r=e.n(t),l=e(6314),a=e.n(l)()(r());a.push([n.id,':root,\n:host {\n  --ol-background-color: white;\n  --ol-accent-background-color: #F5F5F5;\n  --ol-subtle-background-color: rgba(128, 128, 128, 0.25);\n  --ol-partial-background-color: rgba(255, 255, 255, 0.75);\n  --ol-foreground-color: #333333;\n  --ol-subtle-foreground-color: #666666;\n  --ol-brand-color: #00AAFF;\n}\n\n.ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 1.5px solid var(--ol-background-color);\n  background-color: var(--ol-partial-background-color);\n}\n\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.ol-scale-line {\n  background: var(--ol-partial-background-color);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.ol-scale-line-inner {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  border-top: none;\n  color: var(--ol-foreground-color);\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n  transition: all 0.25s;\n}\n\n.ol-scale-bar {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n}\n\n.ol-scale-bar-inner {\n  display: flex;\n}\n\n.ol-scale-step-marker {\n  width: 1px;\n  height: 15px;\n  background-color: var(--ol-foreground-color);\n  float: right;\n  z-index: 10;\n}\n\n.ol-scale-step-text {\n  position: absolute;\n  bottom: -5px;\n  font-size: 10px;\n  z-index: 11;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-text {\n  position: absolute;\n  font-size: 12px;\n  text-align: center;\n  bottom: 25px;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-singlebar {\n  position: relative;\n  height: 10px;\n  z-index: 9;\n  box-sizing: border-box;\n  border: 1px solid var(--ol-foreground-color);\n}\n\n.ol-scale-singlebar-even {\n  background-color: var(--ol-subtle-foreground-color);\n}\n\n.ol-scale-singlebar-odd {\n  background-color: var(--ol-background-color);\n}\n\n.ol-unsupported {\n  display: none;\n}\n\n.ol-viewport,\n.ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.ol-viewport canvas {\n  all: unset;\n  overflow: hidden;\n}\n\n.ol-viewport {\n  touch-action: pan-x pan-y;\n}\n\n.ol-selectable {\n  -webkit-touch-callout: default;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  user-select: text;\n}\n\n.ol-grabbing {\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n.ol-grab {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab;\n}\n\n.ol-control {\n  position: absolute;\n  background-color: var(--ol-subtle-background-color);\n  border-radius: 4px;\n}\n\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  transition: opacity .25s linear, visibility 0s linear;\n}\n\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .25s linear, visibility 0s linear .25s;\n}\n\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: var(--ol-subtle-foreground-color);\n  font-weight: bold;\n  text-decoration: none;\n  font-size: inherit;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: var(--ol-background-color);\n  border: none;\n  border-radius: 2px;\n}\n\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.ol-compass {\n  display: block;\n  font-weight: normal;\n  will-change: transform;\n}\n\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.ol-control button:hover,\n.ol-control button:focus {\n  text-decoration: none;\n  outline: 1px solid var(--ol-subtle-foreground-color);\n  color: var(--ol-foreground-color);\n}\n\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: calc(100% - 1.3em);\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n}\n\n.ol-attribution a {\n  color: var(--ol-subtle-foreground-color);\n  text-decoration: none;\n}\n\n.ol-attribution ul {\n  margin: 0;\n  padding: 1px .5em;\n  color: var(--ol-foreground-color);\n  text-shadow: 0 0 2px var(--ol-background-color);\n  font-size: 12px;\n}\n\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n}\n\n.ol-attribution li:not(:last-child):after {\n  content: " ";\n}\n\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.ol-attribution button {\n  flex-shrink: 0;\n}\n\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.ol-attribution:not(.ol-collapsed) {\n  background: var(--ol-partial-background-color);\n}\n\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n}\n\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n\n.ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.ol-overviewmap .ol-overviewmap-map,\n.ol-overviewmap button {\n  display: block;\n}\n\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  height: 150px;\n  width: 150px;\n}\n\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n}\n\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-overviewmap:not(.ol-collapsed) {\n  background: var(--ol-subtle-background-color);\n}\n\n.ol-overviewmap-box {\n  border: 1.5px dotted var(--ol-subtle-foreground-color);\n}\n\n.ol-overviewmap .ol-overviewmap-box:hover {\n  cursor: move;\n}\n\n.ol-overviewmap .ol-viewport:hover {\n  cursor: pointer;\n}\n',""]);const i=a},6308:(n,o,e)=>{e.d(o,{A:()=>t});const t=e.p+"32ba7744565a0c818ef0e2e35126abbb.geojson"},5045:(n,o,e)=>{var t=e(5072),r=e.n(t),l=e(7825),a=e.n(l),i=e(7659),s=e.n(i),c=e(5056),u=e.n(c),p=e(540),d=e.n(p),m=e(1113),b=e.n(m),g=e(4096),x={};x.styleTagTransform=b(),x.setAttributes=u(),x.insert=s().bind(null,"head"),x.domAPI=a(),x.insertStyleElement=d(),r()(g.A,x),g.A&&g.A.locals&&g.A.locals},2729:(n,o,e)=>{e.r(o),e.d(o,{default:()=>x});var t=e(6540),r=e(6391),l=e(1365),a=e(915),i=(e(5045),e(7240)),s=e(5111),c=e(2381),u=e(6308),p=e(6717);const d=new l.A({featureProjection:"EPSG:3857",featureClass:p.A}),m=n=>"rgba("+[255,153,0,Math.min(.8,.4+Math.log(n/10)/20)].join()+")",b=n=>Math.round(5*(parseFloat(n.get("mag"))-2.5)),g=(n,o)=>{const e=(0,a.S5)();for(const o of n)(0,a.X$)(e,o.getGeometry().getExtent());return Math.round(.25*((0,a.RG)(e)+(0,a.Oq)(e)))/o};function x(){const[n,o]=t.useState(20),[e,l]=t.useState("Click a cluster for details"),a=t.useRef();return t.createElement(t.Fragment,null,t.createElement(i.f9,{className:"example-map",initial:{center:(0,r.Rb)([0,0]),zoom:1}},t.createElement(c.A,{layer:"stamen_toner"}),t.createElement(i.od,{ref:a,distance:n,format:d,url:u.A,onClick:t.useCallback((n=>{var o;const e=null!==(o=n.target.get("features"))&&void 0!==o?o:[];l(`${e.length} earthquakes in this location, magnitudes are ${e.map((n=>n.get("mag"))).join(", ")}`)}),[])},t.createElement(s.RStyle,{cacheSize:1024,cacheId:(0,t.useCallback)(((n,o)=>n.get("features").length>1?"#"+g(n.get("features"),o):"$"+b(n.get("features")[0])),[]),render:(0,t.useCallback)(((n,o)=>{const e=n.get("features").length;if(e>1){const r=g(n.get("features"),o);return t.createElement(t.Fragment,null,t.createElement(s.RCircle,{radius:r},t.createElement(s.RFill,{color:m(e)})),t.createElement(s.RText,{text:e.toString()},t.createElement(s.RFill,{color:"#fff"}),t.createElement(s.RStroke,{color:"rgba(0, 0, 0, 0.6)",width:3})))}const r=n.get("features")[0];return t.createElement(s.RRegularShape,{radius:b(r),radius2:3,points:5,angle:Math.PI},t.createElement(s.RFill,{color:"rgba(255, 153, 0, 0.8)"}),t.createElement(s.RStroke,{color:"rgba(255, 204, 0, 0.2)",width:1}))}),[])}))),t.createElement("div",{className:"my-3 w-100"},t.createElement("label",{htmlFor:"distance"},"Clustering distance"),t.createElement("div",{className:"w-100"},t.createElement("input",{type:"range",className:"range-slider range-slider--primary w-100",min:"5",max:"50",id:"distance",value:n,onChange:(0,t.useCallback)((n=>o(parseInt(n.currentTarget.value))),[])}))),t.createElement("div",null,e))}},2381:(n,o,e)=>{e.d(o,{A:()=>a});var t=e(945),r=e(5042),l=e(2662);class a extends l.A{constructor(n,o){var e;super(n,o),this.source=new r.A({layer:this.props.layer,apiKey:this.props.apiKey,retina:null!==(e=this.props.retina)&&void 0!==e&&e}),this.ol=new t.A({source:this.source}),this.eventSources=[this.ol,this.source]}}},5042:(n,o,e)=>{e.d(o,{A:()=>s});var t=e(702),r=e(7896);const l={stamen_terrain:{extension:"png"},stamen_terrain_background:{extension:"png"},stamen_terrain_labels:{extension:"png"},stamen_terrain_lines:{extension:"png"},stamen_toner_background:{extension:"png"},stamen_toner:{extension:"png"},stamen_toner_labels:{extension:"png"},stamen_toner_lines:{extension:"png"},stamen_toner_lite:{extension:"png"},stamen_watercolor:{extension:"jpg"},alidade_smooth:{extension:"png"},alidade_smooth_dark:{extension:"png"},alidade_satellite:{extension:"png"},outdoors:{extension:"png"},osm_bright:{extension:"png"}},a={stamen_terrain:{minZoom:0,maxZoom:18,retina:!0},stamen_toner:{minZoom:0,maxZoom:20,retina:!0},stamen_watercolor:{minZoom:1,maxZoom:18,retina:!1}};class i extends t.A{constructor(n){const o=n.layer.indexOf("-"),e=-1==o?n.layer:n.layer.slice(0,o),t=a[e]||{minZoom:0,maxZoom:20,retina:!0},i=l[n.layer],s=n.apiKey?"?api_key="+n.apiKey:"",c=t.retina&&n.retina?"@2x":"",u=void 0!==n.url?n.url:"https://tiles.stadiamaps.com/tiles/"+n.layer+"/{z}/{x}/{y}"+c+"."+i.extension+s,p=['&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>','&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>',r.o];n.layer.startsWith("stamen_")&&p.splice(1,0,'&copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a>'),super({attributions:p,cacheSize:n.cacheSize,crossOrigin:"anonymous",interpolate:n.interpolate,maxZoom:void 0!==n.maxZoom?n.maxZoom:t.maxZoom,minZoom:void 0!==n.minZoom?n.minZoom:t.minZoom,reprojectionErrorThreshold:n.reprojectionErrorThreshold,tileLoadFunction:n.tileLoadFunction,transition:n.transition,url:u,tilePixelRatio:c?2:1,wrapX:n.wrapX,zDirection:n.zDirection})}}const s=i}}]);