(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[2099],{89:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>a});var r=t(6540),o=t(7240),u=t(5553),i=t(114),l=t(9633),n=(t(5045),t(8110)),c=t(4078);n.A.defs("EPSG:32636","+proj=utm +zone=36 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"),(0,c.kz)(n.A);class h extends u.A{constructor(e,s){super(e,s),this.createSource(),this.ol=new i.A({source:this.source}),this.eventSources=[this.ol,this.source]}createSource(){this.source=new l.A({sources:this.props.urls.map((e=>({url:e})))}),this.eventSources=[this.ol,this.source]}componentDidMount(){super.componentDidMount(),this.context.map.setView(this.source.getView())}refresh(e){var s;super.refresh(e),(null===(s=null==e?void 0:e.urls)||void 0===s?void 0:s.length)===this.props.urls.length&&this.props.urls.every(((s,t)=>{var r;return s===(null===(r=null==e?void 0:e.urls)||void 0===r?void 0:r[t])}))||(this.createSource(),this.ol.setSource(this.source),this.attachOldEventHandlers(this.source))}}function a(){return r.createElement(o.f9,{width:"100%",height:"60vh",initial:{center:[0,0],zoom:1}},r.createElement(h,{properties:{label:"GeoTIFF"},urls:["https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif"]}))}},8625:()=>{},6504:()=>{},6580:()=>{}}]);