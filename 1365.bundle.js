"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[1365],{1365:(e,t,r)=>{r.d(t,{A:()=>m});var o=r(6717),n=r(2096),i=r(2497),a=r(3530),s=r(6391),u=r(4778),c=r(8217),l=r(4087);class d extends c.Ay{constructor(){super()}getType(){return"json"}readFeature(e,t){return this.readFeatureFromObject(y(e),this.getReadOptions(e,t))}readFeatures(e,t){return this.readFeaturesFromObject(y(e),this.getReadOptions(e,t))}readFeatureFromObject(e,t){return(0,l.b0)()}readFeaturesFromObject(e,t){return(0,l.b0)()}readGeometry(e,t){return this.readGeometryFromObject(y(e),this.getReadOptions(e,t))}readGeometryFromObject(e,t){return(0,l.b0)()}readProjection(e){return this.readProjectionFromObject(y(e))}readProjectionFromObject(e){return(0,l.b0)()}writeFeature(e,t){return JSON.stringify(this.writeFeatureObject(e,t))}writeFeatureObject(e,t){return(0,l.b0)()}writeFeatures(e,t){return JSON.stringify(this.writeFeaturesObject(e,t))}writeFeaturesObject(e,t){return(0,l.b0)()}writeGeometry(e,t){return JSON.stringify(this.writeGeometryObject(e,t))}writeGeometryObject(e,t){return(0,l.b0)()}}function y(e){if("string"==typeof e){return JSON.parse(e)||null}return null!==e?e:null}const p=d;function f(e,t){if(!e)return null;let r;switch(e.type){case"Point":r=function(e){const t=e.coordinates;return{type:"Point",flatCoordinates:t,layout:(0,n.p0)(t.length)}}(e);break;case"LineString":r=function(e){const t=e.coordinates,r=t.flat();return{type:"LineString",flatCoordinates:r,ends:[r.length],layout:(0,n.p0)(t[0]?.length||2)}}(e);break;case"Polygon":r=function(e){const t=e.coordinates,r=[],o=t[0]?.[0]?.length;return{type:"Polygon",flatCoordinates:r,ends:(0,i.KG)(r,0,t,o),layout:(0,n.p0)(o)}}(e);break;case"MultiPoint":r=function(e){const t=e.coordinates;return{type:"MultiPoint",flatCoordinates:t.flat(),layout:(0,n.p0)(t[0]?.length||2)}}(e);break;case"MultiLineString":r=function(e){const t=e.coordinates,r=t[0]?.[0]?.length||2,o=[];return{type:"MultiLineString",flatCoordinates:o,ends:(0,i.KG)(o,0,t,r),layout:(0,n.p0)(r)}}(e);break;case"MultiPolygon":r=function(e){const t=e.coordinates,r=[],o=t[0]?.[0]?.[0].length||2;return{type:"MultiPolygon",flatCoordinates:r,ends:(0,i.d6)(r,0,t,o),layout:(0,n.p0)(o)}}(e);break;case"GeometryCollection":r=function(e){const t=e.geometries.map((function(e){return f(e)}));return t}(e);break;default:throw new Error("Unsupported GeoJSON type: "+e.type)}return r}function g(e,t){const r=(e=(0,c.hX)(e,!0,t)).getType();let o;switch(r){case"Point":o=function(e){return{type:"Point",coordinates:e.getCoordinates()}}(e);break;case"LineString":o=function(e){return{type:"LineString",coordinates:e.getCoordinates()}}(e);break;case"Polygon":o=function(e,t){let r;return t&&(r=t.rightHanded),{type:"Polygon",coordinates:e.getCoordinates(r)}}(e,t);break;case"MultiPoint":o=function(e){return{type:"MultiPoint",coordinates:e.getCoordinates()}}(e);break;case"MultiLineString":o=function(e){return{type:"MultiLineString",coordinates:e.getCoordinates()}}(e);break;case"MultiPolygon":o=function(e,t){let r;return t&&(r=t.rightHanded),{type:"MultiPolygon",coordinates:e.getCoordinates(r)}}(e,t);break;case"GeometryCollection":o=function(e,t){delete(t=Object.assign({},t)).featureProjection;return{type:"GeometryCollection",geometries:e.getGeometriesArray().map((function(e){return g(e,t)}))}}(e,t);break;case"Circle":o={type:"GeometryCollection",geometries:[]};break;default:throw new Error("Unsupported geometry type: "+r)}return o}const m=class extends p{constructor(e){e=e||{},super(),this.dataProjection=(0,s.Jt)(e.dataProjection?e.dataProjection:"EPSG:4326"),e.featureProjection&&(this.defaultFeatureProjection=(0,s.Jt)(e.featureProjection)),e.featureClass&&(this.featureClass=e.featureClass),this.geometryName_=e.geometryName,this.extractGeometryName_=e.extractGeometryName,this.supportedMediaTypes=["application/geo+json","application/vnd.geo+json"]}readFeatureFromObject(e,t){let r=null;r="Feature"===e.type?e:{type:"Feature",geometry:e,properties:null};const n=f(r.geometry);if(this.featureClass===u.Ay)return(0,c.Bs)({geometry:n,id:r.id,properties:r.properties},t);const i=new o.A;return this.geometryName_?i.setGeometryName(this.geometryName_):this.extractGeometryName_&&r.geometry_name&&i.setGeometryName(r.geometry_name),i.setGeometry((0,c.te)(n,t)),"id"in r&&i.setId(r.id),r.properties&&i.setProperties(r.properties,!0),i}readFeaturesFromObject(e,t){let r=null;if("FeatureCollection"===e.type){r=[];const o=e.features;for(let e=0,n=o.length;e<n;++e){const n=this.readFeatureFromObject(o[e],t);n&&r.push(n)}}else r=[this.readFeatureFromObject(e,t)];return r.flat()}readGeometryFromObject(e,t){return function(e,t){const r=f(e);return(0,c.te)(r,t)}(e,t)}readProjectionFromObject(e){const t=e.crs;let r;if(t)if("name"==t.type)r=(0,s.Jt)(t.properties.name);else{if("EPSG"!==t.type)throw new Error("Unknown SRS type");r=(0,s.Jt)("EPSG:"+t.properties.code)}else r=this.dataProjection;return r}writeFeatureObject(e,t){t=this.adaptOptions(t);const r={type:"Feature",geometry:null,properties:null},o=e.getId();if(void 0!==o&&(r.id=o),!e.hasProperties())return r;const n=e.getProperties(),i=e.getGeometry();return i&&(r.geometry=g(i,t),delete n[e.getGeometryName()]),(0,a.p)(n)||(r.properties=n),r}writeFeaturesObject(e,t){t=this.adaptOptions(t);const r=[];for(let o=0,n=e.length;o<n;++o)r.push(this.writeFeatureObject(e[o],t));return{type:"FeatureCollection",features:r}}writeGeometryObject(e,t){return g(e,this.adaptOptions(t))}}},8217:(e,t,r)=>{r.d(t,{Ay:()=>g,Bs:()=>b,hX:()=>m,te:()=>P});var o=r(6717),n=r(3402),i=r(4294),a=r(1217),s=r(1064),u=r(503),c=r(6702),l=r(2871),d=r(4338),y=r(6391),p=r(4778),f=r(4087);const g=class{constructor(){this.dataProjection=void 0,this.defaultFeatureProjection=void 0,this.featureClass=o.A,this.supportedMediaTypes=null}getReadOptions(e,t){if(t){let r=t.dataProjection?(0,y.Jt)(t.dataProjection):this.readProjection(e);t.extent&&r&&"tile-pixels"===r.getUnits()&&(r=(0,y.Jt)(r),r.setWorldExtent(t.extent)),t={dataProjection:r,featureProjection:t.featureProjection}}return this.adaptOptions(t)}adaptOptions(e){return Object.assign({dataProjection:this.dataProjection,featureProjection:this.defaultFeatureProjection,featureClass:this.featureClass},e)}getType(){return(0,f.b0)()}readFeature(e,t){return(0,f.b0)()}readFeatures(e,t){return(0,f.b0)()}readGeometry(e,t){return(0,f.b0)()}readProjection(e){return(0,f.b0)()}writeFeature(e,t){return(0,f.b0)()}writeFeatures(e,t){return(0,f.b0)()}writeGeometry(e,t){return(0,f.b0)()}};function m(e,t,r){const o=r?(0,y.Jt)(r.featureProjection):null,n=r?(0,y.Jt)(r.dataProjection):null;let i=e;if(o&&n&&!(0,y.tI)(o,n)){t&&(i=e.clone());const r=t?o:n,a=t?n:o;"tile-pixels"===r.getUnits()?i.transform(r,a):i.applyTransform((0,y.RG)(r,a))}if(t&&r&&void 0!==r.decimals){const t=Math.pow(10,r.decimals),o=function(e){for(let r=0,o=e.length;r<o;++r)e[r]=Math.round(e[r]*t)/t;return e};i===e&&(i=e.clone()),i.applyTransform(o)}return i}const h={Point:i.A,LineString:a.A,Polygon:s.Ay,MultiPoint:u.A,MultiLineString:c.A,MultiPolygon:l.A};function b(e,t){const r=e.geometry;if(!r)return[];if(Array.isArray(r))return r.map((t=>b({...e,geometry:t}))).flat();const o="MultiPolygon"===r.type?"Polygon":r.type;if("GeometryCollection"===o||"Circle"===o)throw new Error("Unsupported geometry type: "+o);const i=r.layout.length;return m(new p.Ay(o,"Polygon"===o?function(e,t,r){return Array.isArray(t[0])?((0,n.mb)(e,0,t,r)||(e=e.slice(),(0,n.NK)(e,0,t,r)),e):((0,n.PA)(e,0,t,r)||(e=e.slice(),(0,n.ug)(e,0,t,r)),e)}(r.flatCoordinates,r.ends,i):r.flatCoordinates,r.ends?.flat(),i,e.properties||{},e.id).enableSimplifyTransformed(),!1,t)}function P(e,t){if(!e)return null;if(Array.isArray(e)){const r=e.map((e=>P(e,t)));return new d.A(r)}return m(new(0,h[e.type])(e.flatCoordinates,e.layout||"XY",e.ends),!1,t)}}}]);