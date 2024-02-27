"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[8396],{8396:(e,t,r)=>{r.r(t),r.d(t,{default:()=>T});var n=r(6540),o=r(3407),l=r(4294),a=r(6717),u=r(1217),s=r(6888);function c(e,t,r,n,o,l){void 0!==o?l=void 0!==l?l:0:(o=[],l=0);let a=t;for(;a<r;){const t=e[a++];o[l++]=e[a++],o[l++]=t;for(let t=2;t<n;++t)o[l++]=e[a++]}return o.length=l,o}var i=r(2096),m=r(6361),f=r(8217);class h extends s.A{constructor(e){super(),e=e||{},this.dataProjection=(0,o.Jt)("EPSG:4326"),this.factor_=e.factor?e.factor:1e5,this.geometryLayout_=e.geometryLayout?e.geometryLayout:"XY"}readFeatureFromText(e,t){const r=this.readGeometryFromText(e,t);return new a.A(r)}readFeaturesFromText(e,t){return[this.readFeatureFromText(e,t)]}readGeometryFromText(e,t){const r=(0,i.dn)(this.geometryLayout_),n=function(e,t,r){let n;r=r||1e5;const o=new Array(t);for(n=0;n<t;++n)o[n]=0;const l=function(e,t){t=t||1e5;const r=function(e){const t=function(e){const t=[];let r=0,n=0;for(let o=0,l=e.length;o<l;++o){const l=e.charCodeAt(o)-63;r|=(31&l)<<n,l<32?(t.push(r),r=0,n=0):n+=5}return t}(e);for(let e=0,r=t.length;e<r;++e){const r=t[e];t[e]=1&r?~(r>>1):r>>1}return t}(e);for(let e=0,n=r.length;e<n;++e)r[e]/=t;return r}(e,r);for(let e=0,r=l.length;e<r;)for(n=0;n<t;++n,++e)o[n]+=l[e],l[e]=o[n];return l}(e,r,this.factor_);c(n,0,n.length,r,n);const o=(0,m.n2)(n,0,n.length,r),l=new u.A(o,this.geometryLayout_);return(0,f.hX)(l,!1,this.adaptOptions(t))}writeFeatureText(e,t){const r=e.getGeometry();if(r)return this.writeGeometryText(r,t);throw new Error("Expected `feature` to have a geometry")}writeFeaturesText(e,t){return this.writeFeatureText(e[0],t)}writeGeometryText(e,t){const r=(e=(0,f.hX)(e,!0,this.adaptOptions(t))).getFlatCoordinates(),n=e.getStride();return c(r,0,r.length,n,r),function(e,t,r){let n;r=r||1e5;const o=new Array(t);for(n=0;n<t;++n)o[n]=0;for(let r=0,l=e.length;r<l;)for(n=0;n<t;++n,++r){const t=e[r],l=t-o[n];o[n]=t,e[r]=l}return function(e,t){t=t||1e5;for(let r=0,n=e.length;r<n;++r)e[r]=Math.round(e[r]*t);return function(e){for(let t=0,r=e.length;t<r;++t){const r=e[t];e[t]=r<0?~(r<<1):r<<1}return function(e){let t="";for(let r=0,n=e.length;r<n;++r)t+=g(e[r]);return t}(e)}(e)}(e,r)}(r,n,this.factor_)}}function g(e){let t,r="";for(;e>=32;)t=63+(32|31&e),r+=String.fromCharCode(t),e>>=5;return t=e+63,r+=String.fromCharCode(t),r}const d=h;r(5045);var E=r(7240),y=r(5111);function S(e){if(null===e)return Promise.resolve("");const t=(0,o.pd)(e.getCoordinates(),"EPSG:3857","EPSG:4326"),r=`https://nominatim.openstreetmap.org/reverse?format=json&lon=${t[0]}&lat=${t[1]}`;return fetch(r).then((e=>e.json())).then((e=>e.display_name)).catch((e=>e.message))}const p=new d;function T(){const[e,t]=n.useState(null),[r,a]=n.useState(null);let u;!function(e){e[e.START=0]="START",e[e.FINISH=1]="FINISH"}(u||(u={}));const[s,c]=n.useState(u.START),[i,m]=n.useState(""),[f,h]=n.useState(""),[g,d]=n.useState(null);return n.useEffect((()=>{S(e).then((e=>m(e)))}),[e]),n.useEffect((()=>{S(r).then((e=>h(e)))}),[r]),n.useEffect((()=>{(function(e,t){if(null===e||null===t)return Promise.resolve(null);const r=(0,o.pd)(e.getCoordinates(),"EPSG:3857","EPSG:4326"),n=(0,o.pd)(t.getCoordinates(),"EPSG:3857","EPSG:4326"),l=`https://router.project-osrm.org/route/v1/driving/${r[0]},${r[1]};${n[0]},${n[1]}`;return fetch(l).then((e=>e.json())).then((e=>function(e){if(e&&e.length>0){const t=p.readFeature(e[0].geometry);return t.getGeometry().transform("EPSG:4326","EPSG:3857"),t.getGeometry()}return null}(e.routes)))})(e,r).then((e=>d(e)))}),[e,r]),n.createElement(n.Fragment,null,n.createElement(E.f9,{className:"example-map",initial:{center:(0,o.Rb)([2.364,48.82]),zoom:11},onClick:e=>{const r=e.map.getCoordinateFromPixel(e.pixel);s===u.START?(a(null),t(new l.A(r)),c(u.FINISH)):(a(new l.A(r)),c(u.START))}},n.createElement(E.ej,null),n.createElement(E.j9,null,n.createElement(y.RStyle,null,n.createElement(y.RCircle,{radius:6},n.createElement(y.RFill,{color:"blue"}))),n.createElement(E.Dp,{key:0,geometry:e}),n.createElement(E.Dp,{key:1,geometry:r}),n.createElement(E.Dp,{key:2,geometry:g},n.createElement(y.RStyle,null,n.createElement(y.RStroke,{width:3,color:"darkgreen"}))))),n.createElement("div",{className:"mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow"},n.createElement("p",null,n.createElement("strong",null,"Select ",s===u.START?"START":"FINISH"," point")),n.createElement("div",{className:"d-flex mt-2 justify-content-between"},0==i.length?null:n.createElement("div",null,n.createElement("strong",null,"From: "),n.createElement("em",null,i)),0==f.length?null:n.createElement("div",null,n.createElement("strong",null,"To: "),n.createElement("em",null,f)))))}}}]);