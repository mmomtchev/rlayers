"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[2836],{2836:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d});var o=n(6540),a=n(3407),r=n(6717),s=n(1365),i=(n(5045),n(7240)),l=n(2381);const m="https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson",c=new s.A({featureProjection:"EPSG:3857",featureClass:r.A}),p=fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=population-francaise-par-departement-2018&q=&rows=200").then((e=>e.json())),u=(e,t)=>{var n,o;return null!==(o=null===(n=e.records.find((e=>e.fields.code_departement===t)))||void 0===n?void 0:n.fields.population)&&void 0!==o?o:0};function d(){const[e,t]=o.useState({records:[]}),[n,r]=o.useState(null);return o.useEffect((()=>{p.then((e=>t(e)))}),[]),o.createElement("div",{className:"d-flex flex-row"},o.createElement(i.f9,{className:"example-map",initial:(0,o.useMemo)((()=>({center:(0,a.Rb)([2,46.5]),zoom:5.75})),[]),noDefaultControls:!0,noDefaultInteractions:!0},o.createElement(l.A,{layer:"stamen_toner"}),o.createElement(i.j9,{zIndex:5,format:c,url:m,onPointerEnter:(0,o.useCallback)((e=>r(e.target)),[]),onPointerLeave:(0,o.useCallback)((e=>n===e.target&&r(null)),[n])},o.createElement(i.cq.RStyle,{render:(0,o.useCallback)((t=>o.createElement(i.cq.RFill,{color:`rgba(0, 0, ${u(e,t.get("code"))/5e3}, 0.75)`})),[e])})),o.createElement(i.j9,{zIndex:10},n?o.createElement("div",null,o.createElement(i.Dp,{geometry:n.getGeometry()},o.createElement(i.Rv,{className:"example-overlay",autoPosition:!0},"Population in ",o.createElement("strong",null,n.get("nom"))," in 2018 is"," ",o.createElement("strong",null,u(e,n.get("code")))))):null)))}i.Dp.hitTolerance=0},2381:(e,t,n)=>{n.d(t,{A:()=>s});var o=n(945),a=n(5042),r=n(2662);class s extends r.A{constructor(e,t){var n;super(e,t),this.source=new a.A({layer:this.props.layer,apiKey:this.props.apiKey,retina:null!==(n=this.props.retina)&&void 0!==n&&n}),this.ol=new o.A({source:this.source}),this.eventSources=[this.ol,this.source]}}},5042:(e,t,n)=>{n.d(t,{A:()=>l});var o=n(702),a=n(7896);const r={stamen_terrain:{extension:"png"},stamen_terrain_background:{extension:"png"},stamen_terrain_labels:{extension:"png"},stamen_terrain_lines:{extension:"png"},stamen_toner_background:{extension:"png"},stamen_toner:{extension:"png"},stamen_toner_labels:{extension:"png"},stamen_toner_lines:{extension:"png"},stamen_toner_lite:{extension:"png"},stamen_watercolor:{extension:"jpg"},alidade_smooth:{extension:"png"},alidade_smooth_dark:{extension:"png"},alidade_satellite:{extension:"png"},outdoors:{extension:"png"},osm_bright:{extension:"png"}},s={stamen_terrain:{minZoom:0,maxZoom:18,retina:!0},stamen_toner:{minZoom:0,maxZoom:20,retina:!0},stamen_watercolor:{minZoom:1,maxZoom:18,retina:!1}};class i extends o.A{constructor(e){const t=e.layer.indexOf("-"),n=-1==t?e.layer:e.layer.slice(0,t),o=s[n]||{minZoom:0,maxZoom:20,retina:!0},i=r[e.layer],l=e.apiKey?"?api_key="+e.apiKey:"",m=o.retina&&e.retina?"@2x":"",c=void 0!==e.url?e.url:"https://tiles.stadiamaps.com/tiles/"+e.layer+"/{z}/{x}/{y}"+m+"."+i.extension+l,p=['&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>','&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>',a.o];e.layer.startsWith("stamen_")&&p.splice(1,0,'&copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a>'),super({attributions:p,cacheSize:e.cacheSize,crossOrigin:"anonymous",interpolate:e.interpolate,maxZoom:void 0!==e.maxZoom?e.maxZoom:o.maxZoom,minZoom:void 0!==e.minZoom?e.minZoom:o.minZoom,reprojectionErrorThreshold:e.reprojectionErrorThreshold,tileLoadFunction:e.tileLoadFunction,transition:e.transition,url:c,tilePixelRatio:m?2:1,wrapX:e.wrapX,zDirection:e.zDirection})}}const l=i}}]);