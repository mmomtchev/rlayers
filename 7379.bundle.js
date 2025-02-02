"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[7379],{4096:(n,o,e)=>{e.d(o,{A:()=>a});var t=e(1601),r=e.n(t),l=e(6314),i=e.n(l)()(r());i.push([n.id,':root,\n:host {\n  --ol-background-color: white;\n  --ol-accent-background-color: #F5F5F5;\n  --ol-subtle-background-color: rgba(128, 128, 128, 0.25);\n  --ol-partial-background-color: rgba(255, 255, 255, 0.75);\n  --ol-foreground-color: #333333;\n  --ol-subtle-foreground-color: #666666;\n  --ol-brand-color: #00AAFF;\n}\n\n.ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 1.5px solid var(--ol-background-color);\n  background-color: var(--ol-partial-background-color);\n}\n\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.ol-scale-line {\n  background: var(--ol-partial-background-color);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.ol-scale-line-inner {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  border-top: none;\n  color: var(--ol-foreground-color);\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n  transition: all 0.25s;\n}\n\n.ol-scale-bar {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n}\n\n.ol-scale-bar-inner {\n  display: flex;\n}\n\n.ol-scale-step-marker {\n  width: 1px;\n  height: 15px;\n  background-color: var(--ol-foreground-color);\n  float: right;\n  z-index: 10;\n}\n\n.ol-scale-step-text {\n  position: absolute;\n  bottom: -5px;\n  font-size: 10px;\n  z-index: 11;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-text {\n  position: absolute;\n  font-size: 12px;\n  text-align: center;\n  bottom: 25px;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-singlebar {\n  position: relative;\n  height: 10px;\n  z-index: 9;\n  box-sizing: border-box;\n  border: 1px solid var(--ol-foreground-color);\n}\n\n.ol-scale-singlebar-even {\n  background-color: var(--ol-subtle-foreground-color);\n}\n\n.ol-scale-singlebar-odd {\n  background-color: var(--ol-background-color);\n}\n\n.ol-unsupported {\n  display: none;\n}\n\n.ol-viewport,\n.ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.ol-viewport canvas {\n  all: unset;\n  overflow: hidden;\n}\n\n.ol-viewport {\n  touch-action: pan-x pan-y;\n}\n\n.ol-selectable {\n  -webkit-touch-callout: default;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  user-select: text;\n}\n\n.ol-grabbing {\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n.ol-grab {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab;\n}\n\n.ol-control {\n  position: absolute;\n  background-color: var(--ol-subtle-background-color);\n  border-radius: 4px;\n}\n\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  transition: opacity .25s linear, visibility 0s linear;\n}\n\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .25s linear, visibility 0s linear .25s;\n}\n\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: var(--ol-subtle-foreground-color);\n  font-weight: bold;\n  text-decoration: none;\n  font-size: inherit;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: var(--ol-background-color);\n  border: none;\n  border-radius: 2px;\n}\n\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.ol-compass {\n  display: block;\n  font-weight: normal;\n  will-change: transform;\n}\n\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.ol-control button:hover,\n.ol-control button:focus {\n  text-decoration: none;\n  outline: 1px solid var(--ol-subtle-foreground-color);\n  color: var(--ol-foreground-color);\n}\n\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: calc(100% - 1.3em);\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n}\n\n.ol-attribution a {\n  color: var(--ol-subtle-foreground-color);\n  text-decoration: none;\n}\n\n.ol-attribution ul {\n  margin: 0;\n  padding: 1px .5em;\n  color: var(--ol-foreground-color);\n  text-shadow: 0 0 2px var(--ol-background-color);\n  font-size: 12px;\n}\n\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n}\n\n.ol-attribution li:not(:last-child):after {\n  content: " ";\n}\n\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.ol-attribution button {\n  flex-shrink: 0;\n}\n\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.ol-attribution:not(.ol-collapsed) {\n  background: var(--ol-partial-background-color);\n}\n\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n}\n\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n\n.ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.ol-overviewmap .ol-overviewmap-map,\n.ol-overviewmap button {\n  display: block;\n}\n\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  height: 150px;\n  width: 150px;\n}\n\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n}\n\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-overviewmap:not(.ol-collapsed) {\n  background: var(--ol-subtle-background-color);\n}\n\n.ol-overviewmap-box {\n  border: 1.5px dotted var(--ol-subtle-foreground-color);\n}\n\n.ol-overviewmap .ol-overviewmap-box:hover {\n  cursor: move;\n}\n\n.ol-overviewmap .ol-viewport:hover {\n  cursor: pointer;\n}\n',""]);const a=i},5045:(n,o,e)=>{var t=e(5072),r=e.n(t),l=e(7825),i=e.n(l),a=e(7659),s=e.n(a),c=e(5056),u=e.n(c),d=e(540),p=e.n(d),b=e(1113),h=e.n(b),m=e(4096),g={};g.styleTagTransform=h(),g.setAttributes=u(),g.insert=s().bind(null,"head"),g.domAPI=i(),g.insertStyleElement=p(),r()(m.A,g),m.A&&m.A.locals&&m.A.locals},9760:(n,o,e)=>{e.r(o),e.d(o,{default:()=>B});var t=e(6540),r=e(6391),l=(e(5045),e(7240)),i=e(8063),a=e(2627),s=e(2662),c=e(4114),u=e(1169),d=e(1443);class p extends s.A{constructor(n){super(n),this.addon=Promise.all([e.e(3075),e.e(8112),e.e(1060)]).then(e.bind(e,1060)),this.ol=new i.A({style:u.Ay.getStyle(this.props.style),renderBuffer:this.props.renderBuffer}),this.eventSources=[this.ol]}createSource(){(0,d.A)("createSource start",this),this.metadata=this.addon.then((n=>{var o,e,t,r;return n.importMBTiles({url:this.props.url,sqlWorkers:null!==(o=this.props.workers)&&void 0!==o?o:4,sqlCacheSize:null!==(e=this.props.sqlCacheSize)&&void 0!==e?e:4096,maxSqlPageSize:null!==(t=this.props.maxSqlPageSize)&&void 0!==t?t:4096,backendType:null!==(r=this.props.backend)&&void 0!==r?r:"sync"})}));const n=new AbortController;this.abort=n,Promise.all([this.addon,this.metadata]).then((([o,e])=>n.signal.aborted?((0,d.A)("createSource aborted",this),void e.pool.then((n=>n.close()))):(this.source=new o.MBTilesVectorSource(e),this.eventSources=[this.ol,this.source],this.ol.setSource(this.source),this.attachOldEventHandlers(this.source),this.props.onMetadataReady&&this.props.onMetadataReady.call(this,e),this.source)))}destroySource(){(0,d.A)("destroySource",this,this.abort),this.source&&(this.source.dispose(),this.source=null,this.ol&&this.ol.setSource(null)),this.abort&&(this.abort.abort(),this.abort=null)}componentWillUnmount(){super.componentWillUnmount(),this.destroySource()}refresh(n){super.refresh(n);const o=Object.keys(this.props).filter((n=>n.startsWith("on"))).reduce(((n,o)=>({...n,["_"+o.toLowerCase()]:this.props[o]})),{});this.ol.setProperties(o),(null==n?void 0:n.style)!==this.props.style&&this.ol.setStyle(u.Ay.getStyle(this.props.style)),(null==n?void 0:n.url)!==this.props.url&&(this.destroySource(),this.createSource())}render(){return c.Ay.initEventRelay(this.context.map),t.createElement("div",{className:"_rlayers_RLayerVectorMBTiles"},t.createElement(a.aU.Provider,{value:{...this.context,layer:this.ol,vectortilelayer:this.ol,rLayer:this}},this.props.children))}}var b=e(9276),h=e(953),m=e(3628),g=e(7733),v=e(1426);new b.Ay({stroke:new h.A({color:"blue",width:2})});const x={},w={motorway:"#776",trunk:"#ccb",highway:"#f39"},f=new b.Ay({fill:new m.A({color:"#666"}),stroke:new h.A({color:"#444",width:1})}),y=new b.Ay({fill:new m.A({color:"#9db9e8"})}),k=new b.Ay({stroke:new h.A({color:"#8B008B",width:2})}),A=function(n){const o=n.get("class"),e=n.get("railway"),t=n.get("sort_key"),r=o+"/"+e+"/"+t;let l=x[r];if(!l){let n,i;e?(n="#7de",i=1):(n=w[o],i="highway"==o?1.5:1),l=new b.Ay({stroke:new h.A({color:n,width:i}),zIndex:t}),x[r]=l}return l},z=new b.Ay({image:new g.A({radius:5,fill:new m.A({color:"#000080"})})}),S=new h.A({color:"white",width:2}),E=function(n){if("country"==n.get("class"))return null;if(n.get("name")){const o=z.clone();return o.setText(new v.A({text:n.get("name"),offsetY:-5,font:"bold 16px sans-serif",stroke:S})),o}return null};function B(){return t.createElement("div",null,t.createElement(l.f9,{width:"100%",height:"60vh",initial:{center:(0,r.Rb)([2.364,48.82]),zoom:9}},t.createElement(p,{url:"https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles",layers:["transportation","water","waterway","landuse","place","boundary"],style:function(n){switch(n.get("layer")){case"water":case"waterway":return y;case"transportation":return A(n);case"landuse":return f;case"boundary":return k;case"place":return E(n);default:return null}}})),t.createElement("p",null,"The data comes from a huge 30GB ",t.createElement("code",null,".mbtiles")," file and initial loading times may be slow due to the CDN provider not keeping it in its cache"))}}}]);